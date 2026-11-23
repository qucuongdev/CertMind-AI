import React from "react";
import { Link } from "@/i18n/navigation";
import { SessionResult } from "@/types/practice";
import { Certification } from "@/types/certification";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, XCircle, RotateCcw, LayoutDashboard } from "lucide-react";

interface ResultSummaryProps {
  certification: Certification;
  result: SessionResult;
  mode?: "practice" | "exam";
  onRetake: () => void;
  onReviewAnswers: () => void;
}

export function ResultSummary({
  certification,
  result,
  onRetake,
  onReviewAnswers,
}: ResultSummaryProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div
        className={`p-6 sm:p-8 rounded-2xl border text-center space-y-3 ${
          result.isPassing
            ? "border-emerald-500/30 bg-emerald-500/10"
            : "border-rose-500/30 bg-rose-500/10"
        }`}
      >
        <div className="inline-flex p-3 rounded-full bg-background shadow-xs mb-1">
          {result.isPassing ? (
            <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <XCircle className="h-8 w-8 text-rose-600 dark:text-rose-400" />
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
          {result.isPassing ? "Congratulations! You Passed" : "Needs Review — Not Passing Yet"}
        </h2>

        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {result.isPassing
            ? `Your score meets or exceeds the official passing benchmark (${certification.passingScorePercent}%) for ${certification.name}.`
            : `Official passing benchmark is ${certification.passingScorePercent}%. Focus on your lowest scoring domains below.`}
        </p>

        {/* Big Score Card */}
        <div className="pt-4 flex items-center justify-center gap-8">
          <div>
            <p className="text-4xl sm:text-5xl font-black text-foreground">
              {result.scorePercentage}%
            </p>
            <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wider mt-1">
              Final Score
            </p>
          </div>
          <div className="h-10 w-px bg-border" />
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground">
              {result.correctAnswers} / {result.totalQuestions}
            </p>
            <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wider mt-1">
              Correct Answers
            </p>
          </div>
          <div className="h-10 w-px bg-border" />
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground">
              {formatTime(result.timeSpentSeconds)}
            </p>
            <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wider mt-1">
              Time Spent
            </p>
          </div>
        </div>
      </div>

      {/* Domain Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Performance by Domain</CardTitle>
          <CardDescription>
            Identify strengths and weaknesses across each exam objective.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {result.domainScores.map((ds) => {
            const isDomainPass = ds.percentage >= certification.passingScorePercent;
            return (
              <div key={ds.domainId} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-foreground">{ds.domainName}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {ds.correct}/{ds.total} ({ds.percentage}%)
                  </span>
                </div>
                <Progress
                  value={ds.percentage}
                  className={`h-2.5 ${isDomainPass ? "" : "[&>div]:bg-amber-500"}`}
                />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Action Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Button onClick={onReviewAnswers} variant="default" size="lg" className="font-semibold">
          Review Detailed Explanations
        </Button>
        <Button onClick={onRetake} variant="outline" size="lg" className="gap-2 font-semibold">
          <RotateCcw className="h-4 w-4" />
          Retake Session
        </Button>
        <Link href="/dashboard">
          <Button variant="ghost" size="lg" className="gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
