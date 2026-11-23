"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Question } from "@/types/practice";
import { Certification } from "@/types/certification";
import { usePracticeEngine } from "@/features/practice/hooks/use-practice-engine";
import { useExamTimer } from "../hooks/use-exam-timer";
import { QuestionView } from "@/features/practice/components/question-view";
import { ResultSummary } from "@/features/practice/components/result-summary";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Send,
  ShieldCheck
} from "lucide-react";

interface ExamRunnerProps {
  certification: Certification;
  questions: Question[];
}

export function ExamRunner({ certification, questions }: ExamRunnerProps) {
  const [reviewMode, setReviewMode] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

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
    mode: "exam",
  });

  const { formattedTime, isUrgent } = useExamTimer({
    durationMinutes: certification.durationMinutes,
    isRunning: !session.completed,
    onTimeExpired: () => {
      submitSession();
    },
  });

  if (questions.length === 0) {
    return (
      <div className="text-center py-16 max-w-md mx-auto">
        <h3 className="text-lg font-bold">Exam currently unavailable</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Exam simulator questions for this track are being compiled.
        </p>
        <Link href="/certifications">
          <Button className="mt-4" variant="outline">
            Back to Certifications
          </Button>
        </Link>
      </div>
    );
  }

  // If completed and not in post-exam review, show full results
  if (session.completed && !reviewMode && session.result) {
    return (
      <ResultSummary
        certification={certification}
        result={session.result}
        mode="exam"
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

  const unAnsweredCount = totalQuestions - answeredCount;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Exam Header with Live Timer */}
      <div className="sticky top-16 z-30 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card/95 backdrop-blur shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-foreground leading-tight">
              {certification.name}
            </h1>
            <p className="text-xs text-muted-foreground">Official Simulation Environment</p>
          </div>
        </div>

        {/* Live Timer & Action */}
        <div className="flex items-center gap-4">
          {!session.completed ? (
            <>
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-sm font-bold ${
                  isUrgent
                    ? "border-rose-500 bg-rose-500/10 text-rose-600 animate-pulse"
                    : "border-border bg-muted/60 text-foreground"
                }`}
              >
                <Clock className="h-4 w-4" />
                <span>{formattedTime}</span>
              </div>

              <Button
                variant="default"
                size="sm"
                onClick={() => setShowSubmitConfirm(true)}
                className="font-semibold shadow-xs"
              >
                <Send className="h-3.5 w-3.5 mr-1.5" />
                Finish Exam
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setReviewMode(false)}
              className="font-semibold"
            >
              Back to Score Report
            </Button>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-foreground">Submit Exam for Scoring?</h3>
            <p className="text-sm text-muted-foreground">
              You have answered <span className="font-bold text-foreground">{answeredCount}</span> of{" "}
              <span className="font-bold text-foreground">{totalQuestions}</span> questions.
              {unAnsweredCount > 0 && (
                <span className="block mt-2 text-rose-600 dark:text-rose-400 font-medium">
                  Warning: You have {unAnsweredCount} unanswered questions!
                </span>
              )}
            </p>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSubmitConfirm(false)}
              >
                Continue Exam
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setShowSubmitConfirm(false);
                  submitSession();
                }}
              >
                Confirm & Submit
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Exam Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Question Display */}
        <div className="lg:col-span-3 space-y-6 bg-card border border-border p-6 rounded-2xl shadow-2xs">
          {currentQuestion && (
            <QuestionView
              question={currentQuestion}
              selectedOptionIds={userSelectedOptions}
              onSelectOption={selectOption}
              showExplanation={session.completed}
              isFlagged={isFlagged}
              onToggleFlag={toggleFlagQuestion}
              mode="exam"
            />
          )}

          {/* Nav Controls */}
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

        {/* Question Palette Sidebar */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-foreground uppercase tracking-wider">
                Exam Palette
              </p>
              <Badge variant="outline" className="text-[10px] font-mono">
                {answeredCount}/{totalQuestions}
              </Badge>
            </div>

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
                <span>Flagged for Review</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
