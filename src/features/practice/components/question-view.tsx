"use client";

import React from "react";
import { Question } from "@/types/practice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, HelpCircle, Bookmark } from "lucide-react";

interface QuestionViewProps {
  question: Question;
  selectedOptionIds: string[];
  onSelectOption: (optionId: string) => void;
  showExplanation: boolean;
  isFlagged: boolean;
  onToggleFlag: () => void;
  mode?: "practice" | "exam";
}

export function QuestionView({
  question,
  selectedOptionIds,
  onSelectOption,
  showExplanation,
  isFlagged,
  onToggleFlag,
}: QuestionViewProps) {
  const isMultiple = question.type === "multiple_choice";

  return (
    <div className="space-y-6">
      {/* Question Header & Meta */}
      <div className="flex items-center justify-between gap-4 pb-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-mono capitalize">
            {isMultiple ? "Multiple Choice" : "Single Choice"}
          </Badge>
          <Badge variant="secondary" className="text-xs capitalize">
            {question.difficulty}
          </Badge>
        </div>

        <Button
          variant={isFlagged ? "default" : "outline"}
          size="sm"
          onClick={onToggleFlag}
          className="gap-1.5 text-xs h-8"
        >
          <Bookmark className={`h-3.5 w-3.5 ${isFlagged ? "fill-current" : ""}`} />
          <span>{isFlagged ? "Flagged for Review" : "Flag Question"}</span>
        </Button>
      </div>

      {/* Question Prompt */}
      <div className="text-base sm:text-lg font-semibold text-foreground leading-relaxed">
        {question.prompt}
      </div>

      {isMultiple && (
        <p className="text-xs text-muted-foreground italic">
          (Select all options that apply)
        </p>
      )}

      {/* Options List */}
      <div className="space-y-3 pt-2">
        {question.options.map((opt) => {
          const isSelected = selectedOptionIds.includes(opt.id);
          const isCorrect = question.correctOptionIds.includes(opt.id);

          let optionStyle = "border-border hover:border-primary/50 bg-card";
          let badgeStyle = "bg-muted text-muted-foreground border-border";

          if (showExplanation) {
            if (isCorrect) {
              optionStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100";
              badgeStyle = "bg-emerald-600 text-white border-emerald-600";
            } else if (isSelected && !isCorrect) {
              optionStyle = "border-rose-500 bg-rose-500/10 text-rose-950 dark:text-rose-100";
              badgeStyle = "bg-rose-600 text-white border-rose-600";
            }
          } else if (isSelected) {
            optionStyle = "border-primary bg-primary/5 shadow-xs ring-1 ring-primary";
            badgeStyle = "bg-primary text-primary-foreground border-primary";
          }

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectOption(opt.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-start gap-3.5 cursor-pointer ${optionStyle}`}
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-xs font-bold transition-colors ${badgeStyle}`}
              >
                {opt.id}
              </div>
              <div className="flex-1 text-sm leading-relaxed pt-0.5">
                {opt.text}
              </div>
              {showExplanation && (
                <div className="shrink-0 pt-0.5">
                  {isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  ) : isSelected ? (
                    <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                  ) : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Box */}
      {showExplanation && (
        <div className="mt-8 p-5 rounded-xl border border-border bg-muted/40 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-foreground">
            <HelpCircle className="h-4 w-4 text-primary" />
            <span>Detailed Explanation & Rationale</span>
          </div>

          <p className="text-sm text-foreground/90 leading-relaxed">
            {question.explanation}
          </p>

          {question.distractorExplanations && Object.keys(question.distractorExplanations).length > 0 && (
            <div className="pt-3 border-t border-border/60 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Why other options are incorrect:
              </p>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                {Object.entries(question.distractorExplanations).map(([optId, reason]) => (
                  <p key={optId} className="leading-relaxed">
                    <span className="font-bold text-foreground">Option {optId}:</span> {reason}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
