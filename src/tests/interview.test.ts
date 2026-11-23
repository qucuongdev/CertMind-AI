import { describe, it, expect } from "vitest";
import { INTERVIEW_QUESTIONS } from "@/content/interview-questions";

describe("AI Engineer Interview Questions Integrity", () => {
  it("should have at least 10 comprehensive interview questions", () => {
    expect(INTERVIEW_QUESTIONS.length).toBeGreaterThanOrEqual(10);
  });

  it("should have unique question IDs", () => {
    const ids = new Set<string>();
    INTERVIEW_QUESTIONS.forEach((q) => {
      expect(ids.has(q.id)).toBe(false);
      ids.add(q.id);
    });
  });

  it("should validate screening questions have options, correct answers and tips", () => {
    const screening = INTERVIEW_QUESTIONS.filter((q) => q.type === "screening");
    expect(screening.length).toBeGreaterThanOrEqual(7);

    screening.forEach((q) => {
      expect(q.options).toBeDefined();
      expect(q.options!.length).toBeGreaterThanOrEqual(2);
      expect(q.correctOptionIds).toBeDefined();
      expect(q.correctOptionIds!.length).toBeGreaterThanOrEqual(1);

      const optionIds = new Set(q.options!.map((o) => o.id));
      q.correctOptionIds!.forEach((cId) => {
        expect(optionIds.has(cId)).toBe(true);
      });

      expect(q.interviewTip).toBeTruthy();
      expect(q.commonMistake).toBeTruthy();
    });
  });

  it("should validate system design questions have architectural details and rubrics", () => {
    const scenarios = INTERVIEW_QUESTIONS.filter((q) => q.type === "system_design");
    expect(scenarios.length).toBeGreaterThanOrEqual(3);

    scenarios.forEach((q) => {
      expect(q.systemDesign).toBeDefined();
      expect(q.systemDesign!.recommendedArchitecture.length).toBeGreaterThanOrEqual(3);
      expect(q.systemDesign!.keyTradeoffs.length).toBeGreaterThanOrEqual(2);
      expect(q.systemDesign!.whatInterviewersLookFor).toBeTruthy();
      expect(q.systemDesign!.redFlagsToAvoid).toBeTruthy();
    });
  });
});
