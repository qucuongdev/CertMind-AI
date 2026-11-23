import { PracticeSessionState, SessionResult } from "@/types/practice";

const SESSIONS_KEY = "certmind_practice_sessions_v1";
const COMPLETED_KEY = "certmind_completed_exams_v1";

export interface StoredExamRecord {
  id: string;
  certSlug: string;
  certName: string;
  date: string;
  mode: "practice" | "exam";
  result: SessionResult;
}

export function saveActiveSession(session: PracticeSessionState): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    const sessions: Record<string, PracticeSessionState> = raw ? JSON.parse(raw) : {};
    sessions[session.certSlug] = session;
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  } catch (e) {
    console.error("Failed to save session to localStorage", e);
  }
}

export function getActiveSession(certSlug: string): PracticeSessionState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    if (!raw) return null;
    const sessions: Record<string, PracticeSessionState> = JSON.parse(raw);
    return sessions[certSlug] || null;
  } catch (e) {
    console.error("Failed to read session from localStorage", e);
    return null;
  }
}

export function clearActiveSession(certSlug: string): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    if (!raw) return;
    const sessions: Record<string, PracticeSessionState> = JSON.parse(raw);
    delete sessions[certSlug];
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  } catch (e) {
    console.error("Failed to clear session", e);
  }
}

export function saveCompletedRecord(record: StoredExamRecord): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(COMPLETED_KEY);
    const records: StoredExamRecord[] = raw ? JSON.parse(raw) : [];
    records.unshift(record);
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(records.slice(0, 50)));
  } catch (e) {
    console.error("Failed to save completed record", e);
  }
}

export function getCompletedRecords(): StoredExamRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(COMPLETED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to read completed records", e);
    return [];
  }
}
