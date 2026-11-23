# CertMind AI — Master Implementation Plan

**Project:** CertMind AI  
**Tagline:** Learn AI. Practice Smarter. Get Certified.  
**Repository:** `certmind-ai`  
**Document:** `masterPlan.md`  
**Version:** 1.0  
**Created:** 2026-11-23  
**Status:** Approved for phased implementation  
**Deployment Target:** Vercel  
**Primary Stack:** Next.js, TypeScript, Tailwind CSS, shadcn/ui

---

# 1. Product Vision

## 1.1 Overview

Build **CertMind AI**, a modern AI-powered learning and certification preparation platform.

The platform helps learners:

1. Discover AI certifications from leading technology providers.
2. Understand certification requirements and official exam objectives.
3. Learn AI concepts through structured learning paths.
4. Practice with high-quality, independently authored questions.
5. Take realistic practice exams.
6. Understand correct and incorrect answers with detailed explanations.
7. Use an AI Tutor to clarify concepts and identify knowledge gaps.
8. Track learning progress and exam readiness.
9. Prepare for multiple certifications without repeatedly studying overlapping knowledge.

The long-term goal is to build a comprehensive global AI certification preparation ecosystem.

**The platform is independent and does not issue official vendor certifications.**

## 1.2 Product Principles

- Premium, polished and responsive UI/UX.
- Frontend stability before backend complexity.
- Real interactions instead of decorative or fake functionality.
- Mobile-first design without compromising desktop usability.
- Accurate, verifiable and versioned certification information.
- Reusable knowledge across different certification programs.
- AI-assisted learning with source-grounded explanations.
- English source code and consistent naming conventions.
- English and Vietnamese interface support.
- Vercel-native deployment.
- Modular and maintainable architecture.
- Progressive implementation, with testable deliverables at each milestone.

## 1.3 Target Users

| Persona | Primary Need |
|---|---|
| AI Beginner | Learn fundamental AI concepts |
| Software Developer | Prepare for technical AI certifications |
| AI Engineer | Learn RAG, agents, LLMs, deployment and evaluation |
| Cloud Engineer | Prepare for AWS, Azure and Google Cloud AI exams |
| Solution Architect | Study enterprise AI architecture and governance |
| Business Professional | Understand AI adoption and business applications |
| Certification Candidate | Practice questions and prepare for exams |

---

# 2. Product Scope

## 2.1 Primary Modules

The platform will have eight major modules.

| Module | Description | Priority |
|---|---|---|
| Certification Catalog | Discover and compare certifications | P0 |
| Knowledge Library | Learn reusable AI concepts | P0 |
| Learning Paths | Structured lessons for each certification | P0 |
| Practice Engine | Answer questions and review explanations | P0 |
| Exam Simulator | Complete timed practice exams | P0 |
| Learning Dashboard | Track progress and achievements | P1 |
| AI Tutor | Ask questions and receive grounded explanations | P1 |
| Adaptive Learning | Personalized practice and study plans | P2 |

## 2.2 MVP Scope

The initial MVP must prioritize frontend quality and reliable learning experiences.

**MVP includes:**

- Premium landing page.
- Certification catalog.
- Certification detail pages.
- Learning path interface.
- Lesson reader.
- Knowledge topic explorer.
- Practice questions.
- Quiz result analysis.
- Timed exam simulator.
- Dashboard UI.
- Working search and filters.
- Light and dark themes.
- English/Vietnamese localization.
- Responsive navigation.
- Realistic, verified seed content.
- Vercel deployment.

**MVP initially excludes:**

- Paid subscriptions.
- Payment processing.
- Social networking.
- Public discussion forums.
- Full production AI Tutor.
- Automated AI question publishing.
- Native mobile applications.
- Real vendor examination scheduling.
- Issuing official certifications.
- Microservices and Docker.

For the first implementation, use local typed seed data and browser persistence where appropriate. Introduce backend services only when the relevant phase explicitly requires them.

---

# 3. Certification Coverage

## 3.1 Global Certification Registry

The system must support multiple certification providers and multiple exam versions.

Initial providers:

- Anthropic
- Amazon Web Services
- Microsoft
- Google Cloud
- NVIDIA
- Databricks
- IBM

Future providers may be added through the certification registry without restructuring the frontend.

## 3.2 Anthropic / Claude Certifications

**Anthropic is a first-class certification provider in CertMind AI.**

The following four certifications must be included in the initial catalog.

| Certification | Level | Main Topics |
|---|---|---|
| Claude Certified Associate – Foundations | Foundation | Claude usage, prompting, evaluation, workflows, responsible AI |
| Claude Certified Developer – Foundations | Foundation | Claude API, tool use, Claude Code, MCP, agents, evaluations |
| Claude Certified Architect – Foundations | Foundation | Solution architecture, Claude integrations, agents, deployment |
| Claude Certified Architect – Professional | Professional | Enterprise architecture, governance, evaluation, reliability, cost and safety |

These topic descriptions are high-level categories, not substitutes for official exam objectives.

### Anthropic Requirements

1. Store exact certification names and identifiers.
2. Maintain links to the official certification pages.
3. Store current access eligibility.
4. Distinguish Foundations and Professional credentials.
5. Track exam guide versions.
6. Allow certification status updates.
7. Provide preparation paths using legally accessible educational sources.
8. Do not reproduce restricted Partner Academy content.
9. Do not claim CertMind AI is affiliated with Anthropic.
10. Clearly distinguish certification exams from course-completion badges.

As verified on 2026-11-23, the four listed Claude certification exams are available through the Claude Partner Network program. Official exam registration requires partner eligibility. Recheck official availability before publishing details to end users.

**Official sources:**

- https://anthropic-partners.skilljar.com/page/partner-certifications
- https://anthropic-partners.skilljar.com/page/faq-certifications
- https://www.pearsonvue.com/us/en/anthropic.html
- https://academy.claude.com/help/faq

### Claude-Specific Knowledge Areas

Create reusable topics covering:

