import React from "react";
import { Link } from "@/i18n/navigation";
import { Certification } from "@/types/certification";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Clock,
  HelpCircle,
  Award,
  ExternalLink,
  Sparkles,
  Timer,
  ChevronLeft,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface CertDetailsProps {
  cert: Certification;
}

export function CertDetails({ cert }: CertDetailsProps) {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Back button */}
      <div>
        <Link
          href="/certifications"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Certifications Catalog
        </Link>
      </div>

      {/* Hero Header */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs font-semibold uppercase tracking-wider">
              {cert.providerName}
            </Badge>
            <Badge variant="secondary" className="text-xs capitalize">
              {cert.level} Level
            </Badge>
            <Badge variant="outline" className="text-xs font-mono">
              Status: {cert.status}
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground">
            Verified: {cert.lastVerifiedDate}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
          {cert.name}
        </h1>

        {cert.examCode && (
          <p className="text-sm font-mono text-muted-foreground mt-2">
            Official Exam Code: <span className="font-semibold text-foreground">{cert.examCode}</span>
          </p>
        )}

        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          {cert.description}
        </p>

        {/* Quick Exam Specifications */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-muted/40 border border-border/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-background text-primary">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-medium">Exam Duration</p>
              <p className="text-sm font-bold text-foreground">{cert.durationMinutes} Minutes</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-background text-primary">
              <HelpCircle className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-medium">Questions</p>
              <p className="text-sm font-bold text-foreground">{cert.questionCount} Items</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-background text-primary">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-medium">Passing Score</p>
              <p className="text-sm font-bold text-foreground">{cert.passingScorePercent}%</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-background text-primary">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-medium">Curriculum</p>
              <p className="text-sm font-bold text-foreground">v{cert.version}</p>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-4 pt-6 border-t border-border">
          {cert.isPracticeReady ? (
            <>
              <Link href={`/practice/${cert.slug}`}>
                <Button size="lg" className="gap-2 font-semibold shadow-xs">
                  <Sparkles className="h-4 w-4" />
                  Practice Questions
                </Button>
              </Link>
              <Link href={`/exams/${cert.slug}`}>
                <Button size="lg" variant="outline" className="gap-2 font-semibold">
                  <Timer className="h-4 w-4" />
                  Start Timed Simulator ({cert.durationMinutes}m)
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-500/10 px-4 py-2.5 rounded-lg border border-amber-500/20">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>Question bank currently under peer review for this track.</span>
            </div>
          )}

          <a
            href={cert.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <span>Official Guide</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Official Exam Domains & Weights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Exam Domains & Objectives</CardTitle>
          <CardDescription>
            Weighted breakdown of knowledge areas as outlined in the official exam guide.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {cert.domains.map((domain) => (
            <div key={domain.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm font-medium">
                <span className="text-foreground font-semibold">{domain.name}</span>
                <span className="text-muted-foreground font-mono text-xs">{domain.weightPercent}%</span>
              </div>
              <Progress value={domain.weightPercent} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Eligibility and Verification Disclaimer */}
      <div className="rounded-xl border border-border/80 bg-muted/20 p-5 text-xs text-muted-foreground space-y-2">
        <p className="font-semibold text-foreground">Official Eligibility & Sourcing Notice:</p>
        <p>{cert.eligibility}</p>
        <p>
          CertMind AI is an independent preparation resource. We do not administer official exams or award vendor certificates.
        </p>
      </div>
    </div>
  );
}
