export interface LessonSection {
  title: string;
  content: string;
  codeSnippet?: string;
  language?: string;
}

export interface Lesson {
  id: string;
  certSlug: string;
  moduleId: string;
  moduleTitle: string;
  slug: string;
  title: string;
  durationMinutes: number;
  summary: string;
  sections: LessonSection[];
  keyTakeaways: string[];
  relatedQuestionIds: string[];
}
