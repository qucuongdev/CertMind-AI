import { describe, it, expect } from "vitest";
import { routing } from "@/i18n/routing";
import enMessages from "../../messages/en.json";
import viMessages from "../../messages/vi.json";

describe("i18n Configuration", () => {
  it("should support both English and Vietnamese", () => {
    expect(routing.locales).toContain("en");
    expect(routing.locales).toContain("vi");
    expect(["vi", "en"]).toContain(routing.defaultLocale);
  });

  it("should have matching key structure in en and vi messages", () => {
    expect(enMessages.common.appName).toBe("CertMind AI");
    expect(viMessages.common.appName).toBe("CertMind AI");

    expect(enMessages.nav.certifications).toBeDefined();
    expect(viMessages.nav.certifications).toBeDefined();

    expect(enMessages.home.heroTitle).toBeDefined();
    expect(viMessages.home.heroTitle).toBeDefined();
  });
});
