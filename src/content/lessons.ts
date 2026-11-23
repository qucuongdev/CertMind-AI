import { Lesson } from "@/types/lesson";

export const LESSONS: Lesson[] = [
  // --- Claude Certified Associate – Foundations Lessons ---
  {
    id: "lesson-claude-models-01",
    certSlug: "claude-certified-associate-foundations",
    moduleId: "mod-1-models",
    moduleTitle: "Module 1: Claude Ecosystem & Architecture",
    slug: "claude-model-family-selection",
    title: "Selecting the Right Claude Model: Opus, Sonnet, and Haiku",
    durationMinutes: 15,
    summary: "Deep dive into model capabilities, trade-offs between intelligence, latency, and token economics.",
    sections: [
      {
        title: "1. The Claude Model Tiering Strategy",
        content: "Anthropic structures its model family across three distinct tiers tailored to different enterprise workload requirements:\n\n- **Claude Haiku**: The fastest and most compact model family. Ideal for high-throughput, latency-critical operations like document triage, live sentiment classification, and lightweight code completion.\n- **Claude Sonnet**: The industry benchmark for balancing state-of-the-art intelligence with production speed. The default workhorse for coding, reasoning, and enterprise agent workflows.\n- **Claude Opus**: The apex model for open-ended deep analysis, long-form creative research, and highly complex multidimensional problem-solving.",
      },
      {
        title: "2. Extended Thinking in Claude 3.7",
        content: "Claude 3.7 Sonnet introduces hybrid test-time reasoning. Developers can specify a `thinking` parameter with a token budget (e.g., 2,048 tokens). Claude executes explicit chain-of-thought scratchpad reasoning before returning the synthesized response, greatly boosting performance on complex algorithmic and architectural problems.",
        codeSnippet: `// Example: Calling Claude with thinking budget
const response = await anthropic.messages.create({
  model: "claude-3-7-sonnet-20250219",
  max_tokens: 4096,
  thinking: {
    type: "enabled",
    budget_tokens: 2048
  },
  messages: [{ role: "user", content: "Design a fault-tolerant distributed cache..." }]
});`,
        language: "typescript",
      },
      {
        title: "3. Context Window and Token Economics",
        content: "Claude features a massive 200,000-token context window (equivalent to several books or full technical codebases) with near-perfect needle-in-a-haystack retrieval accuracy across the entire window.",
      },
    ],
    keyTakeaways: [
      "Use Haiku for high-frequency low-latency classification to minimize infrastructure cost.",
      "Use Sonnet for primary enterprise software development, tool use, and multi-agent systems.",
      "Leverage Extended Thinking when solving complex mathematical, logic, or system design questions.",
    ],
    relatedQuestionIds: ["q-claude-assoc-01", "q-claude-assoc-05"],
  },
  {
    id: "lesson-claude-prompting-02",
    certSlug: "claude-certified-associate-foundations",
    moduleId: "mod-2-prompt-eng",
    moduleTitle: "Module 2: Advanced Prompt Engineering",
    slug: "structuring-prompts-with-xml",
    title: "Structuring High-Precision Prompts with XML Tags",
    durationMinutes: 20,
    summary: "Master Anthropic's recommended prompt patterns: XML delimiters, role framing, and few-shot exemplars.",
    sections: [
      {
        title: "1. Why XML Tags Are Essential for Claude",
        content: "Claude was trained with special attention to XML tag hierarchies. Using explicit tags such as `<instructions>`, `<context>`, `<documents>`, and `<output_format>` eliminates ambiguity and prevents user input from bleeding into system instructions.",
        codeSnippet: `<instructions>
You are a senior compliance analyst. Review the following contract.
Follow these rules:
1. Cite section numbers for every obligation.
2. If an indemnity clause is missing, explicitly note it.
</instructions>

<context>
The contract covers B2B cloud software licensing in the EU jurisdiction.
</context>

<documents>
{{CONTRACT_TEXT}}
</documents>`,
        language: "xml",
      },
      {
        title: "2. Mitigating Hallucination with 'Give Claude an Out'",
        content: "When asked about missing facts, LLMs feel pressure to fabricate an answer. By adding an explicit fallback instruction — *'If the answer is not contained in the provided text, reply: I do not have enough information'* — hallucination rates drop by over 80%.",
      },
    ],
    keyTakeaways: [
      "Always delimit multi-part prompts using descriptive XML tags.",
      "Provide clear negative constraints and explicit fallback paths for unanswerable queries.",
      "Place reference documents before instructions to maximize attention quality.",
    ],
    relatedQuestionIds: ["q-claude-assoc-02", "q-claude-assoc-03"],
  },

  // --- Claude Certified Developer – Foundations Lessons ---
  {
    id: "lesson-claude-dev-tools-01",
    certSlug: "claude-certified-developer-foundations",
    moduleId: "mod-dev-1-tools",
    moduleTitle: "Module 1: Tool Use & MCP Architecture",
    slug: "tool-use-and-model-context-protocol",
    title: "Tool Use (Function Calling) & Model Context Protocol (MCP)",
    durationMinutes: 25,
    summary: "Architecting agentic tool calling loops, JSON schema validation, and connecting external MCP servers.",
    sections: [
      {
        title: "1. The Tool Use Lifecycle in Claude API",
        content: "Tool use follows an asynchronous cycle:\n1. Client passes tool definitions with JSON Schema in the `tools` array.\n2. Claude determines whether a tool is required and returns a `tool_use` content block with input arguments.\n3. Client executes the function locally or queries the API.\n4. Client passes back a `tool_result` content block to Claude to synthesize the final answer.",
        codeSnippet: `// Defining a tool schema for Claude
const tools = [
  {
    name: "get_weather",
    description: "Get the current weather for a given city",
    input_schema: {
      type: "object",
      properties: {
        city: { type: "string", description: "The city name, e.g. San Francisco" },
        unit: { type: "string", enum: ["celsius", "fahrenheit"] }
      },
      required: ["city"]
    }
  }
];`,
        language: "typescript",
      },
      {
        title: "2. The Model Context Protocol (MCP) Standard",
        content: "MCP is an open standard that decouples models from custom integrations. MCP Servers expose standard tools, resources (files, tables), and prompts. Any MCP Client (like Claude Desktop or an AI coding agent) can connect to any MCP Server over stdio or SSE without writing custom glue code.",
      },
    ],
    keyTakeaways: [
      "Tool schemas must be strictly defined using standard JSON Schema.",
      "Forced tool choice (`tool_choice: { type: 'tool', name: '...' }`) guarantees structured JSON output.",
      "MCP enables modular plug-and-play integrations between agents and enterprise data stores.",
    ],
    relatedQuestionIds: ["q-claude-dev-01", "q-claude-dev-02"],
  },

  // --- Claude Certified Architect – Foundations Lessons ---
  {
    id: "lesson-claude-arch-rag-01",
    certSlug: "claude-certified-architect-foundations",
    moduleId: "mod-arch-1-rag",
    moduleTitle: "Module 1: Enterprise RAG Architecture",
    slug: "enterprise-rag-and-prompt-caching",
    title: "Enterprise RAG Design & Anthropic Prompt Caching",
    durationMinutes: 30,
    summary: "Combining hybrid search, cross-encoders, and prompt caching breakpoints to achieve sub-second TTFT and 90% cost savings.",
    sections: [
      {
        title: "1. Hybrid Search Architecture",
        content: "Production RAG requires combining dense semantic embeddings (which understand intent) with sparse BM25 keyword search (which matches exact part numbers, acronyms, and technical codes). Reciprocal Rank Fusion (RRF) merges candidate lists before passing the top 50 items to a cross-encoder re-ranker.",
      },
      {
        title: "2. Economics of Prompt Caching",
        content: "Anthropic Prompt Caching allows caching large static contexts (documents, system prompts, tool schemas) for 5 minutes. Cached token reads cost up to 90% less and reduce Time to First Token (TTFT) by up to 80%.\n\nTo maximize cache hits, the static prefix must stay identical across calls, with new dynamic turns appended at the end.",
        codeSnippet: `// Setting cache breakpoint on static knowledge base
const message = await anthropic.messages.create({
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 1024,
  system: [
    {
      type: "text",
      text: enterpriseKnowledgeBaseText,
      cache_control: { type: "ephemeral" } // Cache breakpoint!
    }
  ],
  messages: conversationHistory
});`,
        language: "typescript",
      },
    ],
    keyTakeaways: [
      "Always use hybrid retrieval (dense + sparse) for technical enterprise corpora.",
      "Place static documentation at the prompt beginning with `cache_control: { type: 'ephemeral' }`.",
      "Second-stage re-ranking significantly improves context precision and eliminates irrelevant chunks.",
    ],
    relatedQuestionIds: ["q-claude-arch-01", "q-claude-arch-02"],
  },
];

export function getLessonsByCert(certSlug: string): Lesson[] {
  return LESSONS.filter((l) => l.certSlug === certSlug);
}

export function getLessonBySlug(certSlug: string, lessonSlug: string): Lesson | undefined {
  return LESSONS.find((l) => l.certSlug === certSlug && l.slug === lessonSlug);
}