- Claude ecosystem and model selection
- Prompt engineering
- Structured outputs
- Claude API and tool use
- Claude Code workflows
- Model Context Protocol (MCP)
- Skills and agent workflows
- Agent architecture
- Retrieval-augmented generation
- Context management
- Evaluation and testing
- Human-in-the-loop workflows
- Security and responsible AI
- Cost, latency and reliability
- Production deployment patterns
- Enterprise governance

All curriculum mappings must be checked against the appropriate published exam guide.

## 3.3 Other Initial Certifications

### AWS

- AWS Certified AI Practitioner
- AWS Certified Machine Learning Engineer – Associate
- AWS Certified Generative AI Developer – Professional

Official source: https://aws.amazon.com/certification/

### Microsoft

- Microsoft Certified: Azure AI Fundamentals (AI-901)
- Microsoft Certified: Azure AI Apps and Agents Developer Associate (AI-103)

Official source: https://learn.microsoft.com/credentials/browse/

### Google Cloud

- Google Cloud Generative AI Leader
- Google Cloud Professional Machine Learning Engineer

Official source: https://cloud.google.com/learn/certification

### NVIDIA

Target the official Generative AI and LLM certification tracks after checking the currently published exam catalog and guides.

### Databricks

- Databricks Certified Generative AI Engineer Associate

Official source: https://www.databricks.com/learn/training/certification

### IBM

Add applicable AI and watsonx credentials only after confirming their current names, credential types, exam availability and official preparation sources.

## 3.4 Certification Status Management

Every certification must support:

- `draft`
- `active`
- `beta`
- `retiring`
- `retired`
- `unknown`

Every exam version must store:

- Provider
- Certification identifier
- Official certification name
- Exam code, if available
- Exam version
- Level
- Eligibility
- Available languages
- Exam duration, if verified
- Question count, if verified
- Passing requirements, if published
- Official reference URL
- Last verification date
- Lifecycle status

Never invent unavailable certification attributes.

If exam details cannot be verified, display **Not confirmed** instead of generating placeholder facts.

**Important:** Retired exams must remain accessible in the historical catalog but should not be recommended as current certification targets.

---

# 4. User Experience and Design System

## 4.1 Design Direction

Create a polished EdTech SaaS interface inspired by the usability and visual quality of leading modern learning and productivity products.

Do not clone existing websites.

Visual identity:

- Clean and professional.
- Modern typography.
- Spacious layouts.
- Soft surfaces and restrained gradients.
- Subtle depth and shadow.
- Premium learning dashboard aesthetic.
- Strong visual hierarchy.
- Excellent readability.
- Minimal distractions during examinations.

Avoid overly colorful dashboards, excessive gradients and unnecessary animations.

## 4.2 Colors

Recommended starting palette:

| Purpose | Color |
|---|---|
| Primary | Indigo `#4F46E5` |
| Secondary | Violet `#7C3AED` |
| Accent | Cyan `#06B6D4` |
| Success | Emerald `#10B981` |
| Warning | Amber `#F59E0B` |
| Error | Rose `#F43F5E` |

Use neutral backgrounds and ensure accessible contrast in both themes.

All colors must be managed through semantic design tokens rather than hardcoded throughout components.

## 4.3 Typography

Use:

- **Geist** for English interface typography.
- **Be Vietnam Pro** for Vietnamese interface typography.

Define responsive type scales and consistent text spacing.

Optimize for long-form educational reading.

## 4.4 Component System

Use shadcn/ui primitives where appropriate.

Build reusable components including:

- `AppHeader`
- `AppSidebar`
- `MobileNavigation`
- `ThemeToggle`
- `LanguageSwitcher`
- `CertificationCard`
- `ProviderCard`
- `LearningPathCard`
- `LessonSidebar`
- `LessonContent`
- `TopicBadge`
- `ProgressRing`
- `QuestionCard`
- `AnswerOption`
- `QuestionNavigator`
- `ExamTimer`
- `ExamSummary`
- `ResultBreakdown`
- `DomainProgressChart`
- `KnowledgeGapCard`
- `TutorChatPanel`
- `EmptyState`
- `ErrorState`
- `LoadingSkeleton`

Component names must be in English and use PascalCase.

## 4.5 Animation

Use Motion for meaningful, lightweight animation.

Recommended interactions:

- Page transitions.
- Card hover states.
- Progress changes.
- Sidebar expansion.
- Modal transitions.
- Answer selection.
- Question transitions.
- Completion feedback.

Follow these rules:

- Prefer opacity and transform animations.
- Avoid unnecessary layout reflow.
- Respect `prefers-reduced-motion`.
- Do not animate long lesson paragraphs.
- Do not slow down navigation with excessive transitions.
- Avoid animated counters that imply fabricated statistics.

## 4.6 Responsive Requirements

Support:

- Mobile: 320px and above.
- Tablet.
- Laptop.
- Large desktop.

Critical mobile requirements:

- Quiz options are easy to tap.
- Long questions remain readable.
- Exam timer stays accessible.
- Navigation does not obscure content.
- Cards do not overflow horizontally.
- Forms work correctly with mobile keyboards.
- Lesson sidebar becomes a mobile drawer.

---

# 5. Required Pages

## 5.1 Public Pages

### Homepage

Route: `/[locale]`

Sections:

1. Hero section.
2. Certification search.
3. Featured certification providers.
4. Popular certification tracks.
5. How CertMind AI works.
6. Interactive learning preview.
7. AI Tutor feature introduction.
8. Learning benefits.
9. FAQ.
10. Footer.

The hero must clearly communicate what the platform does.

Avoid fabricated learner counts, testimonials or success rates.

### Certification Catalog

Route: `/[locale]/certifications`

Features:

- Search by certification name.
- Filter by provider.
- Filter by difficulty.
- Filter by topic.
- Filter by certification lifecycle status.
- Sort by name and difficulty.
- Responsive cards.
- Empty and loading states.

Filters should be reflected in the URL query string for shareability.

### Certification Details

Route: `/[locale]/certifications/[slug]`

Display:

