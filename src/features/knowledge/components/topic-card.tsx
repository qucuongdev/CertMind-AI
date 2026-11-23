import React from "react";
import { Link } from "@/i18n/navigation";
import { KnowledgeTopic } from "@/types/knowledge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, ArrowRight } from "lucide-react";

interface TopicCardProps {
  topic: KnowledgeTopic;
}

export function TopicCard({ topic }: TopicCardProps) {
  return (
    <Card className="flex flex-col h-full border-border/60 hover:border-primary/40 hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant="secondary" className="text-xs uppercase font-semibold">
            {topic.category}
          </Badge>
          {topic.providerNeutral && (
            <Badge variant="outline" className="text-[10px] text-muted-foreground">
              Cross-Vendor Standard
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg font-bold leading-snug line-clamp-2">
          {topic.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {topic.summary}
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 mt-4 border-t border-border/50">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{topic.estimatedMinutes} mins read</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{topic.keyConcepts.length} Core Concepts</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 border-t border-border/30 pt-3">
        <Link href={`/knowledge/${topic.slug}`} className="w-full">
          <Button variant="outline" size="sm" className="w-full justify-between font-semibold">
            <span>Read Topic</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
