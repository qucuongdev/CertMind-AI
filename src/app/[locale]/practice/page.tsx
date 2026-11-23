import React, { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CERTIFICATIONS } from "@/content/certifications";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, HelpCircle, Award } from "lucide-react";

export const instant = false;

export const metadata = {
  title: "Practice Engine — CertMind AI",
  description: "Select an AI certification to start practicing with verified questions, instant feedback, and detailed explanations.",
};

async function PracticeSelectionContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const practiceReadyCerts = CERTIFICATIONS.filter((c) => c.isPracticeReady);

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Practice Engine
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Choose a certification below to start practicing. Practice mode gives you instant explanations, distractor breakdowns, and question flagging.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {practiceReadyCerts.map((cert) => (
          <Card key={cert.id} className="border-border/60 hover:border-primary/40 flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge variant="outline" className="text-xs uppercase font-semibold">
                  {cert.providerName}
                </Badge>
                <Badge variant="secondary" className="text-xs capitalize">
                  {cert.level}
                </Badge>
              </div>
              <CardTitle className="text-lg font-bold line-clamp-2">
                {cert.name}
              </CardTitle>
              {cert.examCode && (
                <p className="text-xs font-mono text-muted-foreground mt-0.5">
                  Exam: {cert.examCode}
                </p>
              )}
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {cert.shortDescription}
              </p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border/50">
                <span className="flex items-center gap-1">
                  <HelpCircle className="h-3.5 w-3.5" />
                  {cert.questionCount} Questions in Bank
                </span>
                <span className="flex items-center gap-1">
                  <Award className="h-3.5 w-3.5" />
                  Pass: {cert.passingScorePercent}%
                </span>
              </div>

              <Link href={`/practice/${cert.slug}`} className="block w-full pt-2">
                <Button className="w-full gap-2 font-semibold shadow-xs">
                  <Sparkles className="h-4 w-4" />
                  Start Practice Session
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function PracticeSelectionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <Suspense fallback={<div className="container mx-auto max-w-7xl px-4 py-10 animate-pulse h-96 bg-muted/20 rounded-2xl" />}>
      <PracticeSelectionContent params={params} />
    </Suspense>
  );
}