- Certification name.
- Provider.
- Level.
- Lifecycle status.
- Eligibility.
- Overview.
- Skills covered.
- Exam objectives.
- Estimated preparation path.
- Official references.
- Related certifications.
- Start learning action.
- Start practice action.

Never display invented exam statistics.

### Knowledge Library

Route: `/[locale]/knowledge`

Explore shared AI topics across certification providers.

### Knowledge Topic Details

Route: `/[locale]/knowledge/[slug]`

Each topic includes:

- Overview.
- Definitions.
- Core concepts.
- Practical examples.
- Common misconceptions.
- Relevant certifications.
- Practice questions.
- References.

## 5.2 Learning Pages

### Learning Paths

Route: `/[locale]/learn/[certificationSlug]`

Features:

- Learning modules.
- Lessons.
- Domain progress.
- Learning objectives.
- Estimated reading time.
- Resume learning.
- Completion indicators.

### Lesson Reader

Route: `/[locale]/learn/[certificationSlug]/[lessonSlug]`

Layout:

- Left: lesson navigation.
- Center: readable lesson content.
- Right: optional table of contents and context tools.

Features:

- Syntax-highlighted code blocks.
- Responsive tables.
- Diagrams where useful.
- Inline knowledge checks.
- Previous/next lesson navigation.
- Mark lesson as complete.
- Related practice questions.

## 5.3 Practice Pages

### Practice Setup

Route: `/[locale]/practice/[certificationSlug]`

Settings:

- Domain selection.
- Difficulty.
- Number of questions.
- Question type.
- Practice mode.

### Practice Session

Route: `/[locale]/practice/session/[sessionId]`

Features:

- Question rendering.
- Answer selection.
- Navigation.
- Bookmark question.
- Immediate feedback in practice mode.
- Progress indicators.
- Explanation panel.
- Restart and review.

### Practice Results

Route: `/[locale]/practice/results/[sessionId]`

Show:

- Correct answers.
- Incorrect answers.
- Score.
- Domain breakdown.
- Explanation for each question.
- Topics requiring further study.

## 5.4 Exam Simulator

### Exam Setup

Route: `/[locale]/exams/[certificationSlug]`

Allow the user to configure a practice simulation using verified exam information.

### Exam Session

Route: `/[locale]/exams/session/[sessionId]`

Features:

- Countdown timer.
- Question navigation grid.
- Flag for review.
- Previous/next navigation.
- Submit confirmation.
- Auto-submit when time expires.
- No immediate answer feedback.
- Resume behavior appropriate to the selected implementation phase.

### Exam Results

Route: `/[locale]/exams/results/[sessionId]`

Show:

- Practice score.
- Correct/incorrect/unanswered counts.
- Time consumed.
- Domain breakdown.
- Detailed review.
- Suggested learning topics.

Clearly label practice results as unofficial.

Do not present estimated scores as guaranteed official exam outcomes.

## 5.5 Dashboard

Route: `/[locale]/dashboard`

Display:

- Current learning paths.
- Recently studied topics.
- Practice history.
- Completed lessons.
- Weak domains.
- Recommended next actions.
- Learning streak, only when supported by real tracking data.

For the frontend prototype, clearly identify locally stored progress.

Do not pretend sample data belongs to the current user.

---

# 6. Localization

## 6.1 Supported Locales

Only two locales are supported initially:

- `vi`
- `en`

## 6.2 Detection Rules

1. Read the browser's preferred language.
2. If the primary preferred language is Vietnamese, select `vi`.
3. Otherwise select `en`.
4. Unknown locale defaults to `en`.
5. Explicit locale in the URL takes priority.
6. A manually saved preference takes priority during automatic locale selection.
7. The language switcher must allow users to change language anytime.

Examples:

| Browser Language | Website |
|---|---|
| `vi-VN` | Vietnamese |
| `vi` | Vietnamese |
| `en-US` | English |
| `ja-JP` | English |
| `fr-FR` | English |
| `ko-KR` | English |

Use `next-intl`.

### URL Format

- `/vi/certifications`
- `/en/certifications`
- `/vi/knowledge`
- `/en/knowledge`

## 6.3 Content Localization

Separate interface translations from educational content translations.

Interface translations:

- `messages/en.json`
- `messages/vi.json`

Educational content must support locale-specific versions.

Use English as the canonical source language for the initial certification curricula.

Vietnamese translations must preserve technical accuracy.

Do not automatically translate certification names, code, API names or official exam identifiers.

If Vietnamese educational content is unavailable, display English with a visible fallback notice.

---

# 7. Technology Stack

## 7.1 Frontend

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Motion
- Lucide React
- next-intl
- React Hook Form
- Zod
- TanStack Query where server state management is needed
- Recharts for analytics

Prefer framework-native primitives when third-party libraries are unnecessary.

## 7.2 Backend — Later Phase

Use:

- Next.js Route Handlers
- PostgreSQL
- Prisma
- Auth.js
- Zod validation

Database hosting:

- Neon PostgreSQL or an equivalent managed PostgreSQL service compatible with Vercel.

## 7.3 AI — Later Phase

Use:

- Vercel AI SDK
- Configurable LLM provider
- Retrieval over reviewed educational content
- Structured output validation
- Provider-independent AI service abstraction

Do not hardcode one LLM vendor throughout the application.

## 7.4 Deployment

Deploy directly to Vercel.

Requirements:

- No Docker.
- No Docker Compose.
- No Kubernetes.
- No manually managed application server.
- Environment variables configured through Vercel.
- Preview deployments for changes.
- Production deployment from the designated production branch.

---

# 8. Repository Structure

Use the following as the target directory structure. Create directories only when their corresponding phase is implemented.

