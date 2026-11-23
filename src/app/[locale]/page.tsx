import React, { Suspense } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  Clock,
  Compass
} from "lucide-react";

export const instant = false;

async function HomeInner({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeContent />;
}

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <HomeInner params={params} />
    </Suspense>
  );
}

function HomeContent() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28 lg:py-32 bg-radial from-primary/5 via-background to-background border-b border-border/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{tCommon("tagline")}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-tight">
            {t("heroTitle")}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("heroSubtitle")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/certifications">
              <Button size="lg" className="gap-2 font-semibold px-6 shadow-sm">
                <Compass className="h-4 w-4" />
                {t("browseCatalog")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/practice">
              <Button size="lg" variant="outline" className="gap-2 font-semibold px-6">
                <Clock className="h-4 w-4" />
                {t("trySimulator")}
              </Button>
            </Link>
          </div>

          {/* Quick stats/badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-xs">
              <div className="text-2xl font-black text-foreground">7+</div>
              <div className="text-xs text-muted-foreground font-medium mt-1">Providers (Anthropic, AWS, Azure, Google...)</div>
            </div>
            <div className="p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-xs">
              <div className="text-2xl font-black text-foreground">4</div>
              <div className="text-xs text-muted-foreground font-medium mt-1">Claude Official Partner Tracks</div>
            </div>
            <div className="p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-xs">
              <div className="text-2xl font-black text-foreground">100%</div>
              <div className="text-xs text-muted-foreground font-medium mt-1">Independent & Source-Grounded</div>
            </div>
            <div className="p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-xs">
              <div className="text-2xl font-black text-foreground">EN / VI</div>
              <div className="text-xs text-muted-foreground font-medium mt-1">Full Bilingual Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              {t("featuresTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl border border-border bg-card shadow-xs flex flex-col">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-2">
                {t("features.verified.title")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("features.verified.desc")}
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card shadow-xs flex flex-col">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-2">
                {t("features.reusable.title")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("features.reusable.desc")}
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card shadow-xs flex flex-col">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-2">
                {t("features.simulator.title")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("features.simulator.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
