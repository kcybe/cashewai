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
import React from "react";

export default function TransactionPage() {
  const [text, setText] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return alert("Please enter text and select a file");

    setLoading(true);

    const formData = new FormData();
    formData.append("text", text);
    if (file) formData.append("file", file);

    try {
      const res = await fetch("/api/expense-document", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-8">
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
    </div>
  );
}
