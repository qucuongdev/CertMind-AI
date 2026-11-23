"use client";

import React, { useState, useMemo } from "react";
import { Certification } from "@/types/certification";
import { CertCard } from "./cert-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal } from "lucide-react";

interface CertCatalogProps {
  initialCertifications: Certification[];
}

export function CertCatalog({ initialCertifications }: CertCatalogProps) {
  const [selectedProvider, setSelectedProvider] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const providers = [
    { id: "all", label: "All Providers" },
    { id: "anthropic", label: "Anthropic" },
    { id: "aws", label: "AWS" },
    { id: "microsoft", label: "Microsoft" },
    { id: "google-cloud", label: "Google Cloud" },
    { id: "nvidia", label: "NVIDIA" },
    { id: "databricks", label: "Databricks" },
  ];

  const levels = [
    { id: "all", label: "All Levels" },
    { id: "foundational", label: "Foundational" },
    { id: "associate", label: "Associate" },
    { id: "professional", label: "Professional" },
  ];

  const filteredCerts = useMemo(() => {
    return initialCertifications.filter((cert) => {
      // Provider filter
      if (selectedProvider !== "all" && cert.provider !== selectedProvider) {
        return false;
      }
      // Level filter
      if (selectedLevel !== "all" && cert.level !== selectedLevel) {
        return false;
      }
      // Search filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchName = cert.name.toLowerCase().includes(query);
        const matchCode = cert.examCode?.toLowerCase().includes(query);
        const matchDesc = cert.description.toLowerCase().includes(query);
        const matchProvider = cert.providerName.toLowerCase().includes(query);
        return matchName || matchCode || matchDesc || matchProvider;
      }
      return true;
    });
  }, [initialCertifications, selectedProvider, selectedLevel, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border shadow-2xs">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search certifications or exam codes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>

        {/* Level Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <span className="text-xs text-muted-foreground mr-1 hidden sm:inline-flex items-center gap-1">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Level:
          </span>
          {levels.map((lvl) => (
            <Button
              key={lvl.id}
              variant={selectedLevel === lvl.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLevel(lvl.id)}
              className="text-xs h-8"
            >
              {lvl.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Provider Pill Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {providers.map((p) => (
          <Button
            key={p.id}
            variant={selectedProvider === p.id ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setSelectedProvider(p.id)}
            className={`text-xs whitespace-nowrap h-8 px-3 rounded-full font-medium ${
              selectedProvider === p.id
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {p.label}
            {p.id === "anthropic" && (
              <Badge variant="outline" className="ml-1.5 py-0 px-1 text-[10px] border-primary-foreground/30 bg-primary-foreground/10">
                4 tracks
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Grid of Certifications */}
      {filteredCerts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 border border-dashed border-border rounded-2xl bg-muted/10">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4 text-muted-foreground">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-foreground">No certifications found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
            Try adjusting your search query, provider filter, or level criteria.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedProvider("all");
              setSelectedLevel("all");
              setSearchQuery("");
            }}
            className="mt-4"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
