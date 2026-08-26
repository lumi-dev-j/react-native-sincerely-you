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
  /** Id of the story (data/stories.ts) this episode belongs to. */
  storyId: string;
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
    storyId: "dating",
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
    storyId: "dating",
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

/**
 * Roster-level info for a story's episode list (Story Detail screen) —
 * every episode gets one of these, whether or not its full playable content
 * (video, decision, etc.) has been built yet. Built episodes derive theirs
 * from `episodes` above instead of repeating title/pattern data here.
 */
export type EpisodeSummary = {
  id: string;
  storyId: string;
  episodeNumber: number;
  title: string;
  coverImage?: ImageSourcePropType;
  patterns: string[];
};

/**
 * Episodes that are part of the story but don't have a built playable flow
 * yet — roster info only, so the Story Detail screen can list them as
 * upcoming/locked without fabricating story content that doesn't exist.
 */
const upcomingEpisodes: EpisodeSummary[] = [
  {
    id: "the-little-things",
    storyId: "dating",
    episodeNumber: 3,
    title: "The Little Things",
    coverImage: images.episode1Scene,
    patterns: [],
  },
  {
    id: "mixed-signals",
    storyId: "dating",
    episodeNumber: 4,
    title: "Mixed Signals",
    patterns: [],
  },
  {
    id: "the-silent-treatment",
    storyId: "dating",
    episodeNumber: 5,
    title: "The Silent Treatment",
    patterns: [],
  },
  {
    id: "disappearing-act",
    storyId: "dating",
    episodeNumber: 6,
    title: "Disappearing Act",
    patterns: [],
  },
  {
    id: "walking-on-eggshells",
    storyId: "dating",
    episodeNumber: 7,
    title: "Walking on Eggshells",
    patterns: [],
  },
  {
    id: "seeing-it-clearly",
    storyId: "dating",
    episodeNumber: 8,
    title: "Seeing It Clearly",
    patterns: [],
  },
];

/** Every episode summary for a story, in episode-number order. */
export function getStoryEpisodes(storyId: string): EpisodeSummary[] {
  const built: EpisodeSummary[] = Object.values(episodes)
    .filter((episode) => episode.storyId === storyId)
    .map((episode) => ({
      id: episode.id,
      storyId: episode.storyId,
      episodeNumber: episode.episodeNumber,
      title: episode.title.replace(/\n/g, " "),
      coverImage: episode.coverImage,
      patterns: episode.discoveredPatterns,
    }));

  return [
    ...built,
    ...upcomingEpisodes.filter((episode) => episode.storyId === storyId),
  ].sort((a, b) => a.episodeNumber - b.episodeNumber);
}

/** Id of the first not-yet-completed episode in the story, if any. */
export function getCurrentEpisodeId(
  storyId: string,
  completedEpisodeIds: string[]
): string | undefined {
  return getStoryEpisodes(storyId).find(
    (episode) => !completedEpisodeIds.includes(episode.id)
  )?.id;
}

/** How many of the story's episodes the user has completed. */
export function countCompletedEpisodes(
  storyId: string,
  completedEpisodeIds: string[]
): number {
  return getStoryEpisodes(storyId).filter((episode) =>
    completedEpisodeIds.includes(episode.id)
  ).length;
}
