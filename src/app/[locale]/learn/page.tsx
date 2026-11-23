import React, { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CERTIFICATIONS } from "@/content/certifications";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

export const instant = false;

export const metadata = {
  title: "Learning Paths — CertMind AI",
  description: "Curated learning paths designed to prepare you for AI certification exams efficiently.",
};

async function LearningPathsContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Structured Learning Paths
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Step-by-step study sequences aligning shared core AI concepts with certification-specific requirements.
        </p>
      </div>

      <div className="space-y-6">
        {CERTIFICATIONS.filter((c) => c.isPracticeReady).map((cert) => (
          <Card key={cert.id} className="border-border/70 overflow-hidden">
            <CardHeader className="bg-muted/30 pb-4 border-b border-border/50">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <Badge variant="outline" className="text-xs uppercase font-mono">
                  {cert.providerName}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {cert.domains.length} Core Domains
                </Badge>
              </div>
              <CardTitle className="text-xl font-bold">
                {cert.name}
              </CardTitle>
              <CardDescription className="text-sm">
                {cert.shortDescription}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Stepper Milestones */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border border-border/60 bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      1
                    </span>
                    <span className="text-xs font-bold text-foreground">Core Concepts</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Study fundamental prompting and model architecture.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border/60 bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      2
                    </span>
                    <span className="text-xs font-bold text-foreground">Domain Objectives</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Deep dive into vendor-specific tool use and SDK patterns.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border/60 bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      3
                    </span>
                    <span className="text-xs font-bold text-foreground">Targeted Practice</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Review verified questions and clarify distractor traps.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border/60 bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      4
                    </span>
                    <span className="text-xs font-bold text-foreground">Timed Simulation</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Benchmark exam readiness with real {cert.durationMinutes}-minute timer.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Verified against official exam guide v{cert.version}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Link href={`/learn/${cert.slug}`}>
                    <Button variant="default" size="sm" className="gap-1.5 font-semibold">
                      <span>Start Lessons</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                  <Link href={`/practice/${cert.slug}`}>
                    <Button variant="outline" size="sm" className="gap-1.5 font-semibold">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Practice Questions</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function LearningPathsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <Suspense fallback={<div className="container mx-auto max-w-7xl px-4 py-10 animate-pulse h-96 bg-muted/20 rounded-2xl" />}>
      <LearningPathsContent params={params} />
    </Suspense>
  );
}