```text
certmind-ai/
│
├── public/
│   ├── images/
│   ├── icons/
│   └── illustrations/
│
├── messages/
│   ├── en.json
│   └── vi.json
│
├── content/
│   ├── certifications/
│   │   ├── anthropic/
│   │   ├── aws/
│   │   ├── microsoft/
│   │   ├── google-cloud/
│   │   ├── nvidia/
│   │   ├── databricks/
│   │   └── ibm/
│   ├── topics/
│   ├── lessons/
│   └── questions/
│
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── (marketing)/
│   │   │   │   └── page.tsx
│   │   │   ├── (platform)/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── certifications/
│   │   │   │   ├── knowledge/
│   │   │   │   ├── learn/
│   │   │   │   ├── practice/
│   │   │   │   ├── exams/
│   │   │   │   └── ai-tutor/
│   │   │   └── layout.tsx
│   │   └── api/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── charts/
│   │   └── shared/
│   │
│   ├── features/
│   │   ├── certifications/
│   │   ├── knowledge/
│   │   ├── learning/
│   │   ├── practice/
│   │   ├── exams/
│   │   ├── progress/
│   │   ├── ai-tutor/
│   │   └── search/
│   │
│   ├── i18n/
│   │   ├── routing.ts
│   │   ├── request.ts
│   │   └── navigation.ts
│   │
│   ├── lib/
│   │   ├── data/
│   │   ├── db/
│   │   ├── auth/
│   │   ├── ai/
│   │   └── utils/
│   │
│   ├── config/
│   ├── hooks/
│   ├── types/
│   ├── styles/
│   └── proxy.ts
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── docs/
│   ├── architecture/
│   ├── database/
│   ├── content/
│   └── deployment/
│
├── scripts/
├── .env.example
├── next.config.ts
├── package.json
├── tsconfig.json
├── masterPlan.md
└── README.md
```

---

# 9. Coding Standards

## 9.1 Naming Rules

| Type | Convention |
|---|---|
| Directories | kebab-case |
| React component symbols | PascalCase |
| Component filenames | kebab-case |
| Variables | camelCase |
| Functions | camelCase |
| TypeScript types | PascalCase |
| Constants | UPPER_SNAKE_CASE when appropriate |
| Database tables | snake_case |
| Database columns | snake_case |
| API endpoints | lowercase |
| Git branches | feature/, fix/, refactor/ |

## 9.2 General Requirements

- Use TypeScript strict mode.
- Avoid `any`.
- Define explicit data contracts.
- Validate external inputs.
- Separate UI from business logic.
- Keep reusable logic out of page components.
- Avoid duplicated business rules.
- Prefer server components where appropriate.
- Minimize unnecessary client components.
- Keep components focused and testable.
- Avoid premature abstractions.
- Avoid unnecessary packages.
- Do not use placeholder implementations for features marked complete.

---

# 10. Data Architecture

## 10.1 Core Entities

The future persistent database should include:

| Entity | Purpose |
|---|---|
| `providers` | Certification organizations |
| `certifications` | Certification identities |
| `exam_versions` | Versioned exam specifications |
| `exam_domains` | Exam objective categories |
| `knowledge_topics` | Shared AI knowledge |
| `domain_topics` | Mapping exam domains to topics |
| `learning_paths` | Certification learning plans |
| `learning_modules` | Grouped lessons |
| `lessons` | Educational content |
| `lesson_translations` | Localized lessons |
| `questions` | Independently authored questions |
| `question_versions` | Immutable question revisions |
| `question_translations` | Localized question content |
| `question_domain_mappings` | Questions mapped to exam objectives |
| `question_sources` | Supporting references |
| `exam_templates` | Practice exam configuration |
| `practice_sessions` | Practice activity |
| `exam_attempts` | Completed and in-progress exams |
| `attempt_answers` | User answer records |
| `users` | User identities |
| `user_progress` | Learning progress |
| `learning_recommendations` | Recommended learning activities |
| `content_reviews` | Content verification history |

The database schema is introduced only in the persistent-backend phase.

## 10.2 Certification Versioning

A certification may have multiple exam versions.

Example:

```text
Provider
  └── Certification
        ├── Exam Version A
        │     ├── Domain 1
        │     └── Domain 2
        └── Exam Version B
              ├── Domain 1
              ├── Domain 2
              └── Domain 3
```

Do not overwrite an older exam specification when a new version is released.

Users must be able to identify the version of the exam they are preparing for.

## 10.3 Shared Knowledge Model

Multiple certifications may reference the same knowledge topic.

Example:

```text
Knowledge Topic: Retrieval-Augmented Generation
    │
    ├── AWS AI Certification
    ├── Google Cloud AI Certification
    ├── Claude Developer Certification
    ├── Claude Architect Certification
    └── Databricks Generative AI Certification
```

Use explicit mappings rather than duplicating entire lessons for each certification.

## 10.4 Data Integrity

Requirements:

- Unique provider identifiers.
- Unique certification slug.
- Unique version identifier within a certification.
- Unique locale per content translation.
- Valid foreign-key relationships.
- Immutable submitted exam attempts.
- Versioned question content.
- Recorded source attribution.
- Timestamp for every review.

---

# 11. Content Management and Question Quality

## 11.1 Content Sources

Use official vendor resources as the primary references.

Examples:

- Official certification pages.
- Official exam guides.
- Public technical documentation.
- Official learning paths that allow linking.
- Public whitepapers.
- Standards and reputable educational material.

Do not assume public accessibility implies permission to reproduce or redistribute full content.

Store links and independently authored educational explanations.

## 11.2 Content Lifecycle

Every learning asset must pass through:

`draft → reviewed → approved → published`

Additional states:

- `needs_update`
- `archived`
- `rejected`

AI-generated material must not automatically transition directly to `published`.

## 11.3 Question Types

The question engine must be extensible.

Initial types:

- Single choice.
- Multiple choice.
- True/false.
- Scenario-based single choice.
- Scenario-based multiple choice.

Future types:

- Ordering.
- Matching.
- Fill in the blank.
- Interactive code questions.
- Hands-on lab tasks.

## 11.4 Question Schema

Each question should include:

```text
id
type
difficulty
knowledge_topic_ids
exam_domain_ids
exam_version_ids
stem
options
correct_answers
explanation
option_explanations
references
language
content_version
review_status
created_at
updated_at
```

Correct answers must not depend on the order of displayed options.

Questions may be reused across certifications only when the corresponding exam objectives genuinely overlap.

## 11.5 Question Quality Requirements

Every published question must:

