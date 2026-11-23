export type InterviewCategory =
  | "rag"
  | "agents"
  | "eval"
  | "serving"
  | "finetuning"
  | "security";

export type InterviewDifficulty = "junior" | "mid" | "senior" | "lead";

export type InterviewQuestionType = "screening" | "system_design";

export interface InterviewOption {
  id: string;
  text: string;
}

export interface SystemDesignDetails {
  scenario: string;
  recommendedArchitecture: string[];
  keyTradeoffs: string[];
  whatInterviewersLookFor: string;
  redFlagsToAvoid: string;
}

export interface InterviewQuestion {
  id: string;
  title: string;
  category: InterviewCategory;
  categoryName: string;
  difficulty: InterviewDifficulty;
  type: InterviewQuestionType;
  prompt: string;
  options?: InterviewOption[];
  correctOptionIds?: string[];
  explanation: string;
  distractorExplanations?: Record<string, string>;
  interviewTip: string;
  commonMistake: string;
  systemDesign?: SystemDesignDetails;
}
