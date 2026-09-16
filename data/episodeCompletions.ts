import type { ImageSourcePropType } from "react-native";

import { images } from "@/constants/images";

export type EpisodeCompletion = {
  /** Omit once the story ends — see `storyComplete` below. */
  nextEpisode?: {
    episodeNumber: number;
    /** Rendered as-is, so a literal "\n" controls the line break. */
    titleLine: string;
    description: string;
    /** Leave unset to show a placeholder slot until the art exists. */
    thumbnail?: ImageSourcePropType;
  };
  /** Set on the final episode's completion instead of `nextEpisode`. */
  storyComplete?: {
    title: string;
    /** One paragraph per entry. Wrap a phrase in `**...**` to render it bold burgundy. */
    body: string[];
    /** Highlighted closing note shown below the body paragraphs. */
    closingCard: {
      title: string;
      description: string;
    };
  };
  /** Shown instead of pattern pills when the episode has no discoveredPatterns. */
  noPatternNote?: string;
};

export const episodeCompletions: Record<string, EpisodeCompletion> = {
  "too-good-to-be-true": {
    nextEpisode: {
      episodeNumber: 2,
      titleLine: "Friday night...",
      description: "Jimmy wants to see his friend\nbut Taylor feels distant.",
      thumbnail: images.episode2Scene,
    },
  },
  "friday-night": {
    nextEpisode: {
      episodeNumber: 3,
      titleLine: "The Little Things",
      description: "Small comments start to\nmake Jimmy second-guess himself.",
      thumbnail: images.episode3Scene,
    },
  },
  "the-little-things": {
    nextEpisode: {
      episodeNumber: 4,
      titleLine: "Mixed Signals",
      description: "Jimmy starts noticing signals\nthat don't quite line up.",
      thumbnail: images.episode4Scene,
    },
  },
  "mixed-signals": {
    nextEpisode: {
      episodeNumber: 5,
      titleLine: "The Quiet After",
      description: "Taylor goes quiet, and Jimmy\nis left guessing why.",
      thumbnail: images.episode5Scene,
    },
  },
  "the-silent-treatment": {
    nextEpisode: {
      episodeNumber: 6,
      titleLine: "Off Course",
      description: "Jimmy brings up something that\nbothered him—but somehow ends up apologizing.",
      thumbnail: images.episode6Scene,
    },
  },
  "disappearing-act": {
    nextEpisode: {
      episodeNumber: 7,
      titleLine: "Are You Sure?",
      description: "Jimmy brings up a comment that hurt him—\nbut Taylor remembers it differently.",
      thumbnail: images.episode7Scene,
    },
  },
  "second-guessing": {
    nextEpisode: {
      episodeNumber: 8,
      titleLine: "Seeing It Clearly",
      description: "Looking back, a clearer picture\nstarts to take shape.",
      thumbnail: images.episode8Scene,
    },
  },
  "seeing-it-clearly": {
    noPatternNote:
      "This episode was about stepping back and seeing how the patterns you've already discovered can connect over time.",
    storyComplete: {
      title: "Seeing It Clearly",
      /** `**...**` wraps a phrase in bold burgundy — see renderEmphasis in EpisodeCompleteScreen. */
      body: [
        "Jimmy started out wondering if he was **overthinking the little things.**",
        "Over time, he began to see that those moments **weren't so separate after all.**",
        "He may not know exactly what happens next. But he knows that **what he feels matters** — and that he doesn't want to lose himself trying to make a relationship work.",
      ],
      closingCard: {
        title: "Your feelings matter, too.",
        description:
          "You deserve a relationship where you can speak honestly, trust yourself, and still feel like you.",
      },
    },
  },
};
