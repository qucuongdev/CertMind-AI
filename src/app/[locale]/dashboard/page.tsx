import React, { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { ProgressOverview } from "@/features/dashboard/components/progress-overview";

export const instant = false;

export const metadata = {
  title: "Learning Dashboard — CertMind AI",
  description: "View your study progress, exam performance analytics, domain breakdown, and recent practice attempts.",
};

async function DashboardContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Learner Dashboard
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Track your readiness across all certification tracks and review previous session attempts.
        </p>
      </div>

      <ProgressOverview />
    </div>
  );
}

export default function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <Suspense fallback={<div className="container mx-auto max-w-7xl px-4 py-10 animate-pulse h-96 bg-muted/20 rounded-2xl" />}>
      <DashboardContent params={params} />
    </Suspense>
  );
}
