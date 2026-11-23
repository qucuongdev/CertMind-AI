import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { CERTIFICATIONS, getCertificationBySlug } from "@/content/certifications";
import { getQuestionsByCert } from "@/content/questions";
import { PracticeSession } from "@/features/practice/components/practice-session";
import { routing } from "@/i18n/routing";

export const instant = false;

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const cert of CERTIFICATIONS) {
      params.push({ locale, slug: cert.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const cert = getCertificationBySlug(slug);
  if (!cert) return { title: "Certification Not Found" };

  return {
    title: `Practice: ${cert.name} — CertMind AI`,
    description: `Practice exam questions for ${cert.name} with instant feedback and explanations.`,
  };
}

async function PracticeContent({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const cert = getCertificationBySlug(slug);
  if (!cert) {
    notFound();
  }

  const questions = getQuestionsByCert(slug);

  return <PracticeSession certification={cert} questions={questions} />;
}

export default function PracticePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Suspense fallback={<div className="animate-pulse h-96 bg-muted/30 rounded-2xl" />}>
        <PracticeContent params={params} />
      </Suspense>
    </div>
  );
}
