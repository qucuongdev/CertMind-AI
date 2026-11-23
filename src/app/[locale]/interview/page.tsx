import React, { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { INTERVIEW_QUESTIONS } from "@/content/interview-questions";
import { InterviewPrepView } from "@/features/interview/components/interview-prep-view";

export const instant = false;

export const metadata = {
  title: "AI Engineer Interview Prep — CertMind AI",
  description: "Chuẩn bị phỏng vấn Kỹ sư AI với ngân hàng câu hỏi sàng lọc kỹ thuật, tình huống kiến trúc RAG, Agents, LLM Serving, kèm phân tích bẫy thi và mẹo phỏng vấn.",
};

async function InterviewContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <InterviewPrepView questions={INTERVIEW_QUESTIONS} />;
}

export default function InterviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <Suspense fallback={<div className="animate-pulse h-96 bg-muted/20 rounded-2xl" />}>
        <InterviewContent params={params} />
      </Suspense>
    </div>
  );
}
