import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="search-control">
      <Search aria-hidden="true" className="search-icon" size={18} strokeWidth={1.8} />
      <Input
        aria-label="Search prompts by title, prompt text, or keyword"
        autoComplete="off"
        className="search-input"
        id="prompt-search"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search prompts…"
        type="search"
        value={value}
      />
      {value ? (
        <Button
          aria-label="Clear search"
          className="search-clear"
          onClick={() => onChange("")}
          size="icon"
          type="button"
          variant="ghost"
        >
          <X aria-hidden="true" size={16} />
        </Button>
      ) : (
        <kbd aria-hidden="true" className="search-shortcut">
          Ctrl K
        </kbd>
      )}
    </div>
  );
}
