import React, { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CERTIFICATIONS } from "@/content/certifications";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Timer,
  Award,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  CheckCircle2
} from "lucide-react";

export const instant = false;

export const metadata = {
  title: "Exam Simulator — CertMind AI",
  description: "Experience realistic, timed AI certification practice exams with countdown timers, auto-submit, and domain scoring.",
};

async function ExamsSelectionContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const practiceReadyCerts = CERTIFICATIONS.filter((c) => c.isPracticeReady);

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
          <Timer className="h-3.5 w-3.5" />
          <span>Realistic Exam Conditions</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Timed Exam Simulator
        </h1>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
          Simulate the real exam experience with full countdown timers, strict pacing, question flagging, and detailed domain-by-domain diagnostic score reports upon completion.
        </p>
      </div>

      {/* Simulator Feature Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary mt-0.5">
            <Timer className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Strict Countdown</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live timer with visual urgency alerts and automatic submission upon expiry.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary mt-0.5">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Question Palette & Flags</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Mark tricky questions for review and jump between questions instantly.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary mt-0.5">
            <Award className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Domain Score Reports</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Identifies your strong areas and weak domains against passing thresholds.
            </p>
          </div>
        </div>
      </div>

      {/* Certification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {practiceReadyCerts.map((cert) => (
          <Card key={cert.id} className="border-border/60 hover:border-primary/40 flex flex-col justify-between transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge variant="outline" className="text-xs uppercase font-semibold">
                  {cert.providerName}
                </Badge>
                <Badge variant="secondary" className="text-xs capitalize">
                  {cert.level}
                </Badge>
              </div>
              <CardTitle className="text-lg font-bold line-clamp-2">
                {cert.name}
              </CardTitle>
              {cert.examCode && (
                <p className="text-xs font-mono text-muted-foreground mt-0.5">
                  Code: {cert.examCode} • v{cert.version}
                </p>
              )}
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {cert.shortDescription}
              </p>

              <div className="grid grid-cols-3 gap-2 py-3 border-y border-border/50 text-center">
                <div>
                  <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <Timer className="h-3 w-3" /> Time
                  </div>
                  <div className="text-sm font-bold text-foreground mt-0.5">
                    {cert.durationMinutes}m
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <HelpCircle className="h-3 w-3" /> Items
                  </div>
                  <div className="text-sm font-bold text-foreground mt-0.5">
                    {cert.questionCount}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <Award className="h-3 w-3" /> Target
                  </div>
                  <div className="text-sm font-bold text-foreground mt-0.5">
                    {cert.passingScorePercent}%
                  </div>
                </div>
              </div>

              <Link href={`/exams/${cert.slug}`} className="block w-full pt-1">
                <Button className="w-full gap-2 font-semibold shadow-xs">
                  <Timer className="h-4 w-4" />
                  Launch Timed Simulator
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Legal & Independent Disclaimer */}
      <div className="p-4 rounded-xl border border-border/60 bg-muted/20 text-xs text-muted-foreground flex items-start gap-3">
        <ShieldAlert className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
        <p>
          <strong>Independent Practice Exam Disclaimer:</strong> CertMind AI practice exams are created independently by qualified practitioners. They simulate exam conditions and test syllabus topics, but do not contain confidential or leaked vendor exam questions.
        </p>
      </div>
    </div>
  );
}

export default function ExamsSelectionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <Suspense fallback={<div className="container mx-auto max-w-7xl px-4 py-10 animate-pulse h-96 bg-muted/20 rounded-2xl" />}>
      <ExamsSelectionContent params={params} />
    </Suspense>
  );
}
