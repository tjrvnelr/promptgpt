import { ChevronDown } from "lucide-react";
import { categories, type CategoryFilter } from "@/lib/prompts";
import { AllCategoriesIcon, CategoryIcon } from "@/components/category-icon";

type CategoryCounts = Record<CategoryFilter, number>;

export function CategoryNavigation({
  activeCategory,
  counts,
  onSelect,
  compact = false,
}: {
  activeCategory: CategoryFilter;
  counts: CategoryCounts;
  onSelect: (category: CategoryFilter) => void;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="mobile-category-picker">
        <label htmlFor="mobile-category-select">Browse category</label>
        <div className="select-wrap">
          <select
            id="mobile-category-select"
            onChange={(event) => onSelect(event.target.value as CategoryFilter)}
            value={activeCategory}
          >
            <option value="all">All prompts · {counts.all}</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} · {counts[category.id]}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden="true" size={16} />
        </div>
      </div>
    );
  }

  return (
    <nav aria-label="Prompt categories" className="category-navigation">
      <p className="sidebar-label">Browse library</p>
      <button
        aria-current={activeCategory === "all" ? "page" : undefined}
        className={`category-link${activeCategory === "all" ? " is-active" : ""}`}
        onClick={() => onSelect("all")}
        type="button"
      >
        <span className="category-link-name">
          <AllCategoriesIcon />
          <span>All prompts</span>
        </span>
        <span className="category-count">{counts.all}</span>
      </button>

      <p className="sidebar-label category-list-label">Categories</p>
      <div className="category-list">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              aria-current={isActive ? "page" : undefined}
              className={`category-link${isActive ? " is-active" : ""}`}
              key={category.id}
              onClick={() => onSelect(category.id)}
              type="button"
            >
              <span className="category-link-name">
                <CategoryIcon category={category.id} />
                <span>{category.name}</span>
              </span>
              <span className="category-count">{counts[category.id]}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
