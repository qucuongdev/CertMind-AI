import React from "react";

export default function Loading() {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-8 animate-pulse">
      <div className="h-10 w-1/3 bg-muted rounded-xl" />
      <div className="h-4 w-1/2 bg-muted/60 rounded-md" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="h-64 bg-muted/50 rounded-2xl" />
        <div className="h-64 bg-muted/50 rounded-2xl" />
        <div className="h-64 bg-muted/50 rounded-2xl" />
      </div>
    </div>
  );
}
