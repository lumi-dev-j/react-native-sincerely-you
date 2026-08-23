import type { ImageSourcePropType } from "react-native";
import type { VideoSource } from "expo-video";

import { images } from "@/constants/images";
import { patternReveals } from "@/data/patterns";

export type ResponseOption = {
  id: string;
  text: string;
  video: VideoSource;
};

export type EpisodeDecision = {
  /** Response-selection screen title, e.g. "What would you say?" */
  question: string;
  /** Supporting line under the title. */
  subtext: string;
  /** Small italic prompt shown above the response cards. */
  prompt: string;
  /** Substring of prompt to underline, e.g. a trailing verb. */
  promptEmphasis?: string;
  options: ResponseOption[];
};

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
  /** Substring of contextHook to render bolded, e.g. a character's name. */
  contextHookEmphasis?: string;
  /** Pattern titles surfaced on the episode-complete screen, sourced from this episode's patternReveals entry. */
  discoveredPatterns: string[];
  /** Id of the episode to continue into. Undefined once the story ends. */
  nextEpisodeId?: string;
  /** When set, the main video's CTA branches into a response-selection beat before the pattern reveal. */
  decision?: EpisodeDecision;
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
  "friday-night": {
    id: "friday-night",
    category: "Dating",
    episodeNumber: 2,
    title: "Friday Night",
    coverImage: images.episode2Scene,
    video: {
      uri: "https://pub-c2198be740204535b80c982140941694.r2.dev/dating/episode-2.mp4",
    },
    contextIntro: {
      emphasis: "Jimmy",
      rest: " hasn't seen his friends\nin weeks.",
    },
    contextHook:
      "But when he makes plans to see them,\nTaylor suddenly feels distant.",
    contextHookEmphasis: "Taylor",
    discoveredPatterns: (patternReveals["friday-night"]?.patterns ?? []).map(
      (pattern) => pattern.title
    ),
    decision: {
      question: "What would you say?",
      subtext: "Taylor is waiting for Jimmy's response.",
      prompt: "Choose what Jimmy says next.",
      promptEmphasis: "next.",
      options: [
        {
          id: "response-1",
          text: "Okay. I'll cancel and stay with you.",
          video: {
            uri: "https://pub-c2198be740204535b80c982140941694.r2.dev/dating/reponses/episode-2-a.mp4",
          },
        },
        {
          id: "response-2",
          text: "I care about you, but I still want to see my friends.",
          video: {
            uri: "https://pub-c2198be740204535b80c982140941694.r2.dev/dating/reponses/episode-2-b.mp4",
          },
        },
        {
          id: "response-3",
          text: "Why are you making me feel guilty about seeing my friends?",
          video: {
            uri: "https://pub-c2198be740204535b80c982140941694.r2.dev/dating/reponses/episode-2-c.mp4",
          },
        },
        {
          id: "response-4",
          text: "How about we spend tomorrow together instead?",
          video: {
            uri: "https://pub-c2198be740204535b80c982140941694.r2.dev/dating/reponses/episode-2-d.mp4",
          },
        },
      ],
    },
    nextEpisodeId: "the-little-things",
  },
};
