"use client";

import React, { useState, useMemo, useCallback, useSyncExternalStore } from "react";
import { InterviewQuestion, InterviewCategory, InterviewDifficulty } from "@/types/interview";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Briefcase,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sliders,
  Check,
  Award,
  Layers,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  AlertTriangle,
  Server,
  ShieldAlert,
  Cpu,
  BrainCircuit,
  Binary,
  Compass,
  GraduationCap,
  Zap,
  Crown,
  Trash2,
  CheckCheck
} from "lucide-react";

interface InterviewPrepViewProps {
  questions: InterviewQuestion[];
}

const CATEGORIES: { id: InterviewCategory | "all"; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "all", label: "Tất cả chủ đề", icon: Compass },
  { id: "rag", label: "RAG & Vector Search", icon: Layers },
  { id: "agents", label: "Agents & MCP", icon: BrainCircuit },
  { id: "eval", label: "Evaluation & Benchmarks", icon: Award },
  { id: "serving", label: "Serving & Quantization", icon: Cpu },
  { id: "finetuning", label: "Fine-Tuning vs RAG", icon: Binary },
  { id: "security", label: "Security & Guardrails", icon: ShieldAlert },
];

export type DisplayLevel = "all" | "junior" | "mid" | "senior";

const DIFFICULTY_LEVELS: {
  id: DisplayLevel;
  label: string;
  badgeLabel: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
  badgeClass: string;
}[] = [
  {
    id: "all",
    label: "Tất cả cấp độ",
    badgeLabel: "Mọi cấp bậc",
    description: "Bộ câu hỏi đa dạng từ nền tảng đến kiến trúc sư phân tán.",
    icon: Compass,
    colorClass: "border-primary/40 hover:border-primary text-primary",
    badgeClass: "bg-primary/10 text-primary border-primary/30",
  },
  {
    id: "junior",
    label: "Level 1: Junior AI Engineer",
    badgeLabel: "Fresher / Junior",
    description: "Cơ bản: Prompting, BPE Tokenization, Cosine vs Dot product, Sampling, SSE streaming.",
    icon: GraduationCap,
    colorClass: "border-sky-500/40 hover:border-sky-500 text-sky-600 dark:text-sky-400",
    badgeClass: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30",
  },
  {
    id: "mid",
    label: "Level 2: Mid-Level AI Engineer",
    badgeLabel: "Kỹ sư Thực chiến",
    description: "Thực chiến: Hybrid Search, Cross-encoder re-ranking, Semantic Caching, Tool Calling, Rate limits.",
    icon: Zap,
    colorClass: "border-indigo-500/40 hover:border-indigo-500 text-indigo-600 dark:text-indigo-400",
    badgeClass: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30",
  },
  {
    id: "senior",
    label: "Level 3: Senior & Staff Architect",
    badgeLabel: "Senior & Lead",
    description: "Chuyên sâu: vLLM PagedAttention, LoRA/DPO, FlashAttention-3, Multi-agent swarms, System Design.",
    icon: Crown,
    colorClass: "border-purple-500/40 hover:border-purple-500 text-purple-600 dark:text-purple-400",
    badgeClass: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30",
  },
];

const PRESET_COUNTS = [5, 10, 15, 20, 25, 30];

// ==========================================
// NEVER-REPEAT QUESTION STORE (REACT 19 SAFE)
// ==========================================
const SEEN_STORAGE_KEY = "certmind_seen_interview_q_ids";

let seenListeners: (() => void)[] = [];
function emitSeenChange() {
  for (const listener of seenListeners) {
    listener();
  }
}

function subscribeSeen(callback: () => void) {
  seenListeners.push(callback);
  const handleStorage = (e: StorageEvent) => {
    if (e.key === SEEN_STORAGE_KEY) {
      callback();
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
  }
  return () => {
    seenListeners = seenListeners.filter((l) => l !== callback);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

function getRawSeenSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  try {
    return localStorage.getItem(SEEN_STORAGE_KEY) || "[]";
  } catch {
    return "[]";
  }
}

const SERVER_SNAPSHOT = "[]";
function getServerSeenSnapshot(): string {
  return SERVER_SNAPSHOT;
}

function markSeenIds(ids: string[]) {
  if (typeof window === "undefined" || ids.length === 0) return;
  try {
    const raw = localStorage.getItem(SEEN_STORAGE_KEY) || "[]";
    const current = new Set<string>(JSON.parse(raw));
    let changed = false;
    for (const id of ids) {
      if (!current.has(id)) {
        current.add(id);
        changed = true;
      }
    }
    if (changed) {
      localStorage.setItem(SEEN_STORAGE_KEY, JSON.stringify(Array.from(current)));
      emitSeenChange();
    }
  } catch {
    // ignore
  }
}

function clearSeenIds() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(SEEN_STORAGE_KEY);
    emitSeenChange();
  } catch {
    // ignore
  }
}

