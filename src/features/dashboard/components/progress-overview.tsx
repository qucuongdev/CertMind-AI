"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { getCompletedRecords } from "@/lib/local-storage";
import { CERTIFICATIONS } from "@/content/certifications";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  RotateCcw
} from "lucide-react";

const emptySubscribe = () => () => {};

function useMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function ProgressOverview() {
  const mounted = useMounted();
  const records = mounted ? getCompletedRecords() : [];

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="h-28 rounded-2xl bg-muted/40 animate-pulse" />
        <div className="h-64 rounded-2xl bg-muted/40 animate-pulse" />
      </div>
    );
  }

  const totalExams = records.length;
  const passedExams = records.filter((r) => r.result.isPassing).length;
  const averageScore =
    totalExams > 0
      ? Math.round(
          records.reduce((acc, curr) => acc + curr.result.scorePercentage, 0) / totalExams
        )
      : 0;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-medium uppercase tracking-wider">
              Completed Sessions
            </CardDescription>
            <CardTitle className="text-3xl font-black text-foreground">
              {totalExams}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {passedExams} passed official benchmark
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-medium uppercase tracking-wider">
              Average Score
            </CardDescription>
            <CardTitle className="text-3xl font-black text-foreground">
              {averageScore}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
              Calculated across all attempts
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-medium uppercase tracking-wider">
              Target Certifications
            </CardDescription>
            <CardTitle className="text-3xl font-black text-foreground">
              {CERTIFICATIONS.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              4 Claude tracks + AWS, Azure, Google
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Practice History Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Recent Exam & Practice History</CardTitle>
          <CardDescription>
            Track your performance progress over time on your device.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {records.length > 0 ? (
            <div className="divide-y divide-border">
              {records.map((rec) => (
                <div
                  key={rec.id}
                  className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] uppercase font-mono">
                        {rec.mode}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(rec.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      {rec.certName}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 font-bold text-sm">
                        {rec.result.isPassing ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                        )}
                        <span>{rec.result.scorePercentage}%</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        {rec.result.correctAnswers}/{rec.result.totalQuestions} correct
                      </p>
                    </div>

                    <Link href={`/practice/${rec.certSlug}`}>
                      <Button variant="outline" size="sm" className="gap-1 text-xs h-8">
                        <RotateCcw className="h-3 w-3" />
                        <span>Retake</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4 space-y-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                <Sparkles className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-foreground">No practice sessions completed yet</h4>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Select a certification from our catalog to start practicing with verified questions and timed exam simulations.
              </p>
              <Link href="/certifications">
                <Button size="sm" className="mt-2 font-semibold">
                  Browse Certification Catalog
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommended Practice Tracks */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Recommended Next Steps</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/practice/claude-certified-associate-foundations"
            className="p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-xs transition-all flex items-center justify-between group"
          >
            <div>
              <Badge variant="outline" className="text-[10px] uppercase mb-1">
                Anthropic
              </Badge>
              <p className="font-bold text-foreground group-hover:text-primary transition-colors text-sm">
                Claude Certified Associate – Foundations
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                4 verified practice questions • 70% passing threshold
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/practice/aws-certified-ai-practitioner"
            className="p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-xs transition-all flex items-center justify-between group"
          >
            <div>
              <Badge variant="outline" className="text-[10px] uppercase mb-1">
                AWS
              </Badge>
              <p className="font-bold text-foreground group-hover:text-primary transition-colors text-sm">
                AWS Certified AI Practitioner
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Bedrock, SageMaker & Responsible AI
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
