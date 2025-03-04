"use client";

import { LoadingSpinner } from "@/components/loading-spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <LoadingSpinner size={48} className="mx-auto" />
        <h2 className="text-2xl font-semibold">Loading...</h2>
        <p className="text-muted-foreground">
          Please wait while we load the content.
        </p>
      </div>
    </div>
  );
}