export function InterviewPrepView({ questions }: InterviewPrepViewProps) {
  // Main view mode: "screening" | "scenarios"
  const [activeTab, setActiveTab] = useState<"screening" | "scenarios">("screening");

  // Filters: Level and Category
  const [selectedLevel, setSelectedLevel] = useState<DisplayLevel>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Track seen questions from localStorage safely with primitive snapshot
  const rawSeen = useSyncExternalStore(
    subscribeSeen,
    getRawSeenSnapshot,
    getServerSeenSnapshot
  );

  const seenSet = useMemo(() => {
    try {
      const parsed = JSON.parse(rawSeen);
      return new Set<string>(Array.isArray(parsed) ? parsed : []);
    } catch {
      return new Set<string>();
    }
  }, [rawSeen]);

  // Never-repeat setting
  const [prioritizeUnseen, setPrioritizeUnseen] = useState<boolean>(true);

  // ==========================================
  // SCREENING QUIZ STATE
  // ==========================================
  const [quizState, setQuizState] = useState<"config" | "active" | "summary">("config");
  const [selectedCount, setSelectedCount] = useState<number>(5);
  const [customInputCount, setCustomInputCount] = useState<string>("5");
  const [isCustomCount, setIsCustomCount] = useState<boolean>(false);
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(true);

  // Active quiz session
  const [activeQuestions, setActiveQuestions] = useState<InterviewQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string[]>>({});
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [quizStartTime, setQuizStartTime] = useState<number>(0);

  // Filter helper matching difficulty level
  const matchesLevel = useCallback((qDifficulty: InterviewDifficulty, level: DisplayLevel): boolean => {
    if (level === "all") return true;
    if (level === "junior") return qDifficulty === "junior";
    if (level === "mid") return qDifficulty === "mid";
    if (level === "senior") return qDifficulty === "senior" || qDifficulty === "lead";
    return true;
  }, []);

  // Filtered pool for screening
  const availableScreeningQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (q.type !== "screening") return false;
      if (!matchesLevel(q.difficulty, selectedLevel)) return false;
      if (selectedCategory !== "all" && q.category !== selectedCategory) return false;
      return true;
    });
  }, [questions, selectedLevel, selectedCategory, matchesLevel]);

  // Scenarios pool
  const scenarioQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (q.type !== "system_design") return false;
      if (!matchesLevel(q.difficulty, selectedLevel)) return false;
      if (selectedCategory !== "all" && q.category !== selectedCategory) return false;
      return true;
    });
  }, [questions, selectedLevel, selectedCategory, matchesLevel]);

  const maxScreening = availableScreeningQuestions.length;

  // Unseen vs Seen counts for the active screening pool
  const { unseenCount, seenCount } = useMemo(() => {
    let unseen = 0;
    let seen = 0;
    for (const q of availableScreeningQuestions) {
      if (seenSet.has(q.id)) {
        seen++;
      } else {
        unseen++;
      }
    }
    return { unseenCount: unseen, seenCount: seen };
  }, [availableScreeningQuestions, seenSet]);

  // Handle count selection
  const handleSelectPreset = (count: number) => {
    setIsCustomCount(false);
    const valid = Math.min(count, Math.max(1, maxScreening));
    setSelectedCount(valid);
    setCustomInputCount(valid.toString());
  };

  const handleCustomCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCustomCount(true);
    const val = e.target.value;
    setCustomInputCount(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setSelectedCount(Math.min(parsed, maxScreening));
    }
  };

  // Start screening drill with Never-Repeat prioritisation
  const handleStartQuiz = useCallback(() => {
    if (availableScreeningQuestions.length === 0) return;

    const countToTake = Math.max(1, Math.min(selectedCount, availableScreeningQuestions.length));
    let chosen: InterviewQuestion[] = [];

    if (prioritizeUnseen) {
      // Divide pool into unseen and seen
      const unseenPool = availableScreeningQuestions.filter((q) => !seenSet.has(q.id));
      const seenPool = availableScreeningQuestions.filter((q) => seenSet.has(q.id));

      if (shuffleQuestions) {
        unseenPool.sort(() => Math.random() - 0.5);
        seenPool.sort(() => Math.random() - 0.5);
      }

      if (unseenPool.length >= countToTake) {
        chosen = unseenPool.slice(0, countToTake);
      } else {
        const remainingNeeded = countToTake - unseenPool.length;
        chosen = [...unseenPool, ...seenPool.slice(0, remainingNeeded)];
      }
    } else {
      const pool = [...availableScreeningQuestions];
      if (shuffleQuestions) {
        pool.sort(() => Math.random() - 0.5);
      }
      chosen = pool.slice(0, countToTake);
    }

    setActiveQuestions(chosen);
    setCurrentIndex(0);
    setUserAnswers({});
    setQuizStartTime(Date.now());
    setElapsedSeconds(0);
    setQuizState("active");
  }, [availableScreeningQuestions, prioritizeUnseen, seenSet, shuffleQuestions, selectedCount]);

  const currentQ = activeQuestions[currentIndex];
  const currentAnswer = currentQ ? userAnswers[currentQ.id] || [] : [];
  const hasAnsweredCurrent = currentAnswer.length > 0;

  const handleSelectOption = (optId: string) => {
    if (!currentQ || hasAnsweredCurrent) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: [optId],
    }));

    // Record question as answered (never-repeat memory)
    markSeenIds([currentQ.id]);
  };

  const liveStats = useMemo(() => {
    let correct = 0;
    let incorrect = 0;

    activeQuestions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans && ans.length > 0) {
        const isRight =
          q.correctOptionIds &&
          ans.length === q.correctOptionIds.length &&
          ans.every((id) => q.correctOptionIds?.includes(id));
        if (isRight) correct++;
        else incorrect++;
      }
    });

    const total = correct + incorrect;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { correct, incorrect, total, accuracy };
  }, [activeQuestions, userAnswers]);

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      const elapsed = Math.round((Date.now() - quizStartTime) / 1000);
      setElapsedSeconds(elapsed);
      setQuizState("summary");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleResetHistory = () => {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử câu hỏi đã luyện để bắt đầu lại từ đầu không?")) {
      clearSeenIds();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider">
          <Briefcase className="h-3.5 w-3.5" />
          <span>AI Engineer Career & Interview Mastery</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Luyện phỏng vấn Kỹ sư AI (AI Engineer Interview Prep)
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Nắm vững các câu hỏi thực chiến theo 3 cấp độ (Junior, Mid-level, Senior/Lead) với hơn 50+ câu hỏi chuyên sâu về RAG, AI Agents, LLM Serving, Quantization và System Design. Trang bị tính năng <strong>luyện không trùng lặp</strong> giúp bạn làm đi làm lại nhiều lần mà luôn được gặp câu hỏi mới.
        </p>
      </div>

      {/* 3 Difficulty Level Selector Cards */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Sliders className="h-3.5 w-3.5 text-primary" />
            Chọn cấp độ phỏng vấn mục tiêu (3 Cấp bậc):
          </span>
          {seenCount > 0 && (
            <button
              type="button"
              onClick={handleResetHistory}
              className="text-xs text-muted-foreground hover:text-rose-600 flex items-center gap-1 cursor-pointer transition-colors"
              title="Xóa danh sách câu đã làm để luyện lại từ đầu"
            >
              <Trash2 className="h-3 w-3" />
              <span>Xóa lịch sử đã làm ({seenSet.size} câu)</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {DIFFICULTY_LEVELS.map((lvl) => {
            const Icon = lvl.icon;
            const isSelected = selectedLevel === lvl.id;
            const levelQuestionCount = questions.filter((q) => matchesLevel(q.difficulty, lvl.id)).length;

            return (
              <button
                key={lvl.id}
                type="button"
                onClick={() => {
                  setSelectedLevel(lvl.id);
                  if (quizState === "active") {
                    setQuizState("config");
                  }
                }}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? "border-primary bg-primary/5 ring-2 ring-primary/40 shadow-sm"
                    : "border-border/70 hover:border-border bg-card/60 hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className={`p-2 rounded-xl ${lvl.badgeClass}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <Badge variant="outline" className={`text-[11px] font-bold ${lvl.badgeClass}`}>
                    {lvl.badgeLabel}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    {lvl.label}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                    {lvl.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground font-medium">
                    Ngân hàng: <strong className="text-foreground">{levelQuestionCount} câu</strong>
                  </span>
                  {isSelected && (
                    <span className="text-primary font-bold flex items-center gap-0.5">
                      <Check className="h-3 w-3" /> Đang chọn
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
        <button
          type="button"
          onClick={() => {
            setActiveTab("screening");
            setQuizState("config");
          }}
          className={`flex items-center gap-2 py-2 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeTab === "screening"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "bg-muted/50 hover:bg-muted text-muted-foreground"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          Trắc nghiệm kỹ thuật sàng lọc ({availableScreeningQuestions.length} câu)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("scenarios")}
          className={`flex items-center gap-2 py-2 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeTab === "scenarios"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "bg-muted/50 hover:bg-muted text-muted-foreground"
          }`}
        >
          <Server className="h-4 w-4" />
          Tình huống Thiết kế Hệ thống ({scenarioQuestions.length} kịch bản)
        </button>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold whitespace-nowrap border transition-all cursor-pointer ${
                isSelected
                  ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                  : "border-border/60 hover:bg-muted text-muted-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================== */}
      {/* TAB 1: TECHNICAL SCREENING QUIZ */}
      {/* ========================================== */}
      {activeTab === "screening" && (
        <div>
          {/* CONFIG VIEW */}
          {quizState === "config" && (
            <Card className="border-border/70 shadow-sm">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sliders className="h-5 w-5 text-primary" />
                    Cấu hình bộ câu hỏi phỏng vấn trắc nghiệm
                  </CardTitle>

                  {/* Level indicator pill */}
                  <Badge variant="outline" className="px-2.5 py-1 text-xs font-bold border-primary/40 bg-primary/5 text-primary">
                    Đang chọn: {DIFFICULTY_LEVELS.find((l) => l.id === selectedLevel)?.label}
                  </Badge>
                </div>
                <CardDescription>
                  Luyện tập các câu hỏi kiểm tra độ sâu kiến thức (Technical Screening). Mỗi câu hỏi đi kèm giải thích kỹ thuật chuyên sâu, mẹo phỏng vấn (Pro Interview Tip) và cảnh báo lỗi sai ứng viên hay mắc (Candidate Red Flags).
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Never-Repeat & Seen Progress Status */}
                <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm font-bold text-foreground">
                        Tiến độ luyện tập theo bộ lọc:
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Bạn đã luyện <strong className="text-foreground">{seenCount}</strong> / {maxScreening} câu trong bộ lọc này ({maxScreening > 0 ? Math.round((seenCount / maxScreening) * 100) : 0}%). Còn <strong className="text-emerald-600 dark:text-emerald-400">{unseenCount} câu chưa làm</strong>.
                    </div>
                  </div>

                  <label htmlFor="never-repeat-check" className="flex items-center gap-2.5 text-xs font-bold text-foreground cursor-pointer bg-background/80 px-3 py-2 rounded-lg border border-border/60 hover:bg-background">
                    <input
                      id="never-repeat-check"
                      type="checkbox"
                      checked={prioritizeUnseen}
                      onChange={(e) => setPrioritizeUnseen(e.target.checked)}
                      className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                    />
                    <span>Ưu tiên câu chưa làm (Luyện không trùng)</span>
                  </label>
                </div>

                {/* Count selector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-primary" />
                      Chọn số lượng câu hỏi luyện tập:
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Có sẵn: <strong className="text-foreground">{maxScreening} câu</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                    {PRESET_COUNTS.map((count) => {
                      const isSelected = !isCustomCount && selectedCount === count;
                      const isAvailable = count <= maxScreening;

                      return (
                        <button
                          key={count}
                          type="button"
                          disabled={!isAvailable && count > maxScreening + 5}
                          onClick={() => handleSelectPreset(count)}
                          className={`py-2.5 px-3 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground shadow-xs"
                              : "border-border/60 hover:bg-muted text-foreground"
                          }`}
                        >
                          {count} câu
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => handleSelectPreset(maxScreening)}
                      className={`py-2.5 px-3 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                        !isCustomCount && selectedCount === maxScreening
                          ? "border-primary bg-primary text-primary-foreground shadow-xs"
                          : "border-border/60 hover:bg-muted text-foreground"
                      }`}
                    >
                      Tất cả ({maxScreening})
                    </button>
                  </div>

                  {/* Custom Input */}
                  <div className="pt-2 flex items-center gap-3">
                    <label htmlFor="custom-count-input" className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                      Hoặc nhập số lượng tùy ý:
                    </label>
                    <Input
                      id="custom-count-input"
                      type="number"
                      min="1"
                      max={maxScreening}
                      value={customInputCount}
                      onChange={handleCustomCountChange}
                      className={`w-28 text-center font-bold ${
                        isCustomCount ? "ring-2 ring-primary border-primary" : ""
                      }`}
                    />
                    <span className="text-xs text-muted-foreground">câu</span>
                  </div>
                </div>

                {/* Shuffle Option */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-border/50">
                  <label htmlFor="shuffle-interview-check" className="text-xs font-medium text-muted-foreground cursor-pointer flex items-center gap-2">
                    <input
                      id="shuffle-interview-check"
                      type="checkbox"
                      checked={shuffleQuestions}
                      onChange={(e) => setShuffleQuestions(e.target.checked)}
                      className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                    />
                    Xáo trộn ngẫu nhiên thứ tự câu hỏi
                  </label>

                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Check className="h-3.5 w-3.5" />
                    Sẽ làm {Math.min(selectedCount, maxScreening)} câu {prioritizeUnseen && unseenCount > 0 ? `(ưu tiên ${Math.min(unseenCount, selectedCount)} câu mới)` : ""}
                  </span>
                </div>

                <Button
                  size="lg"
                  disabled={maxScreening === 0}
                  onClick={handleStartQuiz}
                  className="w-full gap-2 font-bold text-base h-12 shadow-sm"
                >
                  <Sparkles className="h-5 w-5" />
                  Bắt đầu phỏng vấn thử ngay ({Math.min(selectedCount, maxScreening)} câu)
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* ACTIVE QUIZ SESSION */}
          {quizState === "active" && currentQ && (
            <div className="space-y-6">
              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border border-border bg-card/70 backdrop-blur-xs">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuizState("config")}
                    className="gap-1 text-xs text-muted-foreground"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Đổi thiết lập
                  </Button>
                  <div className="h-4 w-px bg-border" />
                  <span className="text-sm font-bold text-foreground">
                    Câu {currentIndex + 1} / {activeQuestions.length}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs font-semibold">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Đúng: {liveStats.correct}
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                    <XCircle className="h-3.5 w-3.5" />
                    Sai: {liveStats.incorrect}
                  </div>
                </div>
              </div>

              {/* Question Card */}
              <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card space-y-6 shadow-sm">
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs font-medium">
                      {currentQ.categoryName}
                    </Badge>
                    <Badge variant="secondary" className="text-xs uppercase font-bold">
                      {currentQ.difficulty === "junior" ? "Level 1: Junior" : currentQ.difficulty === "mid" ? "Level 2: Mid-Level" : "Level 3: Senior"}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    ID: {currentQ.id}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-primary/90">
                  {currentQ.title}
                </h3>

                <div className="text-lg sm:text-xl font-bold text-foreground leading-relaxed">
                  {currentQ.prompt}
                </div>

                {/* Options List */}
                <div className="space-y-3 pt-2">
                  {currentQ.options?.map((opt) => {
                    const isSelected = currentAnswer.includes(opt.id);
                    const isCorrect = currentQ.correctOptionIds?.includes(opt.id);

                    let optionStyle = "border-border hover:border-primary/50 bg-card hover:bg-muted/40";
                    let badgeStyle = "bg-muted text-muted-foreground border-border";

                    if (hasAnsweredCurrent) {
                      if (isCorrect) {
                        optionStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/30 font-medium";
                        badgeStyle = "bg-emerald-600 text-white border-emerald-600";
                      } else if (isSelected && !isCorrect) {
                        optionStyle = "border-rose-500 bg-rose-500/10 text-rose-950 dark:text-rose-100 ring-2 ring-rose-500/30";
                        badgeStyle = "bg-rose-600 text-white border-rose-600";
                      } else {
                        optionStyle = "border-border/50 opacity-60 bg-muted/20";
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        disabled={hasAnsweredCurrent}
                        onClick={() => handleSelectOption(opt.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-start gap-3.5 cursor-pointer disabled:cursor-default ${optionStyle}`}
                      >
                        <div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-xs font-bold transition-colors ${badgeStyle}`}
                        >
                          {opt.id}
                        </div>
                        <div className="flex-1 text-sm sm:text-base leading-relaxed pt-0.5">
                          {opt.text}
                        </div>
                        {hasAnsweredCurrent && (
                          <div className="shrink-0 pt-0.5">
                            {isCorrect ? (
                              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                            ) : isSelected ? (
                              <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                            ) : null}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Detailed Feedback & Pro Interview Tips */}
                {hasAnsweredCurrent && (
                  <div className="mt-8 space-y-4 animate-in fade-in duration-200">
                    {/* Core Technical Explanation */}
                    <div className="p-5 rounded-2xl border border-border bg-muted/40 space-y-3">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-primary" />
                        <h4 className="text-sm sm:text-base font-bold text-foreground">
                          Giải thích kỹ thuật chuyên sâu:
                        </h4>
                      </div>
                      <p className="text-sm leading-relaxed text-foreground/90 bg-background/60 p-3.5 rounded-xl border border-border/60">
                        {currentQ.explanation}
                      </p>

                      {/* Distractor Explanations */}
                      {currentQ.distractorExplanations &&
                        Object.keys(currentQ.distractorExplanations).length > 0 && (
                          <div className="pt-3 border-t border-border/60 space-y-2">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                              Tại sao các phương án khác bị loại:
                            </p>
                            <div className="space-y-1.5 text-xs sm:text-sm">
                              {Object.entries(currentQ.distractorExplanations).map(([optId, reason]) => (
                                <div key={optId} className="p-2.5 rounded-lg border border-border/40 bg-card/60 leading-relaxed text-muted-foreground">
                                  <strong className="text-foreground">Đáp án {optId}:</strong> {reason}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>

                    {/* Pro Interview Tip (Key Talking Point) */}
                    <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 text-amber-950 dark:text-amber-100 flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                      <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
                        <strong className="font-bold text-amber-700 dark:text-amber-400">
                          🌟 Pro Interview Tip (Điểm cộng khi phỏng vấn):
                        </strong>
                        <p>{currentQ.interviewTip}</p>
                      </div>
                    </div>

                    {/* Candidate Red Flag */}
                    <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5 text-rose-950 dark:text-rose-100 flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                      <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
                        <strong className="font-bold text-rose-700 dark:text-rose-400">
                          ⚠️ Candidate Red Flag (Bẫy trả lời cần tránh):
                        </strong>
                        <p>{currentQ.commonMistake}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Navigation */}
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="gap-1.5"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Câu trước
                  </Button>

                  <span className="text-xs text-muted-foreground font-medium">
                    {!hasAnsweredCurrent ? "Hãy chọn 1 đáp án để xem giải thích & mẹo" : "Đã hoàn thành"}
                  </span>

                  <Button
                    size="sm"
                    disabled={!hasAnsweredCurrent}
                    onClick={handleNext}
                    className="gap-1.5 font-bold"
                  >
                    {currentIndex === activeQuestions.length - 1 ? (
                      <>
                        Xem kết quả phỏng vấn
                        <Award className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Câu tiếp theo
                        <ChevronRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* SUMMARY VIEW */}
          {quizState === "summary" && (
            <Card className="border-border shadow-sm text-center py-8 px-4 sm:px-8 space-y-6">
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mx-auto">
                <Briefcase className="h-10 w-10" />
              </div>
              <div>
                <CardTitle className="text-2xl sm:text-3xl font-black">
                  Hoàn thành vòng phỏng vấn thử!
                </CardTitle>
                <CardDescription className="text-sm sm:text-base mt-1">
                  Bạn vừa hoàn thành {activeQuestions.length} câu hỏi phỏng vấn kỹ thuật AI Engineer ({DIFFICULTY_LEVELS.find((l) => l.id === selectedLevel)?.label}).
                </CardDescription>
              </div>

              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                <div className="p-4 rounded-xl border border-border bg-card">
                  <div className="text-2xl sm:text-3xl font-black text-foreground">
                    {liveStats.correct} / {activeQuestions.length}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Số câu chuẩn</div>
                </div>

                <div className="p-4 rounded-xl border border-border bg-card">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                    {liveStats.accuracy}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Độ chính xác</div>
                </div>

                <div className="p-4 rounded-xl border border-border bg-card">
                  <div className="text-2xl sm:text-3xl font-black text-foreground">
                    {elapsedSeconds > 0 ? `${Math.round(elapsedSeconds / 60)}p` : "<1p"}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Thời gian</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Button onClick={handleStartQuiz} className="gap-2 font-bold shadow-xs">
                  <RotateCcw className="h-4 w-4" />
                  Luyện tiếp bộ câu mới ({selectedCount} câu)
                </Button>
                <Button variant="outline" onClick={() => setQuizState("config")} className="gap-2 font-semibold">
                  <Sliders className="h-4 w-4" />
                  Đổi thiết lập cấp độ & chủ đề
                </Button>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 2: SYSTEM DESIGN SCENARIOS */}
      {/* ========================================== */}
      {activeTab === "scenarios" && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl border border-border bg-card/60 text-xs sm:text-sm text-muted-foreground flex items-start gap-3">
            <Server className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p>
              <strong>Vòng phỏng vấn AI System Design</strong> thường kéo dài 45 - 60 phút. Nhà tuyển dụng không tìm kiếm một công cụ cụ thể, mà đánh giá cách bạn phân tích yêu cầu (SLA, latency budget, scale), chia nhỏ thành các tầng kiến trúc (Ingestion, Retrieval, Serving, Guardrails) và giải thích các đánh đổi (Trade-offs).
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {scenarioQuestions.map((scenario) => {
              const details = scenario.systemDesign;
              if (!details) return null;

              return (
                <Card key={scenario.id} className="border-border/80 shadow-sm overflow-hidden">
                  <CardHeader className="bg-muted/30 border-b border-border/60 pb-4">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <Badge variant="outline" className="text-xs font-semibold">
                        {scenario.categoryName}
                      </Badge>
                      <Badge variant="secondary" className="text-xs uppercase font-bold">
                        {scenario.difficulty === "junior" ? "Level 1: Junior" : scenario.difficulty === "mid" ? "Level 2: Mid-Level" : "Level 3: Senior / Lead"}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-bold">
                      {scenario.title}
                    </CardTitle>
                    <p className="text-sm font-semibold text-primary pt-1">
                      Đề bài: {details.scenario}
                    </p>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Recommended Architecture */}
                    <div className="space-y-2.5">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        Kiến trúc giải pháp đề xuất (Step-by-step Architecture):
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-foreground/90 pl-1">
                        {details.recommendedArchitecture.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg border border-border/50 bg-card">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Trade-offs */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                        <Sliders className="h-4 w-4 text-primary" />
                        Các điểm đánh đổi kiến trúc cốt lõi (Key Architectural Trade-offs):
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                        {details.keyTradeoffs.map((tradeoff, idx) => (
                          <div key={idx} className="p-3 rounded-lg border border-border/50 bg-muted/20 leading-relaxed">
                            {tradeoff}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Evaluator Rubric & Red Flags */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border/60">
                      <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-1.5 text-xs sm:text-sm">
                        <strong className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                          <Lightbulb className="h-4 w-4 text-amber-500" />
                          Tiêu chí Bar Raiser / Leader đánh giá:
                        </strong>
                        <p className="text-amber-950 dark:text-amber-100 leading-relaxed">
                          {details.whatInterviewersLookFor}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5 space-y-1.5 text-xs sm:text-sm">
                        <strong className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                          <AlertTriangle className="h-4 w-4 text-rose-500" />
                          Điều tối kỵ cần tránh (Red Flags):
                        </strong>
                        <p className="text-rose-950 dark:text-rose-100 leading-relaxed">
                          {details.redFlagsToAvoid}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