1. Have an unambiguous answer.
2. Match the targeted domain.
3. Use technically correct terminology.
4. Avoid misleading distractors.
5. Include explanations for correct and incorrect choices.
6. Include at least one supporting reference when appropriate.
7. Follow the current exam version.
8. Avoid copyrighted or leaked exam questions.
9. Pass validation before publication.

For multiple-choice questions, all valid answers must be identified.

Do not create arbitrary percentage weights or passing thresholds presented as official exam rules.

## 11.6 Initial Content Targets

For the MVP:

- Catalog metadata for at least 8 verified certifications.
- All four Claude certifications discoverable.
- Three initial practice-ready tracks:
  - Claude Certified Associate – Foundations.
  - Claude Certified Developer – Foundations.
  - AWS Certified AI Practitioner.
- Approximately 30–50 independently authored, reviewed questions for each practice-ready track.
- At least one introductory lesson per selected knowledge domain.
- Clear "Coming Soon" or "Content in Preparation" status for incomplete tracks.

These are content production targets, not permission to fabricate questions or descriptions. If the content cannot be verified, leave the track incomplete and report the gap.

---

# 12. Practice Engine

## 12.1 Practice Modes

Support:

**Topic Practice**

- Select a knowledge topic.
- Answer questions.
- Receive immediate explanations.

**Domain Practice**

- Select an exam domain.
- Practice only relevant questions.

**Quick Practice**

- Small randomized question set.
- Useful for short study sessions.

**Review Mistakes**

- Revisit previously incorrect answers.
- Available after persistent progress is implemented.

## 12.2 Session State

Represent sessions with a state machine:

```text
created
   ↓
in_progress
   ↓
submitted
   ↓
graded
   ↓
reviewed
```

Handle interrupted and abandoned sessions explicitly.

## 12.3 Scoring

For the initial MVP:

- Single choice: one point for a correct answer.
- True/false: one point for a correct answer.
- Multiple choice: one point only when the full selected set matches.
- Unanswered: zero points.

Calculate:

`practiceScore = correctAnswers / totalQuestions × 100`

Handle empty question sets safely.

Always label this as a platform practice score.

## 12.4 Randomization

Support deterministic seeded shuffling for testing.

Randomize question order and answer order when appropriate.

Store answer keys using stable option IDs.

Avoid duplicate questions within a session unless repeated practice is explicitly requested.

---

# 13. Exam Simulator

## 13.1 Exam Behavior

A practice exam must support:

- Timed sessions.
- Configurable question count.
- Domain-based selection.
- Question navigation.
- Flag for review.
- Submission confirmation.
- Auto-submit on timeout.
- Unanswered question tracking.
- Post-exam explanations.
- Domain performance report.

## 13.2 Important Rules

In exam mode:

- Do not show correct answers during the exam.
- Do not provide AI explanations before submission.
- Do not allow a submitted attempt to be edited.
- Use clear labels for unofficial practice results.
- Show exam specification references where verified.

## 13.3 Frontend MVP Limitation

For the frontend-only phase, exam scoring can run locally.

Local question data and answer keys will be inspectable by users; therefore, this phase is not a secure examination environment.

When backend persistence is introduced:

- Generate attempts server-side.
- Store authoritative answer keys server-side.
- Grade on the server.
- Protect attempt ownership.
- Enforce valid state transitions.
- Apply rate limits and input validation.

The platform must not claim strong anti-cheating guarantees in its early version.

---

# 14. AI Tutor

**Implementation starts after the core learning and practice experience is stable.**

## 14.1 Main Capabilities

The AI Tutor should be able to:

- Explain AI concepts.
- Explain why an answer is correct.
- Explain why alternative answers are incorrect.
- Compare related concepts.
- Provide practical examples.
- Recommend related lessons.
- Identify knowledge gaps.
- Generate additional draft practice questions.
- Adapt explanations to the learner's language and experience.

## 14.2 Grounded Answering

Use retrieval over approved educational content.

Expected workflow:

```text
User Question
    ↓
Validate Request
    ↓
Determine Context
    ↓
Retrieve Relevant Sources
    ↓
Construct Grounded Prompt
    ↓
Generate Answer
    ↓
Validate Output
    ↓
Show Explanation + References
```

## 14.3 Tutor Requirements

- Prioritize verified content.
- Cite relevant sources.
- Distinguish official exam objectives from platform-authored explanations.
- Admit uncertainty when evidence is missing.
- Do not fabricate official certification requirements.
- Do not fabricate vendor documentation.
- Do not reproduce copyrighted exam dumps.
- Respond in the selected user language.
- Preserve technical terms where translation would be misleading.

If relevant information is unavailable, the tutor must state the limitation and suggest a related verified resource.

## 14.4 AI Provider Architecture

Define provider-neutral interfaces.

Example:

```typescript
interface TutorService {
  explainQuestion(
    input: ExplainQuestionInput
  ): Promise<TutorExplanation>;

  explainConcept(
    input: ExplainConceptInput
  ): Promise<ConceptExplanation>;

  recommendTopics(
    input: RecommendationInput
  ): Promise<TopicRecommendation[]>;
}
```

The rest of the application must not depend directly on provider-specific response formats.

Add:

- Model configuration.
- Request limits.
- Timeout handling.
- Retry policy.
- Cost tracking.
- Error handling.
- Prompt versioning.
- Output schema validation.

API keys must remain server-side.

## 14.5 AI Evaluation

Build a small reference evaluation set covering:

- Factual correctness.
- Answer-key agreement.
- Citation validity.
- Explanation usefulness.
- Language consistency.
- Refusal to invent missing sources.
- Protection against malicious instructions embedded in retrieved content.

Never publish AI-generated practice questions without validation and review.

---

# 15. Adaptive Learning

**Phase after AI Tutor.**

The system should analyze:

- Incorrect answer patterns.
- Knowledge-topic mastery.
- Domain performance.
- Repeated misconceptions.
- Study frequency.
- Review intervals.

It should recommend:

- Topics to revisit.
- Lessons to complete.
- Questions to practice.
- Suggested next certification.
- Personalized preparation sequence.

