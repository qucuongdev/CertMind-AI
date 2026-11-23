import { describe, it, expect } from "vitest";
import { z } from "zod";
import { CERTIFICATIONS } from "@/content/certifications";
import { KNOWLEDGE_TOPICS } from "@/content/topics";
import { QUESTIONS } from "@/content/questions";
import { LESSONS } from "@/content/lessons";

const DomainWeightSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  weightPercent: z.number().min(1).max(100),
  description: z.string().optional(),
});

const CertificationSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(3),
  provider: z.enum(["anthropic", "aws", "microsoft", "google-cloud", "nvidia", "databricks", "ibm"]),
  providerName: z.string().min(1),
  level: z.enum(["foundational", "associate", "professional", "specialty"]),
  status: z.enum(["active", "beta", "draft", "retiring", "retired", "unknown"]),
  examCode: z.string().optional(),
  version: z.string().min(1),
  durationMinutes: z.number().min(15).max(300),
  questionCount: z.number().min(10).max(200),
  passingScorePercent: z.number().min(50).max(100),
  officialUrl: z.string().url(),
  eligibility: z.string().min(5),
  description: z.string().min(10),
  shortDescription: z.string().min(10),
  lastVerifiedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  domains: z.array(DomainWeightSchema).min(1),
  isPracticeReady: z.boolean(),
});

const QuestionOptionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
});

const QuestionSchema = z.object({
  id: z.string().min(1),
  certSlug: z.string().min(1),
  domainId: z.string().min(1),
  type: z.enum(["single_choice", "multiple_choice"]),
  prompt: z.string().min(15),
  options: z.array(QuestionOptionSchema).min(2),
  correctOptionIds: z.array(z.string()).min(1),
  explanation: z.string().min(20),
  distractorExplanations: z.record(z.string(), z.string()).optional(),
  difficulty: z.enum(["foundational", "intermediate", "advanced"]),
  referenceDocUrl: z.string().url().optional(),
});

const KnowledgeTopicSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(3),
  summary: z.string().min(10),
  category: z.enum(["fundamentals", "prompt-engineering", "rag", "agents", "governance", "evaluation"]),
  estimatedMinutes: z.number().min(5),
  providerNeutral: z.boolean(),
  relatedCertifications: z.array(z.string()),
  overview: z.string().min(20),
  keyConcepts: z.array(
    z.object({
      term: z.string().min(1),
      definition: z.string().min(5),
    })
  ).min(1),
  bestPractices: z.array(z.string().min(5)).min(1),
});

const LessonSectionSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(10),
  codeSnippet: z.string().optional(),
  language: z.string().optional(),
});

const LessonSchema = z.object({
  id: z.string().min(1),
  certSlug: z.string().min(1),
  moduleId: z.string().min(1),
  moduleTitle: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(3),
  durationMinutes: z.number().min(5),
  summary: z.string().min(10),
  sections: z.array(LessonSectionSchema).min(1),
  keyTakeaways: z.array(z.string().min(5)).min(1),
  relatedQuestionIds: z.array(z.string()),
});

describe("Comprehensive Content Validation & Schema Compliance", () => {
  const certSlugs = new Set<string>();

  it("should validate all certifications and 100% domain weight sums", () => {
    CERTIFICATIONS.forEach((cert) => {
      expect(() => CertificationSchema.parse(cert)).not.toThrow();
      const totalWeight = cert.domains.reduce((sum, d) => sum + d.weightPercent, 0);
      expect(totalWeight).toBe(100);
      expect(certSlugs.has(cert.slug)).toBe(false);
      certSlugs.add(cert.slug);
    });
  });

  it("should validate all knowledge topics and relational links", () => {
    KNOWLEDGE_TOPICS.forEach((topic) => {
      expect(() => KnowledgeTopicSchema.parse(topic)).not.toThrow();
      topic.relatedCertifications.forEach((slug) => {
        expect(certSlugs.has(slug)).toBe(true);
      });
    });
  });

  it("should validate all questions and option integrity", () => {
    const questionIds = new Set<string>();
    QUESTIONS.forEach((q) => {
      expect(() => QuestionSchema.parse(q)).not.toThrow();
      expect(questionIds.has(q.id)).toBe(false);
      questionIds.add(q.id);

      const cert = CERTIFICATIONS.find((c) => c.slug === q.certSlug);
      expect(cert).toBeDefined();

      const domain = cert?.domains.find((d) => d.id === q.domainId);
      expect(domain).toBeDefined();

      const optionIds = new Set(q.options.map((opt) => opt.id));
      q.correctOptionIds.forEach((cId) => {
        expect(optionIds.has(cId)).toBe(true);
      });
    });
  });

  it("should validate all lessons and question cross-references", () => {
    const questionIds = new Set(QUESTIONS.map((q) => q.id));
    LESSONS.forEach((lesson) => {
      expect(() => LessonSchema.parse(lesson)).not.toThrow();
      expect(certSlugs.has(lesson.certSlug)).toBe(true);

      lesson.relatedQuestionIds.forEach((qId) => {
        expect(questionIds.has(qId)).toBe(true);
      });
    });
  });
});
