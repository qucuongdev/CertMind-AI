"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Question, PracticeSessionState, SessionResult, DomainScore } from "@/types/practice";
import { Certification } from "@/types/certification";
import {
  saveActiveSession,
  getActiveSession,
  clearActiveSession,
  saveCompletedRecord
} from "@/lib/local-storage";

interface UsePracticeEngineOptions {
  certification: Certification;
  questions: Question[];
  mode: "practice" | "exam";
}

export function usePracticeEngine({
  certification,
  questions,
  mode
}: UsePracticeEngineOptions) {
  const [session, setSession] = useState<PracticeSessionState>(() => {
    // Check if there is an existing saved session for this cert
    const existing = getActiveSession(certification.slug);
    if (existing && existing.mode === mode && !existing.completed) {
      return existing;
    }

    return {
      id: `${certification.slug}-${mode}-${Date.now()}`,
      certSlug: certification.slug,
      mode,
      currentIndex: 0,
      answers: {},
      flaggedQuestionIds: [],
      startTime: Date.now(),
      completed: false,
    };
  });

  // Keep saved to localStorage
  useEffect(() => {
    if (!session.completed) {
      saveActiveSession(session);
    }
  }, [session]);

  const currentQuestion: Question | undefined = useMemo(() => {
    return questions[session.currentIndex];
  }, [questions, session.currentIndex]);

  const selectOption = useCallback(
    (optionId: string) => {
      if (session.completed || !currentQuestion) return;

      setSession((prev) => {
        const questionId = currentQuestion.id;
        const currentSelected = prev.answers[questionId] || [];

        let newSelected: string[];
        if (currentQuestion.type === "multiple_choice") {
          if (currentSelected.includes(optionId)) {
            newSelected = currentSelected.filter((id) => id !== optionId);
          } else {
            newSelected = [...currentSelected, optionId];
          }
        } else {
          // single choice
          newSelected = [optionId];
        }

        return {
          ...prev,
          answers: {
            ...prev.answers,
            [questionId]: newSelected,
          },
        };
      });
    },
    [session.completed, currentQuestion]
  );

  const toggleFlagQuestion = useCallback(() => {
    if (!currentQuestion) return;
    const qId = currentQuestion.id;
    setSession((prev) => {
      const isFlagged = prev.flaggedQuestionIds.includes(qId);
      const newFlags = isFlagged
        ? prev.flaggedQuestionIds.filter((id) => id !== qId)
        : [...prev.flaggedQuestionIds, qId];

      return {
        ...prev,
        flaggedQuestionIds: newFlags,
      };
    });
  }, [currentQuestion]);

  const goToQuestion = useCallback(
    (index: number) => {
      if (index >= 0 && index < questions.length) {
        setSession((prev) => ({ ...prev, currentIndex: index }));
      }
    },
    [questions.length]
  );

  const nextQuestion = useCallback(() => {
    setSession((prev) => {
      if (prev.currentIndex < questions.length - 1) {
        return { ...prev, currentIndex: prev.currentIndex + 1 };
      }
      return prev;
    });
  }, [questions.length]);

  const prevQuestion = useCallback(() => {
    setSession((prev) => {
      if (prev.currentIndex > 0) {
        return { ...prev, currentIndex: prev.currentIndex - 1 };
      }
      return prev;
    });
  }, []);

  const calculateResults = useCallback((): SessionResult => {
    let correctCount = 0;
    const domainMap: Record<string, { total: number; correct: number }> = {};

    certification.domains.forEach((d) => {
      domainMap[d.id] = { total: 0, correct: 0 };
    });

    questions.forEach((q) => {
      if (!domainMap[q.domainId]) {
        domainMap[q.domainId] = { total: 0, correct: 0 };
      }
      domainMap[q.domainId].total += 1;

      const userAns = session.answers[q.id] || [];
      const correctAns = q.correctOptionIds;

      const isCorrect =
        userAns.length === correctAns.length &&
        userAns.every((ans) => correctAns.includes(ans));

      if (isCorrect) {
        correctCount += 1;
        domainMap[q.domainId].correct += 1;
      }
    });

    const totalQuestions = questions.length;
    const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const isPassing = scorePercentage >= certification.passingScorePercent;
    const timeSpentSeconds = Math.max(1, Math.floor((Date.now() - session.startTime) / 1000));

    const domainScores: DomainScore[] = certification.domains.map((d) => {
      const stats = domainMap[d.id] || { total: 0, correct: 0 };
      return {
        domainId: d.id,
        domainName: d.name,
        total: stats.total,
        correct: stats.correct,
        percentage: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
      };
    });

    return {
      totalQuestions,
      correctAnswers: correctCount,
      scorePercentage,
      isPassing,
      timeSpentSeconds,
      domainScores,
    };
  }, [certification, questions, session.answers, session.startTime]);

  const submitSession = useCallback(() => {
    const result = calculateResults();
    const completedSession: PracticeSessionState = {
      ...session,
      completed: true,
      endTime: Date.now(),
      result,
    };

    setSession(completedSession);
    clearActiveSession(certification.slug);

    saveCompletedRecord({
      id: completedSession.id,
      certSlug: certification.slug,
      certName: certification.name,
      date: new Date().toISOString(),
      mode,
      result,
    });
  }, [calculateResults, session, certification, mode]);

  const resetSession = useCallback(() => {
    clearActiveSession(certification.slug);
    setSession({
      id: `${certification.slug}-${mode}-${Date.now()}`,
      certSlug: certification.slug,
      mode,
      currentIndex: 0,
      answers: {},
      flaggedQuestionIds: [],
      startTime: Date.now(),
      completed: false,
    });
  }, [certification.slug, mode]);

  return {
    session,
    currentQuestion,
    selectOption,
    toggleFlagQuestion,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    submitSession,
    resetSession,
    totalQuestions: questions.length,
    answeredCount: Object.keys(session.answers).length,
    isFlagged: currentQuestion ? session.flaggedQuestionIds.includes(currentQuestion.id) : false,
    userSelectedOptions: currentQuestion ? session.answers[currentQuestion.id] || [] : [],
  };
}
