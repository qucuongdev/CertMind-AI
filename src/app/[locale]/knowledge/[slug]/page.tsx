import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { KNOWLEDGE_TOPICS, getTopicBySlug } from "@/content/topics";
import { TopicDetails } from "@/features/knowledge/components/topic-details";
import { routing } from "@/i18n/routing";

export const instant = false;

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const topic of KNOWLEDGE_TOPICS) {
      params.push({ locale, slug: topic.slug });
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
  const topic = getTopicBySlug(slug);
  if (!topic) return { title: "Topic Not Found" };

  return {
    title: `${topic.title} — AI Knowledge Library — CertMind AI`,
    description: topic.summary,
  };
}

async function KnowledgeTopicDetailContent({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const topic = getTopicBySlug(slug);
  if (!topic) {
    notFound();
  }

  return <TopicDetails topic={topic} />;
}

export default function KnowledgeTopicDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <Suspense fallback={<div className="animate-pulse h-96 bg-muted/30 rounded-2xl" />}>
        <KnowledgeTopicDetailContent params={params} />
      </Suspense>
    </div>
  );
}
