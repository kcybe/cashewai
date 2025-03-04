"use client";

import { useState } from "react";
import { PiggyInputForm } from "@/components/piggy/InputForm";
import { ResultsCard } from "@/components/piggy/ResultsCard";
import { PageTransition } from "@/components/page-transition";

interface ResponseData {
  generated_link?: string;
  summary?: string;
  data?: { choices?: Array<{ message?: { content: string } }> };
  error?: string;
}

export default function TransactionPage() {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<ResponseData | null>(null);

  const handleSubmit = async (text: string, file: File | null) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("text", text);
    if (file) formData.append("file", file);

    try {
      const res = await fetch("/api/ask-ai", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      // Process response content
      let content = data?.data?.choices?.[0]?.message?.content;
      if (content) {
        content = content.replace(/```json|\n```/g, "").trim();
        const parsedData = JSON.parse(content);
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
    <div className="flex flex-col items-center mt-8 mb-8">
      <PageTransition>
        <PiggyInputForm onSubmit={handleSubmit} loading={loading} />
        <ResultsCard loading={loading} responseData={responseData} />
      </PageTransition>
    </div>
  );
}
