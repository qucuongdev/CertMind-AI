"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Question } from "@/types/practice";
import { Certification } from "@/types/certification";
import { usePracticeEngine } from "../hooks/use-practice-engine";
import { QuestionView } from "./question-view";
import { ResultSummary } from "./result-summary";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Send,
  ArrowLeft
} from "lucide-react";

interface PracticeSessionProps {
  certification: Certification;
  questions: Question[];
}

export function PracticeSession({
  certification,
  questions,
}: PracticeSessionProps) {
  const [reviewMode, setReviewMode] = useState(false);

  const {
    session,
    currentQuestion,
    selectOption,
    toggleFlagQuestion,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    submitSession,
    resetSession,
    totalQuestions,
    answeredCount,
    isFlagged,
    userSelectedOptions,
  } = usePracticeEngine({
    certification,
    questions,
    mode: "practice",
  });

  if (questions.length === 0) {
    return (
      <div className="text-center py-16 max-w-md mx-auto">
        <h3 className="text-lg font-bold">No questions available</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Questions for this certification are currently under peer review.
        </p>
        <Link href="/certifications">
          <Button className="mt-4" variant="outline">
            Back to Certifications
          </Button>
        </Link>
      </div>
    );
  }

  // If completed and not reviewing specific question, show result summary
  if (session.completed && !reviewMode && session.result) {
    return (
      <ResultSummary
        certification={certification}
        result={session.result}
        mode="practice"
        onRetake={() => {
          setReviewMode(false);
          resetSession();
        }}
        onReviewAnswers={() => {
          setReviewMode(true);
          goToQuestion(0);
        }}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Link href={`/certifications/${certification.slug}`}>
            <Button variant="ghost" size="icon" aria-label="Back to certification">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-foreground leading-tight">
              {certification.name}
            </h1>
            <p className="text-xs text-muted-foreground">
              Practice Mode • Instant Explanations Enabled
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="outline" className="font-mono text-xs">
            Answered: {answeredCount}/{totalQuestions}
          </Badge>
          {!session.completed ? (
            <Button
              size="sm"
              variant="default"
              onClick={submitSession}
              disabled={answeredCount === 0}
              className="gap-1.5 font-semibold"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Complete & Score</span>
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setReviewMode(false)}
              className="font-semibold"
            >
              Back to Score Summary
            </Button>
          )}
        </div>
      </div>

      {/* Main Layout: Question + Question Palette Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Question Column */}
        <div className="lg:col-span-3 space-y-6 bg-card border border-border p-6 rounded-2xl shadow-2xs">
          {currentQuestion && (
            <QuestionView
              question={currentQuestion}
              selectedOptionIds={userSelectedOptions}
              onSelectOption={selectOption}
              showExplanation={session.completed || userSelectedOptions.length > 0}
              isFlagged={isFlagged}
              onToggleFlag={toggleFlagQuestion}
              mode="practice"
            />
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={prevQuestion}
              disabled={session.currentIndex === 0}
              className="gap-1.5"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <span className="text-xs font-medium text-muted-foreground">
              Question {session.currentIndex + 1} of {totalQuestions}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={nextQuestion}
              disabled={session.currentIndex === totalQuestions - 1}
              className="gap-1.5"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Sidebar Question Palette */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <p className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
              Questions Navigation
            </p>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isCurrent = idx === session.currentIndex;
                const isAnswered = (session.answers[q.id] || []).length > 0;
                const isQFlagged = session.flaggedQuestionIds.includes(q.id);

                let customClass = "border-border text-foreground hover:bg-muted";

                if (isCurrent) {
                  customClass = "border-primary bg-primary text-primary-foreground font-bold shadow-xs";
                } else if (isAnswered) {
                  customClass = "border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(idx)}
                    className={`relative h-9 rounded-lg text-xs font-mono transition-all flex items-center justify-center cursor-pointer ${customClass}`}
                  >
                    {idx + 1}
                    {isQFlagged && (
                      <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-border/60 space-y-1.5 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span>Current</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span>Flagged</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
