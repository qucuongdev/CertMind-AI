import React, { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { KNOWLEDGE_TOPICS } from "@/content/topics";
import { TopicCard } from "@/features/knowledge/components/topic-card";

export const instant = false;

export const metadata = {
  title: "AI Knowledge Library — Shared Concepts — CertMind AI",
  description: "Learn reusable core AI engineering concepts across Prompt Engineering, RAG architectures, Agent workflows, and Responsible AI.",
};

async function KnowledgeLibraryContent({
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
          Reusable AI Knowledge Library
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Study universal AI architectural patterns once. These fundamentals map directly to multiple vendor certification exams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {KNOWLEDGE_TOPICS.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}

export default function KnowledgeLibraryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <Suspense fallback={<div className="container mx-auto max-w-7xl px-4 py-10 animate-pulse h-96 bg-muted/20 rounded-2xl" />}>
      <KnowledgeLibraryContent params={params} />
    </Suspense>
  );
}
