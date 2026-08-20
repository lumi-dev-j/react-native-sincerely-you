import type { ImageSourcePropType } from "react-native";

import { images } from "@/constants/images";

export type Episode = {
  id: string;
  category: string;
  episodeNumber: number;
  /** Rendered as-is, so a literal "\n" controls the line break. */
  title: string;
  coverImage: ImageSourcePropType;
  /** First context line, with a bolded lead-in (usually the character names). */
  contextIntro: { emphasis: string; rest: string };
  /** Second context line, shown below the divider. */
  contextHook: string;
};

export const episodes: Record<string, Episode> = {
  "too-good-to-be-true": {
    id: "too-good-to-be-true",
    category: "Dating",
    episodeNumber: 1,
    title: "Too Good\nto Be True",
    coverImage: images.episode1Scene,
    contextIntro: {
      emphasis: "Jimmy and Taylor",
      rest: " have only been\non a few dates.",
    },
    contextHook:
      "But somehow, it already feels like\nthey've known each other forever.",
  },
};
