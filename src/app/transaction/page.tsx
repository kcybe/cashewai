"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

export default function TransactionPage() {
  const [text, setText] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [responseData, setResponseData] = useState<{
    generated_link?: string;
    summary?: string;
    data?: { choices?: Array<{ message?: { content: string } }> };
    error?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return alert("Please enter text");

    setLoading(true);

    const formData = new FormData();
    formData.append("text", text);
    if (file) formData.append("file", file);

    try {
      const res = await fetch("/api/expense-document", {
        method: "POST",
        body: formData,
      });

      const data = await res.json(); // Parse the response JSON

      // Now process the response content from data
      let content = data?.data?.choices?.[0]?.message?.content;
      if (content) {
        // Clean up the content (remove code block formatting)
        content = content.replace(/```json|\n```/g, "").trim();
        // Parse the cleaned content
        const parsedData = JSON.parse(content);
        // Update the responseData state with parsed data
        setResponseData(parsedData);
      }
    } catch (error) {
      console.error(error);
      setResponseData({
        error: "An error occurred failed to process the request.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle>Expense</CardTitle>
          <CardDescription>
            Ask the AI to document your expense.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full">
            <Input
              className="w-full max-w-md"
              placeholder="Today I bought..."
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="grid w-full max-w-md items-center gap-1.5">
              <Label className="mt-4" htmlFor="picture">
                Invoice / Receipt Picture
              </Label>
              <Input
                className="mt-4"
                id="picture"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <Button
                className="mt-4"
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {(loading || responseData) && (
        <Card className="w-full max-w-md p-4 mt-4">
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              // Show skeleton loader while loading
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : (
              responseData && (
                // Show results when loaded and responseData exists
                <div className="space-y-2">
                  {responseData && (
                    <>
                      <div className="mt-2 p-3 rounded-md">
                        {/* Access and format your specific fields here */}
                        <p>
                          Summary:&nbsp;
                          {responseData.summary || "No summary available"}
                        </p>
                        <a
                          href={responseData.generated_link || "#"}
                          className="text-blue-500 hover:underline mt-2 block"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open Transaction
                        </a>
                      </div>
                    </>
                  )}

                  {responseData.error && (
                    <div className="text-red-500">
                      Error: {responseData.error}
                    </div>
                  )}
                </div>
              )
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
