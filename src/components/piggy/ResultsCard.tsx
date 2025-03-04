"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ResponseData {
  generated_link?: string;
  summary?: string;
  data?: { choices?: Array<{ message?: { content: string } }> };
  error?: string;
}

interface ResultsCardProps {
  loading: boolean;
  responseData: ResponseData | null;
}

export function ResultsCard({ loading, responseData }: ResultsCardProps) {
  if (!loading && !responseData) return null;

  return (
    <Card className="w-full max-w-md mt-4">
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4" />
            <Skeleton className="h-20" />
          </div>
        ) : (
          responseData && (
            <div className="space-y-2">
              {responseData.summary && (
                <div className="rounded-md">
                  <p>
                    Summary:&nbsp;
                    {responseData.summary}
                  </p>
                  {responseData.generated_link && (
                    <a
                      href={responseData.generated_link}
                      className="text-blue-500 hover:underline mt-2 block"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Transaction
                    </a>
                  )}
                </div>
              )}
              {responseData.error && (
                <div className="text-red-500">Error: {responseData.error}</div>
              )}
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
}