Use a simple deterministic rules-based recommendation engine first.

Do not introduce complex machine learning until enough reliable learning data exists to justify it.

---

# 16. Authentication and User Progress

## 16.1 MVP

Allow guest learning.

For the frontend MVP:

- Persist supported progress in local storage.
- Use versioned storage keys.
- Validate stored data before reading.
- Recover gracefully from malformed or outdated browser data.
- Clearly disclose that progress is stored on the current device.

## 16.2 Persistent Accounts

Introduce authentication in the backend phase.

Support:

- Email-based or OAuth sign-in.
- Account settings.
- Learning history.
- Saved questions.
- Exam attempts.
- Cross-device synchronization.

Security requirements:

- Server-side authorization.
- Ownership checks.
- Protected session data.
- Secure cookies.
- Input validation.
- Rate limiting.
- No browser exposure of server API credentials.

---

# 17. Search and Discovery

## 17.1 Initial Search

For the frontend phase, use client-side search over local typed datasets.

Searchable fields:

- Certification name.
- Provider.
- Topic.
- Level.
- Relevant skills.
- Keywords.

Support Vietnamese and English search where content is available.

## 17.2 Future Search

When persistent content grows, introduce:

- PostgreSQL full-text search.
- Indexed filters.
- Optional dedicated search service if justified.
- Semantic search for approved educational content.

Do not introduce vector infrastructure solely for the initial certification catalog.

---

# 18. SEO and Accessibility

## 18.1 SEO

Public content must support:

- Server-rendered metadata.
- Canonical URLs.
- Language alternates.
- Sitemap.
- Robots configuration.
- Open Graph metadata.
- Structured data where appropriate.
- Stable slugs.

Do not index private dashboard, active exam sessions or account pages.

## 18.2 Accessibility

Target WCAG 2.2 AA.

Requirements:

- Semantic HTML.
- Keyboard navigation.
- Visible focus indicators.
- Proper form labels.
- Appropriate contrast.
- Screen-reader-friendly answer states.
- Accessible dialogs.
- Reduced-motion support.
- No color-only correctness indicators.
- Accessible countdown timer behavior.

---

# 19. Performance Requirements

Target a responsive user experience on ordinary mobile devices.

Recommended quality targets:

| Metric | Target |
|---|---|
| LCP | ≤ 2.5 seconds at p75 |
| INP | ≤ 200 ms at p75 |
| CLS | ≤ 0.1 at p75 |
| Lighthouse Accessibility | ≥ 95 where practical |
| Lighthouse SEO | ≥ 95 for public pages |

Core Web Vitals should be evaluated using appropriate production-like conditions, not only local development measurements.

Additional requirements:

- Optimize images.
- Minimize client-side JavaScript.
- Lazy-load heavy modules.
- Split complex charts.
- Avoid unnecessary requests.
- Prevent layout shifts.
- Keep quiz interactions responsive.
- Avoid blocking the main thread with large question-bank processing.

---

# 20. Implementation Roadmap

## Phase 0 — Foundation

**Goal:** Establish a reliable project foundation.

Tasks:

- [ ] Initialize Next.js App Router project.
- [ ] Configure TypeScript strict mode.
- [ ] Configure Tailwind CSS.
- [ ] Install and configure shadcn/ui.
- [ ] Configure fonts and design tokens.
- [ ] Configure light/dark mode.
- [ ] Configure next-intl.
- [ ] Implement browser-language detection.
- [ ] Create shared layouts.
- [ ] Set up ESLint and formatting.
- [ ] Configure unit testing.
- [ ] Configure Playwright.
- [ ] Add environment variable examples.
- [ ] Configure Vercel build compatibility.

**Acceptance criteria:**

- Application starts successfully.
- Production build succeeds.
- Both locales work.
- Theme switch works.
- No major console errors.
- Basic tests pass.

## Phase 1 — Premium Frontend MVP

**Goal:** Deliver a visually polished, responsive, functional frontend.

Tasks:

- [ ] Implement homepage.
- [ ] Implement certification catalog.
- [ ] Implement provider filtering.
- [ ] Implement certification detail pages.
- [ ] Implement knowledge explorer.
- [ ] Implement learning paths.
- [ ] Implement lesson reader.
- [ ] Implement practice setup.
- [ ] Implement practice sessions.
- [ ] Implement local scoring.
- [ ] Implement practice result pages.
- [ ] Implement timed exam simulator.
- [ ] Implement dashboard.
- [ ] Add loading and empty states.
- [ ] Add error and not-found pages.
- [ ] Add responsive mobile navigation.
- [ ] Add accessible animation.
- [ ] Integrate verified sample content.
- [ ] Configure SEO metadata.
- [ ] Validate Vercel deployment.

**Acceptance criteria:**

- All MVP routes are operational.
- No dead navigation links.
- No decorative buttons masquerading as functional controls.
- Search and filters work.
- Practice answer selection works.
- Results are calculated correctly.
- Exam timer works.
- Local progress is restored correctly.
- English and Vietnamese interfaces work.
- Desktop and mobile layouts are usable.
- Automated tests and production build pass.

**This is the first major release milestone.**

Do not proceed to production backend work until this phase is stable.

## Phase 2 — Verified Content Expansion

**Goal:** Make the platform educationally useful.

Tasks:

- [ ] Complete the initial provider registry.
- [ ] Verify all four Claude certification entries.
- [ ] Add official exam references.
- [ ] Implement knowledge-topic taxonomy.
- [ ] Create initial learning modules.
- [ ] Create reviewed practice questions.
- [ ] Add question explanations.
- [ ] Add content validation scripts.
- [ ] Add content review states.
- [ ] Implement exam-version metadata.
- [ ] Clearly flag incomplete tracks.
- [ ] Add content source and update metadata.

**Acceptance criteria:**

- All initial catalog certifications have verified metadata.
- All published questions pass schema validation.
- Published questions have defensible answer keys.
- The three initial practice-ready tracks meet the approved content target, or missing content is explicitly documented.
- No unreviewed content is presented as verified.

