"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LocaleSwitcher } from "@/components/shared/locale-switcher";
import { Button } from "@/components/ui/button";
import {
  Award,
  BookOpen,
  GraduationCap,
  Sparkles,
  LayoutDashboard,
  Briefcase,
  Menu,
  X
} from "lucide-react";

export function Header() {
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/certifications", label: tNav("certifications"), icon: Award },
    { href: "/knowledge", label: tNav("knowledge"), icon: BookOpen },
    { href: "/learn", label: tNav("learn"), icon: GraduationCap },
    { href: "/practice", label: tNav("practice"), icon: Sparkles },
    { href: "/interview", label: tNav("interview"), icon: Briefcase },
    { href: "/dashboard", label: tNav("dashboard"), icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-foreground transition-opacity hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-lg shadow-sm">
            C
          </div>
          <div className="flex flex-col">
            <span className="text-lg leading-tight font-extrabold">{tCommon("appName")}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">AI Certification Prep</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <LocaleSwitcher />
          <ThemeToggle />
          <Link href="/practice">
            <Button size="sm" className="font-semibold shadow-xs">
              {tCommon("startPractice")}
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <LocaleSwitcher />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="pt-2 border-t border-border">
            <Link href="/practice" onClick={() => setMobileMenuOpen(false)} className="w-full block">
              <Button className="w-full font-semibold">{tCommon("startPractice")}</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
