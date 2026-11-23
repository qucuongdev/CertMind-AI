import { z } from "zod";
import { CERTIFICATIONS } from "../src/content/certifications";
import { KNOWLEDGE_TOPICS } from "../src/content/topics";
import { QUESTIONS } from "../src/content/questions";
import { LESSONS } from "../src/content/lessons";

// 1. Certification Schema
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

// 2. Question Schema
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

// 3. Knowledge Topic Schema
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

// 4. Lesson Schema
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

export function validateAllContent() {
  console.log("=== Running CertMind AI Content Validation ===");

  const certSlugs = new Set<string>();

  // Validate Certifications
  console.log(`\nValidating ${CERTIFICATIONS.length} certifications...`);
  CERTIFICATIONS.forEach((cert) => {
    CertificationSchema.parse(cert);

    // Verify domain weights sum to 100
    const totalWeight = cert.domains.reduce((sum, d) => sum + d.weightPercent, 0);
    if (totalWeight !== 100) {
      throw new Error(`Certification ${cert.slug} domain weights sum to ${totalWeight}%, expected 100%`);
    }

    if (certSlugs.has(cert.slug)) {
      throw new Error(`Duplicate certification slug: ${cert.slug}`);
    }
    certSlugs.add(cert.slug);
  });
  console.log("✓ All certifications pass schema and 100% domain weight validation.");

  // Validate Knowledge Topics
  console.log(`\nValidating ${KNOWLEDGE_TOPICS.length} knowledge topics...`);
  KNOWLEDGE_TOPICS.forEach((topic) => {
    KnowledgeTopicSchema.parse(topic);
    // Ensure related certs exist
    topic.relatedCertifications.forEach((slug) => {
      if (!certSlugs.has(slug)) {
        throw new Error(`Topic ${topic.slug} references unknown certSlug: ${slug}`);
      }
    });
  });
  console.log("✓ All knowledge topics pass schema and reference validation.");

  // Validate Questions
  console.log(`\nValidating ${QUESTIONS.length} practice questions...`);
  const questionIds = new Set<string>();
  QUESTIONS.forEach((q) => {
    QuestionSchema.parse(q);

    if (questionIds.has(q.id)) {
      throw new Error(`Duplicate question ID: ${q.id}`);
    }
    questionIds.add(q.id);

    // Ensure cert exists
    const cert = CERTIFICATIONS.find((c) => c.slug === q.certSlug);
    if (!cert) {
      throw new Error(`Question ${q.id} references non-existent certSlug: ${q.certSlug}`);
    }

    // Ensure domain exists in cert
    const domain = cert.domains.find((d) => d.id === q.domainId);
    if (!domain) {
      throw new Error(`Question ${q.id} references non-existent domainId ${q.domainId} in cert ${q.certSlug}`);
    }

    // Ensure correctOptionIds are subset of options
    const optionIds = new Set(q.options.map((opt) => opt.id));
    q.correctOptionIds.forEach((cId) => {
      if (!optionIds.has(cId)) {
        throw new Error(`Question ${q.id} correctOptionId '${cId}' does not exist in options.`);
      }
    });
  });
  console.log("✓ All questions pass schema and relational integrity validation.");

  // Validate Lessons
  console.log(`\nValidating ${LESSONS.length} curriculum lessons...`);
  LESSONS.forEach((lesson) => {
    LessonSchema.parse(lesson);

    if (!certSlugs.has(lesson.certSlug)) {
      throw new Error(`Lesson ${lesson.id} references non-existent certSlug: ${lesson.certSlug}`);
    }

    // Ensure related questions exist
    lesson.relatedQuestionIds.forEach((qId) => {
      if (!questionIds.has(qId)) {
        throw new Error(`Lesson ${lesson.id} references unknown question ID: ${qId}`);
      }
    });
  });
  console.log("✓ All lessons pass schema and relational integrity validation.");

  console.log("\n==========================================");
  console.log("✅ ALL CONTENT VALIDATION PASSED (100% OK)");
  console.log("==========================================\n");
}

validateAllContent();
