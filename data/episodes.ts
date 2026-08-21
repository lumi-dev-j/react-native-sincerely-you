import type { ImageSourcePropType } from "react-native";
import type { VideoSource } from "expo-video";

import { images } from "@/constants/images";
import { patternReveals } from "@/data/patterns";

export type Episode = {
  id: string;
  category: string;
  episodeNumber: number;
  /** Rendered as-is, so a literal "\n" controls the line break. */
  title: string;
  coverImage: ImageSourcePropType;
  video: VideoSource;
  /** First context line, with a bolded lead-in (usually the character names). */
  contextIntro: { emphasis: string; rest: string };
  /** Second context line, shown below the divider. */
  contextHook: string;
  /** Pattern titles surfaced on the episode-complete screen, sourced from this episode's patternReveals entry. */
  discoveredPatterns: string[];
  /** Id of the episode to continue into. Undefined once the story ends. */
  nextEpisodeId?: string;
};

export const episodes: Record<string, Episode> = {
  "too-good-to-be-true": {
    id: "too-good-to-be-true",
    category: "Dating",
    episodeNumber: 1,
    title: "Too Good\nto Be True",
    coverImage: images.episode1Scene,
    video: {
      uri: "https://pub-c2198be740204535b80c982140941694.r2.dev/dating/episode-1.mp4",
    },
    contextIntro: {
      emphasis: "Jimmy and Taylor",
      rest: " have only been\non a few dates.",
    },
    contextHook:
      "But somehow, it already feels like\nthey've known each other forever.",
    discoveredPatterns: patternReveals["too-good-to-be-true"].patterns.map(
      (pattern) => pattern.title
    ),
    nextEpisodeId: "friday-night",
  },
};