## Phase 3 — Persistent Backend

**Goal:** Support real accounts and cross-device learning progress.

Tasks:

- [ ] Provision managed PostgreSQL.
- [ ] Implement Prisma schema.
- [ ] Add database migrations.
- [ ] Implement authentication.
- [ ] Create account and progress APIs.
- [ ] Implement persistent practice sessions.
- [ ] Implement persistent exam attempts.
- [ ] Move authoritative scoring to the server.
- [ ] Add authorization checks.
- [ ] Add input validation.
- [ ] Add API rate limiting.
- [ ] Migrate local progress when appropriate and authorized.
- [ ] Add backend integration tests.

**Acceptance criteria:**

- Users can sign in.
- User progress persists across devices.
- One user cannot access another user's attempts.
- Exam state transitions are validated server-side.
- Scoring matches the published question version.
- Database migrations and tests pass.

## Phase 4 — AI Tutor

**Goal:** Introduce helpful, grounded AI-assisted learning.

Tasks:

- [ ] Implement provider-neutral AI interface.
- [ ] Configure model provider.
- [ ] Implement approved-content retrieval.
- [ ] Implement citation-aware explanations.
- [ ] Build Tutor chat interface.
- [ ] Integrate question explanations.
- [ ] Integrate lesson-based Q&A.
- [ ] Add request validation.
- [ ] Add AI usage limits.
- [ ] Add cost monitoring.
- [ ] Add AI evaluation fixtures.
- [ ] Add failure and fallback handling.

**Acceptance criteria:**

- Tutor responds in the selected locale.
- Grounded answers reference relevant sources.
- Unsupported claims are not presented as verified.
- User-visible errors are handled gracefully.
- API keys remain server-side.
- Evaluation tests pass required thresholds.

## Phase 5 — Adaptive Learning

**Goal:** Personalize preparation.

Tasks:

- [ ] Analyze weak knowledge topics.
- [ ] Recommend relevant lessons.
- [ ] Introduce spaced repetition.
- [ ] Implement personalized quizzes.
- [ ] Implement preparation recommendations.
- [ ] Add domain analytics.
- [ ] Add learning history views.

**Acceptance criteria:**

- Recommendations derive from actual learning activity.
- Explanations identify the evidence behind recommendations.
- Users can revisit weak topics.
- Recommendations are deterministic and testable where possible.

## Phase 6 — Global Expansion

**Goal:** Scale certification coverage.

Tasks:

- [ ] Add additional providers.
- [ ] Expand approved question banks.
- [ ] Add more exam versions.
- [ ] Introduce certification lifecycle monitoring.
- [ ] Build content administration tools.
- [ ] Add automated source-change alerts.
- [ ] Support reviewer workflows.
- [ ] Add advanced practice analytics.
- [ ] Evaluate subscription features.
- [ ] Evaluate hands-on lab exercises.

**Acceptance criteria:**

- New certification programs can be added through data and content workflows without modifying the core learning architecture.
- Retired exam versions remain distinguishable.
- Content provenance and review history are preserved.

---

# 21. Testing Strategy

## 21.1 Unit Tests

Cover:

- Locale resolution.
- Search and filtering.
- Question validation.
- Answer checking.
- Score calculation.
- Question randomization.
- Exam timer logic.
- Exam state transitions.
- Local progress serialization.

## 21.2 Component Tests

Cover:

- Answer selection.
- Question navigation.
- Form validation.
- Theme switching.
- Language switching.
- Results presentation.
- Empty and error states.

## 21.3 End-to-End Tests

Required user journeys:

1. Open the homepage.
2. Search for a Claude certification.
3. Open its details.
4. Start a learning path.
5. Read a lesson.
6. Start a practice session.
7. Answer questions.
8. Submit and review results.
9. Start a timed exam.
10. Flag and revisit a question.
11. Submit the exam.
12. View detailed results.
13. Change language.
14. Navigate on mobile.

## 21.4 Localization Tests

Test:

- `vi-VN` resolves to Vietnamese.
- `en-US` resolves to English.
- `ja-JP` resolves to English.
- URL locale is respected.
- Manual preference is respected when no URL locale is supplied.
- Locale switching preserves the current page when a translation route exists.
- No missing translation keys on critical pages.

## 21.5 Release Quality Gates

Before marking any phase complete:

- TypeScript compilation passes.
- Lint passes.
- Tests pass.
- Production build passes.
- Core browser journeys work.
- No critical accessibility defects.
- No major responsive layout issues.
- Known limitations are documented.
- No claims of completed functionality without implementation evidence.

---

# 22. Vercel Deployment

## 22.1 Initial Deployment

Deploy the frontend MVP to Vercel.

Use the native Next.js deployment workflow.

Requirements:

- No Docker image.
- No Dockerfile.
- No container orchestration.
- Standard build configuration.
- Environment variables documented.
- Deployment preview support.

## 22.2 Environment Configuration

Use only the variables required by the implemented phase.

Potential future variables:

```env
NEXT_PUBLIC_APP_URL=
DATABASE_URL=
AUTH_SECRET=
AI_PROVIDER=
AI_MODEL=
AI_API_KEY=
```

Do not require database or AI variables during the frontend-only MVP.

Do not commit credentials or real secrets.

## 22.3 Operational Readiness

Before public release:

- Verify production routes.
- Verify locale redirects.
- Verify metadata.
- Verify error pages.
- Verify mobile layouts.
- Verify question loading.
- Verify static assets.
- Run smoke tests against the deployment.

---

# 23. Legal and Content Compliance

CertMind AI is an independent preparation platform.

Required rules:

1. Do not claim official vendor endorsement.
2. Do not reproduce confidential or leaked exam questions.
3. Do not copy paid question banks without permission.
4. Do not bulk-republish proprietary training materials.
5. Respect vendor trademarks.
6. Use official names only for accurate identification.
7. Maintain visible attribution and source links where appropriate.
8. Distinguish practice examinations from official exams.
9. Explain when certifications require organizational eligibility.
10. Maintain a process to correct inaccurate content.

