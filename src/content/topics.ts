import { KnowledgeTopic } from "@/types/knowledge";

export const KNOWLEDGE_TOPICS: KnowledgeTopic[] = [
  {
    id: "topic-prompt-engineering",
    slug: "prompt-engineering-mastery",
    title: "Prompt Engineering & In-Context Learning",
    summary: "Systematic techniques for steering LLMs: Few-Shot prompting, Chain-of-Thought (CoT), XML tagging, and system prompt architecture.",
    category: "prompt-engineering",
    estimatedMinutes: 25,
    providerNeutral: true,
    relatedCertifications: [
      "claude-certified-associate-foundations",
      "aws-certified-ai-practitioner",
      "azure-ai-fundamentals-ai-901",
      "google-cloud-generative-ai-leader",
    ],
    overview: "Prompt engineering is the deliberate practice of crafting inputs to guide foundation models toward consistent, accurate, and structured behaviors without updating model weights.",
    keyConcepts: [
      {
        term: "Few-Shot Prompting",
        definition: "Providing 2-5 high-quality input/output exemplars directly in the context to demonstrate desired tone, formatting, and edge-case handling.",
      },
      {
        term: "Chain-of-Thought (CoT)",
        definition: "Encouraging models to reason step-by-step before producing a final answer, significantly improving accuracy on multi-step reasoning problems.",
      },
      {
        term: "XML Tag Delimiters",
        definition: "Using explicit tags like <instructions>, <context>, and <examples> to disambiguate prompt components and prevent prompt injection.",
      },
    ],
    bestPractices: [
      "Separate user inputs from system instructions using clear structural delimiters.",
      "Be specific about format requirements, negative constraints, and fallback behavior for unanswerable queries.",
      "Place reference documents before instructions to maximize attention utilization in long-context models.",
    ],
  },
  {
    id: "topic-rag-systems",
    slug: "enterprise-rag-architecture",
    title: "Retrieval-Augmented Generation (RAG) Systems",
    summary: "Architecting end-to-end RAG pipelines: chunking strategies, vector embeddings, hybrid search, re-ranking, and citation grounding.",
    category: "rag",
    estimatedMinutes: 35,
    providerNeutral: true,
    relatedCertifications: [
      "claude-certified-architect-foundations",
      "claude-certified-developer-foundations",
      "aws-certified-ai-practitioner",
      "azure-ai-apps-agents-developer-associate-ai-103",
      "databricks-certified-generative-ai-engineer-associate",
    ],
    overview: "Retrieval-Augmented Generation combines real-time semantic retrieval from enterprise data stores with the generative reasoning of LLMs, enabling grounded responses without hallucinations.",
    keyConcepts: [
      {
        term: "Hybrid Search",
        definition: "Combining dense vector similarity (cosine / semantic search) with sparse keyword retrieval (BM25) using reciprocal rank fusion (RRF).",
      },
      {
        term: "Re-Ranking (Cross-Encoders)",
        definition: "A second-stage ranking model (e.g., Cohere Rerank) that scores retrieved candidate chunks against the query to filter irrelevant noise.",
      },
      {
        term: "Chunking Strategies",
        definition: "Splitting long documents into semantically coherent segments (sentence-based, recursive character, or hierarchical parent-child).",
      },
    ],
    bestPractices: [
      "Include document metadata (title, author, timestamp, chapter) alongside chunk text to maintain conversational context.",
      "Tune chunk size and overlap carefully: 250-500 tokens with 10% overlap is standard for general Q&A.",
      "Enforce explicit grounding rules in the prompt: instruct the model to cite chunk IDs and admit lack of information.",
    ],
  },
  {
    id: "topic-ai-agents-mcp",
    slug: "ai-agents-and-mcp",
    title: "AI Agents & Model Context Protocol (MCP)",
    summary: "Autonomous tool-using agents, function calling loops, plan-and-solve architectures, and the open Model Context Protocol standard.",
    category: "agents",
    estimatedMinutes: 30,
    providerNeutral: true,
    relatedCertifications: [
      "claude-certified-developer-foundations",
      "claude-certified-architect-foundations",
      "azure-ai-apps-agents-developer-associate-ai-103",
    ],
    overview: "Agents extend LLMs from passive responders into active problem-solvers that query external APIs, read file systems, execute code, and synthesize complex multi-turn workflows.",
    keyConcepts: [
      {
        term: "Model Context Protocol (MCP)",
        definition: "An open standard created by Anthropic that standardizes how AI applications connect to external tools, servers, databases, and context repositories.",
      },
      {
        term: "ReAct Loop",
        definition: "The cycle of Reasoning (Thought) → Action (Tool Call) → Observation (Tool Result) repeated until the objective is fulfilled.",
      },
      {
        term: "Human-in-the-Loop (HITL)",
        definition: "Requiring human confirmation before executing high-impact or non-idempotent actions (e.g., sending emails, making financial transactions).",
      },
    ],
    bestPractices: [
      "Keep tool schemas minimal, self-documenting, and validated with JSON Schema.",
      "Implement idempotent tool handlers and clear timeouts for external API calls.",
      "Always set maximum iteration limits to prevent infinite agentic execution loops.",
    ],
  },
  {
    id: "topic-responsible-ai",
    slug: "responsible-ai-and-safety",
    title: "Responsible AI, Guardrails & Safety",
    summary: "Managing hallucination risks, bias detection, data leakage prevention, jailbreak defense, and regulatory compliance.",
    category: "governance",
    estimatedMinutes: 20,
    providerNeutral: true,
    relatedCertifications: [
      "claude-certified-associate-foundations",
      "aws-certified-ai-practitioner",
      "azure-ai-fundamentals-ai-901",
      "google-cloud-generative-ai-leader",
    ],
    overview: "Deploying enterprise AI safely requires guardrails at the prompt input, model reasoning, and output validation layers to protect privacy, safety, and brand integrity.",
    keyConcepts: [
      {
        term: "Prompt Injection",
        definition: "Adversarial input designed to override system instructions and hijack the LLM's intended behavior.",
      },
      {
        term: "PII Redaction",
        definition: "Sanitizing personal identifiable information (SSNs, credit card numbers, medical history) before passing queries to cloud LLMs.",
      },
      {
        term: "Automated Guardrails",
        definition: "Independent classifier models (e.g., Llama Guard, Azure Content Safety) that screen inputs and outputs in real-time.",
      },
    ],
    bestPractices: [
      "Validate user inputs through separate guardrails before executing agent tools.",
      "Log full prompt-response telemetry for compliance, but redact PII at the ingestion point.",
      "Establish strict refusal responses for harmful or out-of-scope queries.",
    ],
  },
];

export function getTopicBySlug(slug: string): KnowledgeTopic | undefined {
  return KNOWLEDGE_TOPICS.find((t) => t.slug === slug);
}
