import type { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

import type { ImageSourcePropType } from "react-native";
import { images } from "@/constants/images";

type PatternIcon =
  | { set: "feather"; name: ComponentProps<typeof Feather>["name"] }
  | { set: "material"; name: ComponentProps<typeof MaterialCommunityIcons>["name"] };

export type PatternWhy = {
  /** Small uppercase heading, e.g. "Why it can feel like love". */
  heading: string;
  paragraphs: string[];
};

export type PatternInsight = {
  label: string;
  title: string;
  description: string;
  icon: PatternIcon;
  /** Reference photo used on the home screen's "Recently discovered" card. */
  image: ImageSourcePropType;
  /** Optional expanded context shown below the description on the pattern-reveal screen. */
  why?: PatternWhy;
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
        image: images.loveBombing,
      },
      {
        label: "Pattern 2",
        title: "Future Faking",
        description:
          "When someone talks about a future together that feels exciting but is used to gain your trust or commitment too quickly.",
        icon: { set: "material", name: "calendar-heart-outline" },
        image: images.futureFaking,
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
        image: images.guiltTripping,
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
  "the-little-things": {
    patterns: [
      {
        label: "Pattern Discovered",
        title: "Boundary Testing",
        description:
          "Small comments, jokes, or criticisms can test what you'll accept. What matters is whether your discomfort or preferences are respected when you express them.",
        icon: { set: "material", name: "shield-outline" },
        image: images.boundaryTesting,
      },
    ],
    responses: [
      {
        id: "response-1",
        reflection:
          "You brushed off your discomfort to keep the moment easy. When you minimize how something made you feel, the other person may never learn where your boundary is.",
      },
      {
        id: "response-2",
        reflection:
          "You looked to Taylor for approval and changed your choice around her preference. Notice when small comments start making you second-guess things you were comfortable with before.",
      },
      {
        id: "response-3",
        reflection:
          "You held onto your preference without turning the moment into a confrontation. That protects your independence—but because you kept it playful, Taylor may not realize her comment actually bothered you.",
      },
      {
        id: "response-4",
        reflection:
          "You clearly named how the comment affected you and asked for it to stop. Now the important part is what happens next: does Taylor respect that boundary over time?",
      },
    ],
    watchFor: {
      label: "What to watch for",
      items: [
        "Criticism disguised as teasing",
        "Dismissing discomfort as being \"too sensitive\"",
        "Repeated jokes at your expense",
        "Changing yourself to avoid criticism",
        "Whether clearly stated boundaries are respected",
      ],
      icon: { set: "feather", name: "eye" },
    },
    reminder:
      "A joke can still hurt. What matters is\nwhether your discomfort is respected.",
  },
  "mixed-signals": {
    patterns: [
      {
        label: "Pattern 1",
        title: "Push-and-Pull",
        description:
          "When someone shifts between intense closeness and unexpected distance, you may start wondering where you stand.",
        icon: { set: "material", name: "swap-horizontal" },
        image: images.pushAndPull,
        why: {
          heading: "Why it can feel like love",
          paragraphs: [
            "When warmth returns after a period of distance, the relief can feel especially powerful.",
            "Those emotional highs can become hard to let go of — and the intensity can sometimes be mistaken for a deeper connection.",
          ],
        },
      },
    ],
    watchFor: {
      label: "What to watch for",
      items: [
        "Affection that repeatedly shifts between warm and distant",
        "Feeling anxious when their attention changes",
        "Thinking more about them when they pull away",
        "Feeling a strong rush of relief when closeness returns",
        "Confusing emotional intensity with emotional security",
      ],
      icon: { set: "feather", name: "eye" },
    },
    reminder: "Love shouldn't keep you guessing when the warmth will return.",
  },
};

/**
 * First pattern surfaced by the most recently completed episode, for the
 * home screen's "Recently discovered" card. `completedEpisodeIds` is
 * append-only, so the last id is the most recent completion.
 */
export function getMostRecentPattern(
  completedEpisodeIds: string[]
): PatternInsight | undefined {
  for (let i = completedEpisodeIds.length - 1; i >= 0; i--) {
    const patterns = patternReveals[completedEpisodeIds[i]]?.patterns;
    if (patterns?.length) return patterns[0];
  }
  return undefined;
}
