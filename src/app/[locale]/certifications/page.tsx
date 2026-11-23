import React, { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { CERTIFICATIONS } from "@/content/certifications";
import { CertCatalog } from "@/features/certifications/components/cert-catalog";

export const instant = false;

export const metadata = {
  title: "AI Certification Catalog — CertMind AI",
  description: "Browse verified AI certifications across Anthropic Claude, AWS, Azure, Google Cloud, NVIDIA, and Databricks.",
};

async function CertCatalogContent({
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
          AI Certification Catalog
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Explore official certification tracks, compare exam requirements, and select a curriculum to begin practicing.
        </p>
      </div>

      <CertCatalog initialCertifications={CERTIFICATIONS} />
    </div>
  );
}

export default function CertificationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <Suspense fallback={<div className="container mx-auto max-w-7xl px-4 py-10 animate-pulse h-96 bg-muted/20 rounded-2xl" />}>
      <CertCatalogContent params={params} />
    </Suspense>
  );
}
