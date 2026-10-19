import {
  BookOpen,
  Briefcase,
  CalendarDays,
  Code2,
  LayoutGrid,
  Lightbulb,
  Microscope,
  PenLine,
  Puzzle,
  Sigma,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { CategoryId } from "@/lib/prompts";

const categoryIcons: Record<CategoryId, LucideIcon> = {
  school: BookOpen,
  work: Briefcase,
  programming: Code2,
  research: Microscope,
  writing: PenLine,
  math: Sigma,
  business: TrendingUp,
  creative: Lightbulb,
  "problem-solving": Puzzle,
  personal: CalendarDays,
};

export function CategoryIcon({
  category,
  size = 17,
}: {
  category: CategoryId;
  size?: number;
}) {
  const Icon = categoryIcons[category];
  return <Icon aria-hidden="true" size={size} strokeWidth={1.8} />;
}

export function AllCategoriesIcon({ size = 17 }: { size?: number }) {
  return <LayoutGrid aria-hidden="true" size={size} strokeWidth={1.8} />;
}
