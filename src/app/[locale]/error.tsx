"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto max-w-lg px-4 py-24 text-center space-y-4">
      <div className="h-12 w-12 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h2 className="text-2xl font-bold text-foreground">Something went wrong</h2>
      <p className="text-sm text-muted-foreground">
        An error occurred while loading this page. Please try again or return home.
      </p>
      <div className="pt-2 flex items-center justify-center gap-3">
        <Button onClick={() => reset()} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
