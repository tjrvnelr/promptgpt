"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { categories, type Prompt } from "@/lib/prompts";
import { CategoryIcon } from "@/components/category-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Try the selection based fallback for browsers with clipboard permissions disabled.
    }
  }

  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.setAttribute("aria-hidden", "true");
  field.style.position = "fixed";
  field.style.opacity = "0";
  field.style.pointerEvents = "none";
  document.body.appendChild(field);
  field.select();
  const copied = document.execCommand("copy");
  field.remove();

  if (!copied) throw new Error("Clipboard access is unavailable");
}

export function PromptCard({ prompt }: { prompt: Prompt }) {
  const [copyState, setCopyState] = useState<"ready" | "copied" | "error">("ready");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const categoryName = categories.find((item) => item.id === prompt.category)?.name;

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function handleCopy() {
    try {
      await copyText(prompt.text);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopyState("ready"), 1800);
  }

  const buttonLabel = copyState === "copied" ? "Copied!" : copyState === "error" ? "Try again" : "Copy prompt";

  return (
    <Card className="prompt-card" data-category={prompt.category}>
      <CardHeader className="prompt-card-header">
        <div className="prompt-card-meta">
          <span className="prompt-category" data-category={prompt.category}>
            <CategoryIcon category={prompt.category} size={14} />
            {categoryName}
          </span>
          <span className="prompt-marker" aria-hidden="true">{`{ }`}</span>
        </div>
        <h2 className="prompt-title">{prompt.title}</h2>
        <p className="prompt-description">{prompt.description}</p>
      </CardHeader>
      <CardContent className="prompt-card-content">
        <p className="prompt-text">{prompt.text}</p>
      </CardContent>
      <CardFooter className="prompt-card-footer">
        <span aria-live="polite" className={`copy-status${copyState === "error" ? " has-error" : ""}`}>
          {copyState === "copied" ? "Ready to paste" : copyState === "error" ? "Copy didn't work" : ""}
        </span>
        <Button
          className={`copy-button${copyState === "copied" ? " is-copied" : ""}`}
          onClick={handleCopy}
          size="sm"
          type="button"
          variant={copyState === "copied" ? "default" : "outline"}
        >
          {copyState === "copied" ? <Check aria-hidden="true" size={15} /> : <Copy aria-hidden="true" size={15} />}
          {buttonLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
