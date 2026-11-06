"use client";

import { useEffect, useMemo, useState } from "react";
import { Moon, Sparkles, Sun } from "lucide-react";
import { categories, prompts, type CategoryFilter } from "@/lib/prompts";
import { CategoryNavigation } from "@/components/category-navigation";
import { PromptCard } from "@/components/prompt-card";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";
type CategoryCounts = Record<CategoryFilter, number>;

export function PromptLibrary() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const initialTheme: Theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.getElementById("prompt-search")?.focus();
      }
    }
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = Object.fromEntries([
      ["all", prompts.length],
      ...categories.map((category) => [category.id, 0]),
    ]) as CategoryCounts;
    for (const prompt of prompts) counts[prompt.category] += 1;
    return counts;
  }, []);

  const filteredPrompts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return prompts.filter((prompt) => {
      if (activeCategory !== "all" && prompt.category !== activeCategory) return false;
      if (!query) return true;
      const categoryName = categories.find((category) => category.id === prompt.category)?.name ?? "";
      const searchableText = [
        prompt.title,
        prompt.description,
        prompt.text,
        categoryName,
        ...prompt.keywords,
      ].join(" ").toLocaleLowerCase();
      return searchableText.includes(query);
    });
  }, [activeCategory, search]);

  const activeCategoryName = activeCategory === "all"
    ? "All prompts"
    : categories.find((category) => category.id === activeCategory)?.name ?? "All prompts";

  function toggleTheme() {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("prompt-library-theme", nextTheme);
  }

  return (
    <div className="app-root">
      <a className="skip-link" href="#main-content">Skip to prompts</a>
      <header className="topbar">
        <div className="topbar-inner">
          <a aria-label="Prompt Library home" className="brand" href="/">
            <span aria-hidden="true" className="brand-mark"><Sparkles size={17} strokeWidth={2.2} /></span>
            <span className="brand-name">Prompt<span>Library</span></span>
          </a>
          <div className="topbar-actions">
            <div className="header-search"><SearchBar onChange={setSearch} value={search} /></div>
            <Button
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              aria-pressed={theme === "dark"}
              className="theme-toggle"
              onClick={toggleTheme}
              size="sm"
              type="button"
              variant="outline"
            >
              {theme === "light" ? <Moon aria-hidden="true" size={16} /> : <Sun aria-hidden="true" size={16} />}
              <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="dashboard-layout">
        <aside className="sidebar">
          <CategoryNavigation
            activeCategory={activeCategory}
            counts={categoryCounts}
            onSelect={setActiveCategory}
          />
        </aside>

        <main className="library-main" id="main-content">
          <div className="page-heading">
            <h1>Find a prompt.<br /><span className="heading-highlight">Get things moving.</span></h1>
          </div>

          <div className="mobile-category-nav">
            <CategoryNavigation
              activeCategory={activeCategory}
              compact
              counts={categoryCounts}
              onSelect={setActiveCategory}
            />
          </div>

          <div className="results-toolbar">
            <p aria-live="polite" className="results-summary">{resultsLabel}</p>
            <span className="active-filter">
              <span className="filter-dot" aria-hidden="true" />
              {activeCategoryName}
            </span>
          </div>

          {filteredPrompts.length > 0 ? (
            <div className="prompt-grid">
              {filteredPrompts.map((prompt) => <PromptCard key={prompt.id} prompt={prompt} />)}
            </div>
          ) : (
            <section aria-live="polite" className="empty-state">
              <span className="empty-icon" aria-hidden="true"><Sparkles size={22} /></span>
              <h2>No prompts found</h2>
              <p>Try a different title, topic, or keyword.</p>
              <Button onClick={() => setSearch("")} type="button" variant="outline">Clear search</Button>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
  