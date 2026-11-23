"use client";

import React, { useState, useMemo, useSyncExternalStore } from "react";
import { Link } from "@/i18n/navigation";
import { Lesson } from "@/types/lesson";
import { Certification } from "@/types/certification";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  BookmarkCheck
} from "lucide-react";

interface LessonReaderProps {
  certification: Certification;
  lessons: Lesson[];
  initialLessonIndex?: number;
}

const emptySubscribe = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("cm_lesson_updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("cm_lesson_updated", callback);
  };
};

export function LessonReader({
  certification,
  lessons,
  initialLessonIndex = 0,
}: LessonReaderProps) {
  const [currentIndex, setCurrentIndex] = useState(initialLessonIndex);

  const rawSaved = useSyncExternalStore(
    emptySubscribe,
    () => {
      try {
        return localStorage.getItem(`completed_lessons_${certification.slug}`) || "[]";
      } catch {
        return "[]";
      }
    },
    () => "[]"
  );

  const completedLessonIds = useMemo<string[]>(() => {
    try {
      return JSON.parse(rawSaved);
    } catch {
      return [];
    }
  }, [rawSaved]);

  const toggleComplete = (lessonId: string) => {
    const isCompleted = completedLessonIds.includes(lessonId);
    const updated = isCompleted
      ? completedLessonIds.filter((id) => id !== lessonId)
      : [...completedLessonIds, lessonId];

    try {
      localStorage.setItem(`completed_lessons_${certification.slug}`, JSON.stringify(updated));
      window.dispatchEvent(new Event("cm_lesson_updated"));
    } catch (e) {
      console.error("Failed to save completed lesson", e);
    }
  };

  if (lessons.length === 0) {
    return (
      <div className="text-center py-16 max-w-md mx-auto">
        <h3 className="text-lg font-bold">Lessons Under Development</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Curated learning modules for {certification.name} are currently being drafted.
        </p>
        <Link href="/learn">
          <Button className="mt-4" variant="outline">
            Back to Learning Paths
          </Button>
        </Link>
      </div>
    );
  }

  const currentLesson = lessons[currentIndex];
  const isCurrentCompleted = completedLessonIds.includes(currentLesson.id);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Link href="/learn">
            <Button variant="ghost" size="icon" aria-label="Back to Learning Paths">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] uppercase font-mono">
                {certification.providerName}
              </Badge>
              <span className="text-xs text-muted-foreground font-medium">
                {currentLesson.moduleTitle}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight mt-1">
              {certification.name} — Interactive Curriculum
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="font-mono text-xs">
            Completed: {completedLessonIds.length}/{lessons.length}
          </Badge>
          <Link href={`/practice/${certification.slug}`}>
            <Button size="sm" variant="outline" className="gap-1.5 font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Practice Questions</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid: Content + Lessons Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Lesson Sidebar */}
        <div className="space-y-4 order-2 lg:order-1">
          <div className="p-4 rounded-2xl border border-border bg-card space-y-3">
            <p className="text-xs font-bold text-foreground uppercase tracking-wider">
              Curriculum Lessons
            </p>
            <div className="space-y-1.5">
              {lessons.map((lesson, idx) => {
                const isSelected = idx === currentIndex;
                const isDone = completedLessonIds.includes(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-start gap-2.5 cursor-pointer border ${
                      isSelected
                        ? "border-primary bg-primary/10 text-primary font-semibold shadow-2xs"
                        : "border-transparent text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    }`}
                  >
                    <div className="pt-0.5">
                      {isDone ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-border text-[9px] font-mono">
                          {idx + 1}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 line-clamp-2 leading-snug">
                      {lesson.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Lesson Content */}
        <div className="lg:col-span-3 space-y-8 order-1 lg:order-2 bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-2xs">
          {/* Lesson Header */}
          <div className="space-y-3 pb-6 border-b border-border">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{currentLesson.durationMinutes} min reading time</span>
              </div>
              <Button
                size="sm"
                variant={isCurrentCompleted ? "default" : "outline"}
                onClick={() => toggleComplete(currentLesson.id)}
                className="gap-1.5 text-xs h-8"
              >
                <BookmarkCheck className="h-3.5 w-3.5" />
                <span>{isCurrentCompleted ? "Completed" : "Mark as Complete"}</span>
              </Button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {currentLesson.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {currentLesson.summary}
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {currentLesson.sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-lg font-bold text-foreground">
                  {section.title}
                </h3>
                <p className="text-sm text-foreground/90 whitespace-pre-line leading-relaxed">
                  {section.content}
                </p>

                {section.codeSnippet && (
                  <div className="mt-3 overflow-hidden rounded-xl border border-border bg-muted/50">
                    {section.language && (
                      <div className="px-4 py-1.5 border-b border-border/50 text-[11px] font-mono text-muted-foreground uppercase tracking-wider bg-muted/80">
                        {section.language}
                      </div>
                    )}
                    <pre className="p-4 text-xs font-mono text-foreground overflow-x-auto leading-relaxed">
                      <code>{section.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Key Takeaways */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2 text-primary">
                <CheckCircle2 className="h-5 w-5" />
                <span>Official Exam Key Takeaways</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {currentLesson.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/90">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentIndex(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="gap-1.5"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous Lesson
            </Button>

            <span className="text-xs text-muted-foreground font-medium">
              Lesson {currentIndex + 1} of {lessons.length}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentIndex(currentIndex + 1)}
              disabled={currentIndex === lessons.length - 1}
              className="gap-1.5"
            >
              Next Lesson
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
