export type QuestionType = "single_choice" | "multiple_choice";

export interface QuestionOption {
  id: string; // "A", "B", "C", "D"
  text: string;
}

export interface Question {
  id: string;
  certSlug: string;
  domainId: string;
  type: QuestionType;
  prompt: string;
  options: QuestionOption[];
  correctOptionIds: string[];
  explanation: string;
  distractorExplanations?: Record<string, string>;
  difficulty: "foundational" | "intermediate" | "advanced";
  referenceDocUrl?: string;
}

export interface DomainScore {
  domainId: string;
  domainName: string;
  total: number;
  correct: number;
  percentage: number;
}

export interface SessionResult {
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  isPassing: boolean;
  timeSpentSeconds: number;
  domainScores: DomainScore[];
}

export interface PracticeSessionState {
  id: string;
  certSlug: string;
  mode: "practice" | "exam";
  currentIndex: number;
  answers: Record<string, string[]>;
  flaggedQuestionIds: string[];
  startTime: number;
  endTime?: number;
  completed: boolean;
  result?: SessionResult;
}
