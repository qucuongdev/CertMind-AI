import { describe, it, expect } from "vitest";
import { CERTIFICATIONS, getCertificationBySlug } from "@/content/certifications";
import { QUESTIONS } from "@/content/questions";
import { KNOWLEDGE_TOPICS } from "@/content/topics";

describe("Content Integrity & Registry Verification", () => {
  it("should have all 4 Claude certifications present in the registry", () => {
    const claudeCerts = CERTIFICATIONS.filter((c) => c.provider === "anthropic");
    expect(claudeCerts.length).toBe(4);

    const slugs = claudeCerts.map((c) => c.slug);
    expect(slugs).toContain("claude-certified-associate-foundations");
    expect(slugs).toContain("claude-certified-developer-foundations");
    expect(slugs).toContain("claude-certified-architect-foundations");
    expect(slugs).toContain("claude-certified-architect-professional");
  });

  it("should have valid domain weight configurations for every certification", () => {
    CERTIFICATIONS.forEach((cert) => {
      expect(cert.domains.length).toBeGreaterThanOrEqual(1);
      const totalWeight = cert.domains.reduce((sum, d) => sum + d.weightPercent, 0);
      expect(totalWeight).toBe(100);
    });
  });

  it("should have question banks matching existing certifications", () => {
    QUESTIONS.forEach((q) => {
      const cert = getCertificationBySlug(q.certSlug);
      expect(cert).toBeDefined();

      const domainExists = cert?.domains.some((d) => d.id === q.domainId);
      expect(domainExists).toBe(true);

      expect(q.options.length).toBeGreaterThanOrEqual(2);
      expect(q.correctOptionIds.length).toBeGreaterThanOrEqual(1);
      q.correctOptionIds.forEach((cId) => {
        expect(q.options.some((opt) => opt.id === cId)).toBe(true);
      });
    });
  });

  it("should have knowledge topics with valid concepts", () => {
    expect(KNOWLEDGE_TOPICS.length).toBeGreaterThanOrEqual(4);
    KNOWLEDGE_TOPICS.forEach((topic) => {
      expect(topic.title).toBeTruthy();
      expect(topic.keyConcepts.length).toBeGreaterThanOrEqual(2);
      expect(topic.bestPractices.length).toBeGreaterThanOrEqual(1);
    });
  });
});
