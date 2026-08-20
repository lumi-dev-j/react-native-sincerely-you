import type { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

type PatternIcon =
  | { set: "feather"; name: ComponentProps<typeof Feather>["name"] }
  | { set: "material"; name: ComponentProps<typeof MaterialCommunityIcons>["name"] };

export type PatternInsight = {
  label: string;
  title: string;
  description: string;
  icon: PatternIcon;
};

export type PatternWatchList = {
  label: string;
  items: string[];
  icon: PatternIcon;
};

export type PatternReveal = {
  patterns: PatternInsight[];
  watchFor: PatternWatchList;
  /** Rendered as-is, so a literal "\n" controls the line break. */
  reminder: string;
};

export const patternReveals: Record<string, PatternReveal> = {
  "too-good-to-be-true": {
    patterns: [
      {
        label: "Pattern 1",
        title: "Love Bombing",
        description:
          "When someone overwhelms you with intense attention early on to create a fast, deep emotional connection.",
        icon: { set: "material", name: "sprout-outline" },
      },
      {
        label: "Pattern 2",
        title: "Future Faking",
        description:
          "When someone talks about a future together that feels exciting but is used to gain your trust or commitment too quickly.",
        icon: { set: "material", name: "calendar-heart-outline" },
      },
    ],
    watchFor: {
      label: "What to watch for",
      items: [
        "Moving very fast emotionally",
        "Grand gestures early in the relationship",
        "Talking about a future together very soon",
      ],
      icon: { set: "feather", name: "eye" },
    },
    reminder:
      "One interaction alone does not define a person.\nLook for repeated patterns over time.",
  },
};
