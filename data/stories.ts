import type { ComponentProps } from "react";
import type { Feather } from "@expo/vector-icons";

type FeatherIconName = ComponentProps<typeof Feather>["name"];

export type StoryCategoryStatus =
  | { kind: "in-progress"; completed: number; total: number }
  | { kind: "coming-soon" };

export type StoryCategory = {
  id: string;
  title: string;
  icon: FeatherIconName;
  accentClass: string;
  status: StoryCategoryStatus;
};

export const storyCategories: StoryCategory[] = [
  {
    id: "dating",
    title: "Dating",
    icon: "heart",
    accentClass: "bg-burgundy",
    status: { kind: "in-progress", completed: 4, total: 12 },
  },
  {
    id: "family",
    title: "Family",
    icon: "home",
    accentClass: "bg-sage",
    status: { kind: "coming-soon" },
  },
  {
    id: "workplace",
    title: "Workplace",
    icon: "briefcase",
    accentClass: "bg-slate",
    status: { kind: "coming-soon" },
  },
];
