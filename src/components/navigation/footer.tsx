import React from "react";
import { Link } from "@/i18n/navigation";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30 py-8 text-sm text-muted-foreground">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="font-semibold text-foreground">CertMind AI</p>
          <p className="text-xs">
            Independent AI certification preparation platform. Not affiliated with or endorsed by Anthropic, AWS, Microsoft, Google, or NVIDIA.
          </p>
        </div>
        <div className="flex items-center gap-6 text-xs">
          <Link href="/certifications" className="hover:text-foreground transition-colors">
            Certifications
          </Link>
          <Link href="/knowledge" className="hover:text-foreground transition-colors">
            Knowledge Topics
          </Link>
          <Link href="/practice" className="hover:text-foreground transition-colors">
            Practice Engine
          </Link>
        </div>
      </div>
    </footer>
  );
}
