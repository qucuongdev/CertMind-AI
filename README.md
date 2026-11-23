# CertMind AI

> **Learn AI. Practice Smarter. Get Certified.**

An independent, production-grade AI certification preparation platform built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **TypeScript**.

---

## ✨ Features

- **Certification Catalog:** Explore AI certifications from leading technology providers (Anthropic Claude, AWS, Microsoft Azure, Google Cloud, NVIDIA, Databricks).
- **Domain Weight Transparency:** Verified syllabus weights with interactive progress bars and direct links to official study guides.
- **Interactive Practice Engine:** Question-by-question practice sessions with instant answer validation, detailed explanations, and distractor breakdowns.
- **Timed Exam Simulator:** Realistic simulation with live countdown timers, urgency alerts, auto-submission on expiry, question palette, flagging, and domain-by-domain diagnostic score reports.
- **Curriculum Lesson Reader:** In-depth interactive curriculum lessons with code snippets, key takeaways checklists, and completion tracking.
- **Reusable AI Knowledge Library:** Core concepts (RAG, Prompt Engineering, Agentic Tool Use / MCP, Responsible AI) taught once and applied across all certifications.
- **Learning Dashboard:** Track completed exam attempts, passing rates, and domain performance saved securely in browser storage.
- **Bilingual Interface:** Full English (`/en`) and Vietnamese (`/vi`) localization with instant language switching powered by `next-intl`.
- **Light & Dark Themes:** Responsive design optimized for mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16.4.6 (App Router, Partial Prerendering, Turbopack)
- **Language:** TypeScript 5.9
- **UI & Styling:** Tailwind CSS v4, shadcn/ui, Lucide Icons
- **State & Storage:** React 19 (`useSyncExternalStore`), Browser LocalStorage
- **Internationalization:** `next-intl` (English & Vietnamese)
- **Validation:** Zod Schema Content Validation
- **Testing:** Vitest 5.1

---

## 🚀 Getting Started

### Prerequisites

- Node.js v20+ (Node v22 recommended)
- pnpm v10+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd CertMind-AI

# Install dependencies
pnpm install
```

### Development

```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Quality & Verification Commands

```bash
# Run unit tests
pnpm test

# Run content integrity & schema validation
pnpm run validate:content

# Run ESLint
pnpm lint

# Build production bundle
pnpm build
```

---

## 🌐 Deploy to Vercel

CertMind AI is designed natively for zero-configuration deployment on **Vercel**.

### Option 1: Deploy via GitHub & Vercel Dashboard (Recommended)

1. Create a new repository on [GitHub](https://github.com/new).
2. Push this project to GitHub:
   ```bash
   git add .
   git commit -m "feat: initial release of CertMind AI"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. Go to [vercel.com/new](https://vercel.com/new).
4. Select your GitHub repository.
5. Vercel will automatically detect **Next.js** and **pnpm**.
6. Click **Deploy**. No additional environment variables are required for the frontend release!

### Option 2: Deploy via Vercel CLI

```bash
# Run Vercel deployment command
pnpm dlx vercel
```
Follow the interactive prompts to link your Vercel account and project. When ready for production:
```bash
pnpm dlx vercel --prod
```

---

## ⚖️ Independent Platform Disclaimer

CertMind AI is an independent learning and exam preparation platform. It is not affiliated with, authorized by, or endorsed by Anthropic, Amazon Web Services, Microsoft, Google Cloud, NVIDIA, Databricks, or any certification provider listed on the platform. All trademarks and registered trademarks belong to their respective owners. Practice questions and materials are independently authored for educational study purposes.
