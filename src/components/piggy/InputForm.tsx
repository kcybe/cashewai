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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import PiggyLogo from "./PiggyLogo";

interface PiggyInputFormProps {
  onSubmit: (text: string, file: File | null) => Promise<void>;
  loading: boolean;
}

export function PiggyInputForm({ onSubmit, loading }: PiggyInputFormProps) {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return alert("Please enter text");
    await onSubmit(text, file);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Hey! 👋</CardTitle>
          <CardDescription className="mt-2">
            Ask Piggy to document your expense / income.
          </CardDescription>
        </div>
        <PiggyLogo />
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <Textarea
            className="w-full"
            placeholder="Today I bought..."
            typeof="text"
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
  );
}
