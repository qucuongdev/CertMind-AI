import React from "react";
import { Link } from "@/i18n/navigation";
import { Certification } from "@/types/certification";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, HelpCircle, Award, CheckCircle2, ArrowRight } from "lucide-react";

interface CertCardProps {
  cert: Certification;
}

export function CertCard({ cert }: CertCardProps) {
  const getLevelVariant = (level: string) => {
    switch (level) {
      case "foundational":
        return "secondary";
      case "associate":
        return "default";
      case "professional":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card className="flex flex-col h-full border-border/60 hover:border-primary/40 hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant="outline" className="text-xs uppercase font-semibold tracking-wider">
            {cert.providerName}
          </Badge>
          <div className="flex items-center gap-1.5">
            {cert.isPracticeReady && (
              <Badge variant="secondary" className="text-[11px] gap-1 bg-primary/10 text-primary border-primary/20">
                <CheckCircle2 className="h-3 w-3" />
                Practice Ready
              </Badge>
            )}
            <Badge variant={getLevelVariant(cert.level)} className="text-xs capitalize">
              {cert.level}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-lg font-bold leading-snug line-clamp-2">
          {cert.name}
        </CardTitle>
        {cert.examCode && (
          <p className="text-xs font-mono text-muted-foreground mt-0.5">
            Code: {cert.examCode}
          </p>
        )}
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
          {cert.shortDescription || cert.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border/50">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{cert.durationMinutes} mins</span>
          </div>
          <div className="flex items-center gap-1.5">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>{cert.questionCount} questions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5" />
            <span>Pass: {cert.passingScorePercent}%</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex items-center justify-between gap-2 border-t border-border/30 pt-3">
        <Link href={`/certifications/${cert.slug}`} className="w-full">
          <Button variant="outline" size="sm" className="w-full justify-between font-semibold">
            <span>View Details</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
