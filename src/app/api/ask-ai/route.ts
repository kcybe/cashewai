import { NextRequest, NextResponse } from "next/server";

async function fileToBase64(file: File): Promise<string> {
  // Get the ArrayBuffer from the file
  const bytes = await file.arrayBuffer();
  // Convert to Buffer for Node.js
  const buffer = Buffer.from(bytes);
  // Convert to base64
  const base64String = buffer.toString("base64");
  // Add proper data URI prefix based on file type
  const contentType = file.type || "application/octet-stream";
  return `data:${contentType};base64,${base64String}`;
}

function getCurrentDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = (today.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based
  const dd = today.getDate().toString().padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`; // Format: YYYY-MM-DD
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData(); // Ensures you handle form data properly

    const text = formData.get("text");
    const file = formData.get("file");

    let base64Image = "";

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    if (file && file instanceof File) {
      base64Image = await fileToBase64(file);
    }

    console.log("Making request to OpenRouter API...");

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "cashewai.ai",
          "X-Title": "cashew.ai",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen/qwen2.5-vl-72b-instruct:free",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `You are an AI that converts user text into structured financial transactions. Given the user's input, extract the following details and generate a Cashew-compatible transaction link.

1. Transaction Details Extraction:
- Amount: Identify the transaction amount. If it's an expense, make it negative (e.g., -100). If it's income, make it positive (e.g., 100).
- Title: Determine the title of the transaction from the text.
- Category & Subcategory: Classify the transaction based on the provided text. If unclear, leave them empty. The category should represent the main type of expense or income (e.g., Shopping). The subcategory, if any, should represent a more specific type (e.g., Groceries under Shopping).
- Notes: Extract relevant additional details or context (e.g., "Bought shoes").
- Date: If a date is mentioned in the text, use it. If no date is provided, use today’s date ${getCurrentDate()}.

- Account: If a specific account is mentioned, assign it. If no account is mentioned, use the primary account.
- Multiple Transactions: If the input suggests multiple transactions, create a JSON list containing all transactions.

2. Generate Cashew-Compatible Link:
Based on the extracted details, generate a Cashew transaction link using the following formats:

Examples:
1. Expense with category:
Link: https://cashewapp.web.app/addTransaction?amount=-100&title=All%20the%20shopping&category=Shopping&notes=Went%20shopping
Description: Create an expense transaction of $100 in the "Shopping" category with notes "Went shopping".

2. Income with no category:
Link: https://cashewapp.web.app/addTransaction?amount=100&title=Income&notes=Got%20money
Description: Create an income transaction of $100 with no category and notes "Got money".

3. Custom date and prefilled details:
Link: https://cashewapp.web.app/addTransactionRoute?amount=-50&title=All%20the%20shopping&notes=Went%20shopping&date=2024-03-02
Description: Open the add transaction page with a custom date (2024-03-02) and prefilled details.

4. Multiple transactions in one link (JSON):
Link: https://cashewapp.web.app/addTransaction?JSON=%7B%22transactions%22%3A%5B%7B%22amount%22%3A%22-100%22%2C%20%22notes%22%3A%22This%20is%20a%20note%22%2C%20%22category%22%3A%22Shopping%22%7D%2C%7B%22amount%22%3A%22-150%22%2C%20%22notes%22%3A%22This%20is%20a%20note%202%22%7D%5D%7D
Description: Create multiple transactions at once using JSON.

3. Return Format:
- Generated Link: Return the link formatted with the extracted parameters.
- Summary: Provide a short summary of the transaction in a natural language format.

4. Example Summary:
- 'Added a $100 Shopping expense for groceries.'
- 'Logged a $200 income transaction from salary.'
- 'Processed two transactions: a $50 expense for dining and a $30 expense for transport.'

5. Input:
User Input: ${text}

Generated JSON Output Format:
{
"generated_link": [Cashew transaction link],
"summary": [Short description of what was processed]
}`,
                },
                ...(base64Image
                  ? [
                      {
                        type: "image_url",
                        image_url: { url: base64Image },
                      },
                    ]
                  : []),
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `API Error: ${response.status} ${response.statusText} - ${errorText}`
      );
      return NextResponse.json(
        { error: `API Error: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const responseText = await response.text();

    if (!responseText || responseText.trim() === "") {
      console.error("Empty response received from API");
      return NextResponse.json(
        { error: "Empty response received from API" },
        { status: 502 }
      );
    }

    try {
      const data = JSON.parse(responseText);
      return NextResponse.json({
        message: "Expense documented successfully",
        data: data,
      });
    } catch (jsonError) {
      console.error(
        "JSON parsing error:",
        jsonError,
        "Response text:",
        responseText
      );
      return NextResponse.json(
        { error: "Failed to parse API response", rawResponse: responseText },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
