import React from "react";
import { Link } from "@/i18n/navigation";
import { KnowledgeTopic } from "@/types/knowledge";
import { CERTIFICATIONS } from "@/content/certifications";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronLeft, Clock, BookOpen, CheckCircle, Award, ArrowRight } from "lucide-react";

interface TopicDetailsProps {
  topic: KnowledgeTopic;
}

export function TopicDetails({ topic }: TopicDetailsProps) {
  const relatedCerts = CERTIFICATIONS.filter((c) =>
    topic.relatedCertifications.includes(c.slug)
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Back link */}
      <div>
        <Link
          href="/knowledge"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Knowledge Library
        </Link>
      </div>

      {/* Header */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs uppercase font-semibold">
              {topic.category}
            </Badge>
            {topic.providerNeutral && (
              <Badge variant="outline" className="text-xs">
                Shared AI Concept
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{topic.estimatedMinutes} minutes study time</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          {topic.title}
        </h1>

        <p className="text-base text-muted-foreground leading-relaxed">
          {topic.summary}
        </p>

        <div className="pt-4 border-t border-border">
          <p className="text-sm text-foreground/90 leading-relaxed font-normal">
            {topic.overview}
          </p>
        </div>
      </div>

      {/* Core Concepts Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span>Key Architectural Concepts</span>
          </CardTitle>
          <CardDescription>
            Fundamental principles tested across vendor certification exams.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {topic.keyConcepts.map((concept, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-border/70 bg-muted/30 space-y-1.5">
              <h4 className="text-sm font-bold text-foreground">{concept.term}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{concept.definition}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <span>Implementation Best Practices</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {topic.bestPractices.map((practice, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/90">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span className="leading-relaxed">{practice}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Relevant Certifications for this topic */}
      {relatedCerts.length > 0 && (
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <span>Tested in These Certifications</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedCerts.map((cert) => (
              <Link
                key={cert.id}
                href={`/certifications/${cert.slug}`}
                className="p-4 rounded-xl border border-border hover:border-primary/50 bg-card hover:shadow-xs transition-all flex items-center justify-between group"
              >
                <div>
                  <Badge variant="outline" className="text-[10px] uppercase mb-1">
                    {cert.providerName}
                  </Badge>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {cert.name}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