Required disclaimer:

> CertMind AI is an independent learning and exam preparation platform. It is not affiliated with or endorsed by the certification providers listed on this website. All trademarks belong to their respective owners.

Provide a properly localized Vietnamese equivalent.

---

# 24. Definition of Done

A feature is complete only when:

- Implementation exists.
- User interaction works.
- Data contracts are valid.
- Error handling is present.
- Loading and empty states are considered.
- Responsive layout is verified.
- Localization is implemented.
- Accessibility is considered.
- Relevant tests pass.
- Production build passes.
- Documentation is updated.

A page that only displays a visual mockup does not count as a completed functional feature.

Do not report a feature as finished if its core behavior is simulated without clearly labeling it as a prototype.

---

# 25. AI Coding Agent Execution Instructions

## 25.1 Role

You are the lead software engineer and UI/UX implementation agent responsible for building CertMind AI.

Your responsibilities include:

- Architecture implementation.
- Frontend development.
- Component design.
- Data modeling.
- Testing.
- Accessibility.
- Performance.
- Documentation.
- Vercel readiness.

Treat this document as the project's primary implementation specification.

## 25.2 Execution Rules

**Rule 1 — Implement, do not only plan.**

Do not stop after producing a proposal or file structure.

Write production-quality code for the current authorized phase.

**Rule 2 — Work phase by phase.**

Begin with Phase 0 and Phase 1.

Do not implement backend, authentication, AI integrations or database infrastructure until the appropriate phase is started.

**Rule 3 — Prioritize actual functionality.**

The interface must work.

Avoid fake filters, fake progress indicators, fake certification statistics and placeholder actions.

**Rule 4 — Maintain architecture quality.**

Follow the repository structure, conventions and data contracts.

Avoid unnecessarily complex abstractions.

**Rule 5 — Verify implementation.**

Run relevant commands and inspect actual results.

Fix failures before declaring completion.

**Rule 6 — Preserve project scope.**

Do not introduce Docker, microservices, payments or unnecessary infrastructure.

**Rule 7 — Respect content accuracy.**

Never invent official certification details, exam objectives or unverifiable answer keys.

Use reviewed seed data and flag incomplete content.

**Rule 8 — Prioritize UI/UX polish.**

Ensure the application feels like a complete modern learning product.

Pay particular attention to the exam-taking experience.

**Rule 9 — No silent shortcuts.**

Do not silently skip required behavior or replace it with a nonfunctional mock.

Document constraints and incomplete work explicitly.

**Rule 10 — Keep documentation current.**

Maintain implementation progress, architectural decisions and known limitations.

## 25.3 Required Work Sequence

For each phase:

1. Inspect the existing repository.
2. Read `masterPlan.md`.
3. Identify the corresponding requirements.
4. Review existing implementation.
5. Create a concise task checklist.
6. Implement the required functionality.
7. Add or update tests.
8. Run validation commands.
9. Fix failures.
10. Verify relevant user flows.
11. Update documentation.
12. Report completed work and remaining limitations.

Do not overwrite unrelated existing changes.

Do not claim tests passed unless they were actually executed.

## 25.4 Phase Completion Report

At the end of each phase, provide:

```text
PHASE COMPLETION REPORT

Phase:
Status:

Implemented:
- ...

Files changed:
- ...

Validation:
- Typecheck:
- Lint:
- Unit tests:
- E2E tests:
- Production build:

Verified user flows:
- ...

Known limitations:
- ...

Next recommended phase:
- ...
```

## 25.5 Initial Execution Request

Start with **Phase 0 — Foundation** and **Phase 1 — Premium Frontend MVP**.

Build a complete, responsive and polished frontend for CertMind AI.

The first implementation must contain a working certification catalog, learning paths, practice sessions, local scoring, practice exam simulation and bilingual interface.

Use verified local data and browser persistence for the initial implementation.

Do not implement a database, authentication, paid subscriptions or live AI Tutor yet.

The UI must be visually coherent and production-ready for Vercel deployment.

After implementation:

- Run TypeScript validation.
- Run lint.
- Run unit tests.
- Run applicable E2E tests.
- Run the production build.
- Fix failures.
- Document remaining limitations.
- Provide deployment instructions.

**Do not stop after scaffolding. Deliver the functional frontend MVP.**

---

# 26. Project Success Criteria

The MVP is successful when a user can:

1. Visit CertMind AI on desktop or mobile.
2. Browse a catalog of verified AI certifications.
3. Discover the four official Claude certification tracks.
4. View official certification references and eligibility.
5. Select a practice-ready certification.
6. Follow a structured learning path.
7. Read useful learning material.
8. Complete a practice quiz.
9. Understand why their answers were correct or incorrect.
10. Complete a timed practice exam.
11. Review performance by domain.
12. Resume locally saved learning progress.
13. Switch between Vietnamese and English.
14. Navigate without broken interactions or major layout issues.

The frontend must remain extensible for future persistent progress, AI Tutor, adaptive learning and global certification coverage.

---

# 27. Recommended Development Priorities

When trade-offs arise, use this order:

1. Correctness and working functionality.
2. Learning and exam experience.
3. UI/UX consistency and accessibility.
4. Frontend performance.
5. Content accuracy and traceability.
6. Code maintainability.
7. Advanced AI capabilities.
8. Additional certification coverage.
9. Commercial features.

Do not sacrifice basic reliability for visual effects or speculative features.

---

# 28. Final Engineering Direction

CertMind AI must be built as a **frontend-first, AI-ready, globally extensible certification learning platform**.

The initial release should demonstrate an excellent learning and exam preparation experience without unnecessary infrastructure.

The long-term architecture must support:

- Multiple certification providers.
- Multiple exam versions.
- Reusable AI knowledge.
- Reviewed learning content.
- High-quality question banks.
- Server-authoritative exam scoring.
- AI-based explanations.
- Adaptive learning.
- Certification lifecycle management.
- International users.

**Start small, build the core experience well, verify every milestone, and expand through reusable modules rather than rebuilding the application.**

---

**END OF MASTER PLAN**
