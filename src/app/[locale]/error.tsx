"use client";

import React, { useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime error caught by error boundary:", error);
  }, [error]);

  return (
    <div className="container mx-auto max-w-lg px-4 py-24 text-center space-y-4">
      <div className="h-12 w-12 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h2 className="text-2xl font-bold text-foreground">Something went wrong</h2>
      <p className="text-sm text-muted-foreground">
        An error occurred while loading this page. Please try again or return home.
      </p>
      {error?.message && process.env.NODE_ENV !== "production" && (
        <div className="p-3 rounded-xl bg-muted/60 border border-border text-xs text-rose-500 font-mono text-left max-h-32 overflow-auto">
          {error.message}
        </div>
      )}
      <div className="pt-2 flex items-center justify-center gap-3">
        <Button onClick={() => reset()} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Thử lại (Try Again)
        </Button>
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <Home className="h-4 w-4" />
            Về trang chủ (Home)
          </Button>
        </Link>
      </div>
    </div>
  );
}
