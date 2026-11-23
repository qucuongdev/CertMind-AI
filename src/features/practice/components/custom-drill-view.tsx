"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Link } from "@/i18n/navigation";
import { Question } from "@/types/practice";
import { Certification } from "@/types/certification";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
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
  Flame,
  Info
} from "lucide-react";

interface CustomDrillViewProps {
  certifications: Certification[];
  allQuestions: Question[];
  initialCertSlug?: string;
  initialCount?: number;
}

const PRESET_COUNTS = [5, 10, 15, 20, 25, 30];

export function CustomDrillView({
  certifications,
  allQuestions,
  initialCertSlug,
  initialCount = 10,
}: CustomDrillViewProps) {
  // Mode: "config" | "active" | "summary"
  const [mode, setMode] = useState<"config" | "active" | "summary">("config");

  // Config State
  const [selectedCertSlug, setSelectedCertSlug] = useState<string>(initialCertSlug || "all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedCount, setSelectedCount] = useState<number>(initialCount);
  const [customCountInput, setCustomCountInput] = useState<string>(initialCount.toString());
  const [isCustomCount, setIsCustomCount] = useState<boolean>(!PRESET_COUNTS.includes(initialCount));
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(true);

  // Active Drill Session State
  const [drillQuestions, setDrillQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string[]>>({});
  const [drillStartTime, setDrillStartTime] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Available questions filtered by cert and difficulty
  const availableQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      if (selectedCertSlug !== "all" && q.certSlug !== selectedCertSlug) {
        return false;
      }
      if (selectedDifficulty !== "all" && q.difficulty !== selectedDifficulty) {
        return false;
      }
      return true;
    });
  }, [allQuestions, selectedCertSlug, selectedDifficulty]);

  // Max count available for current selection
  const maxAvailable = availableQuestions.length;

  // Handle Preset count select
  const handleSelectPreset = (count: number) => {
    setIsCustomCount(false);
    const validCount = Math.min(count, maxAvailable);
    setSelectedCount(validCount);
    setCustomCountInput(validCount.toString());
  };

  // Handle Custom Input
  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCustomCount(true);
    const val = e.target.value;
    setCustomCountInput(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setSelectedCount(Math.min(parsed, maxAvailable));
    }
  };

  // Start Drill
  const handleStartDrill = useCallback(() => {
    if (availableQuestions.length === 0) return;

    const pool = [...availableQuestions];
    if (shuffleQuestions) {
      pool.sort(() => Math.random() - 0.5);
    }

    const countToTake = Math.max(1, Math.min(selectedCount, pool.length));
    const selected = pool.slice(0, countToTake);

    setDrillQuestions(selected);
    setCurrentIndex(0);
    setUserAnswers({});
    setDrillStartTime(Date.now());
    setElapsedSeconds(0);
    setMode("active");
  }, [availableQuestions, shuffleQuestions, selectedCount]);

  // Current question in drill
  const currentQuestion = drillQuestions[currentIndex];
  const currentAnswers = currentQuestion ? userAnswers[currentQuestion.id] || [] : [];
  const hasAnsweredCurrent = currentAnswers.length > 0;

  // Answer handler
  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion) return;
    if (hasAnsweredCurrent) return; // Immediate lock-in for drill mode

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: [optionId],
    }));
  };

  // Live Score stats
  const liveStats = useMemo(() => {
    let correct = 0;
    let incorrect = 0;

    drillQuestions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans && ans.length > 0) {
        const isRight =
          ans.length === q.correctOptionIds.length &&
          ans.every((id) => q.correctOptionIds.includes(id));
        if (isRight) correct++;
        else incorrect++;
      }
    });

    const totalAnswered = correct + incorrect;
    const accuracy = totalAnswered > 0 ? Math.round((correct / totalAnswered) * 100) : 0;

    return { correct, incorrect, totalAnswered, accuracy };
  }, [drillQuestions, userAnswers]);

  // Navigation in Drill
  const handleNext = () => {
    if (currentIndex < drillQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finished
      const elapsed = Math.round((Date.now() - drillStartTime) / 1000);
      setElapsedSeconds(elapsed);
      setMode("summary");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // ==========================================
  // RENDER: CONFIGURATION MODE
  // ==========================================
  if (mode === "config") {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider w-fit">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Luyện tập linh hoạt • Instant Feedback Drill</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Luyện tập câu hỏi tùy chọn
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Chọn số lượng câu hỏi (5, 10, 15, 20... hoặc nhập tùy ý), nhận phản hồi đúng/sai tức thì và phân tích chi tiết vì sao các đáp án còn lại sai.
          </p>
        </div>

        {/* Configuration Card */}
        <Card className="border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sliders className="h-5 w-5 text-primary" />
              Thiết lập bộ câu hỏi luyện tập
            </CardTitle>
            <CardDescription>
              Tùy chỉnh phạm vi kiến thức, độ khó và số lượng câu hỏi phù hợp với quỹ thời gian của bạn.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 1. Chọn Chứng chỉ / Chương trình */}
            <div className="space-y-2">
              <label htmlFor="cert-select" className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" />
                1. Chọn chứng chỉ muốn luyện:
              </label>
              <select
                id="cert-select"
                value={selectedCertSlug}
                onChange={(e) => {
                  setSelectedCertSlug(e.target.value);
                  setIsCustomCount(false);
                }}
                className="w-full p-3 rounded-xl border border-border bg-background text-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <option value="all">🌐 Tất cả các chứng chỉ (Ngân hàng tổng hợp)</option>
                {certifications.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.providerName}: {c.name} ({c.level})
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Chọn Độ khó */}
            <div className="space-y-2">
              <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Flame className="h-4 w-4 text-primary" />
                2. Độ khó câu hỏi:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "all", label: "Tất cả độ khó" },
                  { id: "foundational", label: "Foundational" },
                  { id: "intermediate", label: "Intermediate" },
                  { id: "advanced", label: "Advanced" },
                ].map((diff) => (
                  <button
                    key={diff.id}
                    type="button"
                    onClick={() => setSelectedDifficulty(diff.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      selectedDifficulty === diff.id
                        ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                        : "border-border/60 hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    {diff.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Chọn Số lượng câu hỏi (Presets + Custom Input) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  3. Số lượng câu hỏi luyện tập:
                </span>
                <span className="text-xs text-muted-foreground">
                  Hiện có sẵn: <strong className="text-foreground">{maxAvailable} câu</strong>
                </span>
              </div>

              {/* Preset Buttons */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {PRESET_COUNTS.map((count) => {
                  const isAvailable = count <= maxAvailable;
                  const isSelected = !isCustomCount && selectedCount === count;

                  return (
                    <button
                      key={count}
                      type="button"
                      disabled={!isAvailable && maxAvailable > 0 && count > maxAvailable + 5}
                      onClick={() => handleSelectPreset(count)}
                      className={`py-2.5 px-3 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-xs"
                          : "border-border/60 hover:bg-muted text-foreground"
                      } ${!isAvailable ? "opacity-60" : ""}`}
                    >
                      {count} câu
                    </button>
                  );
                })}
              </div>

              {/* Custom Number Input Row */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <label htmlFor="custom-count" className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                    Hoặc nhập số lượng tùy ý:
                  </label>
                  <Input
                    id="custom-count"
                    type="number"
                    min="1"
                    max={maxAvailable}
                    value={customCountInput}
                    onChange={handleCustomInputChange}
                    placeholder={`1 - ${maxAvailable}`}
                    className={`w-28 text-center font-bold ${
                      isCustomCount ? "ring-2 ring-primary border-primary" : ""
                    }`}
                  />
                  <span className="text-xs text-muted-foreground">câu</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectPreset(maxAvailable)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                    !isCustomCount && selectedCount === maxAvailable
                      ? "border-primary bg-primary/10 text-primary font-bold"
                      : "border-border/60 hover:bg-muted text-muted-foreground"
                  }`}
                >
                  Làm toàn bộ ({maxAvailable} câu)
                </button>
              </div>

              {maxAvailable === 0 && (
                <p className="text-xs text-rose-500 font-medium">
                  Không tìm thấy câu hỏi phù hợp với bộ lọc hiện tại. Vui lòng chọn lại chứng chỉ hoặc độ khó.
                </p>
              )}
            </div>

            {/* 4. Tùy chọn xáo trộn */}
            <div className="pt-2 flex items-center justify-between border-t border-border/50">
              <label htmlFor="shuffle-toggle" className="text-xs font-medium text-muted-foreground cursor-pointer flex items-center gap-2">
                <input
                  id="shuffle-toggle"
                  type="checkbox"
                  checked={shuffleQuestions}
                  onChange={(e) => setShuffleQuestions(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                />
                Xáo trộn thứ tự câu hỏi ngẫu nhiên (Shuffle)
              </label>

              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Check className="h-3.5 w-3.5" />
                Sẽ luyện {Math.min(selectedCount, maxAvailable)} câu
              </span>
            </div>

            {/* Start Button */}
            <Button
              size="lg"
              disabled={maxAvailable === 0}
              onClick={handleStartDrill}
              className="w-full gap-2 font-bold text-base h-12 shadow-sm"
            >
              <Sparkles className="h-5 w-5" />
              Bắt đầu luyện tập ngay ({Math.min(selectedCount, maxAvailable)} câu)
              <ArrowRight className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ==========================================
  // RENDER: ACTIVE DRILL SESSION (INSTANT REVEAL)
  // ==========================================
  if (mode === "active" && currentQuestion) {
    const isMultiple = currentQuestion.type === "multiple_choice";
    const selectedOption = currentAnswers[0];
    const isAnswered = currentAnswers.length > 0;
    const isUserCorrect =
      isAnswered &&
      currentQuestion.correctOptionIds.length === currentAnswers.length &&
      currentAnswers.every((id) => currentQuestion.correctOptionIds.includes(id));

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header & Live Counter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border border-border bg-card/70 backdrop-blur-xs">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMode("config")}
              className="gap-1 text-xs text-muted-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Đổi cấu hình
            </Button>
            <div className="h-4 w-px bg-border" />
            <span className="text-sm font-bold text-foreground">
              Câu {currentIndex + 1} / {drillQuestions.length}
            </span>
          </div>

          {/* Live Score Counter */}
          <div className="flex items-center gap-3 text-xs font-semibold">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Đúng: {liveStats.correct}
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/30">
              <XCircle className="h-3.5 w-3.5" />
              Sai: {liveStats.incorrect}
            </div>
            {liveStats.totalAnswered > 0 && (
              <span className="text-muted-foreground hidden sm:inline">
                Chính xác: {liveStats.accuracy}%
              </span>
            )}
          </div>
        </div>

        {/* Question Card */}
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card space-y-6 shadow-sm">
          {/* Question Metadata */}
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-mono uppercase">
                {currentQuestion.certSlug.split("-")[0]}
              </Badge>
              <Badge variant="secondary" className="text-xs capitalize">
                {currentQuestion.difficulty}
              </Badge>
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              ID: {currentQuestion.id}
            </span>
          </div>

          {/* Prompt */}
          <div className="text-lg sm:text-xl font-bold text-foreground leading-relaxed">
            {currentQuestion.prompt}
          </div>

          {isMultiple && (
            <p className="text-xs text-muted-foreground italic">
              (Chọn đáp án đúng nhất)
            </p>
          )}

          {/* Options with Instant Feedback */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((opt) => {
              const isSelected = currentAnswers.includes(opt.id);
              const isCorrect = currentQuestion.correctOptionIds.includes(opt.id);

              let optionStyle = "border-border hover:border-primary/50 bg-card hover:bg-muted/40";
              let badgeStyle = "bg-muted text-muted-foreground border-border";

              if (isAnswered) {
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
                  disabled={isAnswered}
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
                  {isAnswered && (
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

          {/* Instant Detailed Explanation & Distractor Analysis */}
          {isAnswered && (
            <div className="mt-8 p-5 sm:p-6 rounded-2xl border border-border bg-muted/40 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm sm:text-base font-bold text-foreground">
                    {isUserCorrect ? "✅ Chính xác! Giải thích chi tiết:" : "❌ Chưa chính xác. Giải thích chi tiết:"}
                  </span>
                </div>
                <Badge variant={isUserCorrect ? "default" : "destructive"} className="text-xs font-semibold">
                  {isUserCorrect ? "Bạn trả lời đúng" : "Bạn chọn: " + selectedOption}
                </Badge>
              </div>

              {/* Primary Explanation */}
              <p className="text-sm leading-relaxed text-foreground/90 bg-background/60 p-3.5 rounded-xl border border-border/60">
                {currentQuestion.explanation}
              </p>

              {/* Distractor Explanations Breakdown (Why not choose other options) */}
              {currentQuestion.distractorExplanations &&
                Object.keys(currentQuestion.distractorExplanations).length > 0 && (
                  <div className="pt-3 border-t border-border/60 space-y-2.5">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <Info className="h-3.5 w-3.5 text-primary" />
                      Tại sao các phương án khác không được chọn? (Phân tích bẫy thi):
                    </p>
                    <div className="space-y-2 text-xs sm:text-sm">
                      {Object.entries(currentQuestion.distractorExplanations).map(([optId, reason]) => (
                        <div
                          key={optId}
                          className="p-3 rounded-lg border border-border/40 bg-card/60 leading-relaxed text-muted-foreground"
                        >
                          <span className="font-bold text-foreground">Đáp án {optId}: </span>
                          {reason}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}

          {/* Bottom Action Bar */}
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
              {!isAnswered ? "Hãy chọn 1 đáp án để xem giải thích" : "Đã hoàn thành câu này"}
            </span>

            <Button
              variant={currentIndex === drillQuestions.length - 1 ? "default" : "default"}
              size="sm"
              disabled={!isAnswered}
              onClick={handleNext}
              className="gap-1.5 font-bold"
            >
              {currentIndex === drillQuestions.length - 1 ? (
                <>
                  Hoàn thành & Xem kết quả
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
    );
  }

  // ==========================================
  // RENDER: SUMMARY / RESULTS MODE
  // ==========================================
  const total = drillQuestions.length;
  const correct = liveStats.correct;
  const accuracy = Math.round((correct / total) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Summary Score Card */}
      <Card className="border-border shadow-sm text-center py-8 px-4 sm:px-8">
        <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mx-auto mb-4">
          <Award className="h-10 w-10" />
        </div>
        <CardTitle className="text-2xl sm:text-3xl font-black">
          Hoàn thành bài luyện tập!
        </CardTitle>
        <CardDescription className="text-sm sm:text-base mt-1">
          Bạn vừa hoàn thành {total} câu hỏi luyện phản hồi tức thì.
        </CardDescription>

        {/* Score Numbers */}
        <div className="my-6 grid grid-cols-3 gap-3 max-w-md mx-auto">
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="text-2xl sm:text-3xl font-black text-foreground">
              {correct} / {total}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Số câu đúng</div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
              {accuracy}%
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

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button onClick={handleStartDrill} className="gap-2 font-bold shadow-xs">
            <RotateCcw className="h-4 w-4" />
            Luyện tiếp bộ câu mới ({selectedCount} câu)
          </Button>

          <Button variant="outline" onClick={() => setMode("config")} className="gap-2 font-semibold">
            <Sliders className="h-4 w-4" />
            Đổi cấu hình số câu & chủ đề
          </Button>

          <Link href="/practice">
            <Button variant="ghost" className="gap-2 text-muted-foreground">
              Quay lại trang Luyện tập
            </Button>
          </Link>
        </div>
      </Card>

      {/* Review Questions List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          Xem lại chi tiết từng câu trong phiên này ({total} câu)
        </h3>

        <div className="space-y-4">
          {drillQuestions.map((q, idx) => {
            const userAns = userAnswers[q.id] || [];
            const isRight =
              userAns.length === q.correctOptionIds.length &&
              userAns.every((id) => q.correctOptionIds.includes(id));

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isRight
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-rose-500/30 bg-rose-500/5"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-muted-foreground">
                      Câu {idx + 1}
                    </span>
                    {isRight ? (
                      <Badge variant="outline" className="text-xs border-emerald-500 text-emerald-600 dark:text-emerald-400 gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Đúng
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs border-rose-500 text-rose-600 dark:text-rose-400 gap-1">
                        <XCircle className="h-3 w-3" /> Sai
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    {q.certSlug.split("-")[0]}
                  </span>
                </div>

                <p className="text-sm font-semibold text-foreground leading-relaxed">
                  {q.prompt}
                </p>

                <div className="mt-3 text-xs space-y-1">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Bạn chọn:</strong>{" "}
                    {userAns.length > 0 ? userAns.join(", ") : "Chưa chọn"}
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-300">
                    <strong className="text-foreground">Đáp án đúng:</strong>{" "}
                    {q.correctOptionIds.join(", ")}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Giải thích:</strong> {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
