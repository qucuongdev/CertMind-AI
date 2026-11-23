import React, { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { CERTIFICATIONS } from "@/content/certifications";
import { QUESTIONS } from "@/content/questions";
import { CustomDrillView } from "@/features/practice/components/custom-drill-view";

export const instant = false;

export const metadata = {
  title: "Luyện tập câu hỏi tùy chọn — CertMind AI",
  description: "Tự chọn 5, 10, 15, 20, 25, 30 hoặc số lượng tùy ý, luyện phản hồi đúng/sai tức thì và phân tích chi tiết vì sao không chọn các phương án còn lại.",
};

async function DrillContent({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ cert?: string; count?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const resolvedSearch = searchParams ? await searchParams : {};
  const initialCertSlug = resolvedSearch?.cert;
  const initialCount = resolvedSearch?.count ? parseInt(resolvedSearch.count, 10) : 10;

  return (
    <CustomDrillView
      certifications={CERTIFICATIONS}
      allQuestions={QUESTIONS}
      initialCertSlug={initialCertSlug}
      initialCount={isNaN(initialCount) ? 10 : initialCount}
    />
  );
}

export default function CustomDrillPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ cert?: string; count?: string }>;
}) {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <Suspense fallback={<div className="animate-pulse h-96 bg-muted/20 rounded-2xl" />}>
        <DrillContent params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
