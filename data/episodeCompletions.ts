import type { ImageSourcePropType } from "react-native";

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
    /** One paragraph per entry. */
    body: string[];
    closingLine: string;
    buttonLabel: string;
  };
  /** Shown instead of pattern pills when the episode has no discoveredPatterns. */
  noPatternNote?: string;
};

export const episodeCompletions: Record<string, EpisodeCompletion> = {
  "too-good-to-be-true": {
    nextEpisode: {
      episodeNumber: 2,
      titleLine: "Friday night...",
      description: "Maya meets your\nclosest friends.",
    },
  },
  "friday-night": {
    nextEpisode: {
      episodeNumber: 3,
      titleLine: "The Little Things",
      description: "Small comments start to\nmake Jimmy second-guess himself.",
    },
  },
  "the-little-things": {
    nextEpisode: {
      episodeNumber: 4,
      titleLine: "Mixed Signals",
      description: "Jimmy starts noticing signals\nthat don't quite line up.",
    },
  },
  "mixed-signals": {
    nextEpisode: {
      episodeNumber: 5,
      titleLine: "The Quiet After",
      description: "Taylor goes quiet, and Jimmy\nis left guessing why.",
    },
  },
  "the-silent-treatment": {
    nextEpisode: {
      episodeNumber: 6,
      titleLine: "Off Course",
      description: "Jimmy brings up something that\nbothered him—but somehow ends up apologizing.",
    },
  },
  "disappearing-act": {
    nextEpisode: {
      episodeNumber: 7,
      titleLine: "Are You Sure?",
      description: "Jimmy brings up a comment that hurt him—\nbut Taylor remembers it differently.",
    },
  },
  "second-guessing": {
    nextEpisode: {
      episodeNumber: 8,
      titleLine: "Seeing It Clearly",
      description: "Looking back, a clearer picture\nstarts to take shape.",
    },
  },
  "seeing-it-clearly": {
    noPatternNote:
      "This episode was about stepping back and seeing how the patterns you've already discovered can connect over time.",
    storyComplete: {
      title: "Seeing It Clearly",
      body: [
        "Jimmy started out wondering if he was overthinking the little things.",
        "Over time, he began to see that those moments weren't so separate after all.",
        "He may not know exactly what happens next. But he knows that what he feels matters — and that he doesn't want to lose himself trying to make a relationship work.",
      ],
      closingLine: "And neither should you.",
      buttonLabel: "Return Home",
    },
  },
};
