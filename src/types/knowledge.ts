export interface KnowledgeTopic {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: "fundamentals" | "prompt-engineering" | "rag" | "agents" | "governance" | "evaluation";
  estimatedMinutes: number;
  providerNeutral: boolean;
  relatedCertifications: string[]; // cert slugs
  overview: string;
  keyConcepts: Array<{
    term: string;
    definition: string;
  }>;
  bestPractices: string[];
}
