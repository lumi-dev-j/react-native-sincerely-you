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

export type ResponseReflection = {
  /** Matches an id in the episode's decision.options. */
  id: string;
  reflection: string;
};

export type PatternReveal = {
  patterns: PatternInsight[];
  /**
   * When set, shows a "Your Response" section for whichever option the user
   * picked on the episode's response-selection screen — the quoted text
   * itself comes from that option (data/episodes.ts), keyed here by id so
   * the response text isn't duplicated across the two data files.
   */
  responses?: ResponseReflection[];
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
  "friday-night": {
    patterns: [
      {
        label: "Pattern Discovered",
        title: "Guilt-Tripping",
        description:
          "When someone makes you feel guilty for having your own needs, plans, or boundaries—without directly asking you to change them.",
        icon: { set: "material", name: "lightbulb-outline" },
      },
    ],
    responses: [
      {
        id: "response-1",
        reflection:
          "You gave up your plan to reduce the tension. Notice how guilt can make someone abandon a boundary even when no direct demand was made.",
      },
      {
        id: "response-2",
        reflection:
          "You acknowledged Taylor's feelings while keeping your plans. Caring about someone doesn't require giving up a reasonable boundary.",
      },
      {
        id: "response-3",
        reflection:
          "You named what you were feeling directly. But notice how the conversation shifted toward whether you had misunderstood Taylor instead of addressing the pressure you felt.",
      },
      {
        id: "response-4",
        reflection:
          "You tried to find a compromise while keeping your plans. But you also took responsibility for easing Taylor's disappointment, which can slowly make boundaries feel negotiable.",
      },
    ],
    watchFor: {
      label: "What to watch for",
      items: [
        "Making you feel selfish for having other priorities",
        "Becoming distant when you maintain a boundary",
        "Implying your choices prove how much you care",
        "Making you feel responsible for their disappointment",
      ],
      icon: { set: "feather", name: "eye" },
    },
    reminder: "Having your own plans doesn't mean you care about someone less.",
  },
};
