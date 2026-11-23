export type ProviderId =
  | "anthropic"
  | "aws"
  | "microsoft"
  | "google-cloud"
  | "nvidia"
  | "databricks"
  | "ibm";

export type CertLevel = "foundational" | "associate" | "professional" | "specialty";

export type CertStatus = "active" | "beta" | "draft" | "retiring" | "retired" | "unknown";

export interface DomainWeight {
  id: string;
  name: string;
  weightPercent: number;
  description?: string;
}

export interface Certification {
  id: string;
  slug: string;
  name: string;
  provider: ProviderId;
  providerName: string;
  level: CertLevel;
  status: CertStatus;
  examCode?: string;
  version: string;
  durationMinutes: number;
  questionCount: number;
  passingScorePercent: number;
  officialUrl: string;
  eligibility: string;
  description: string;
  shortDescription: string;
  lastVerifiedDate: string;
  domains: DomainWeight[];
  isPracticeReady: boolean;
}
