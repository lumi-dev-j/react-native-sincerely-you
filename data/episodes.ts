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
  /** Scene image for the home page's featured/hero card. Falls back to coverImage when unset. */
  heroImage?: ImageSourcePropType;
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
    heroImage: images.episode1HeroCard,
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
    heroImage: images.episode2HeroCard,
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
  "the-little-things": {
    id: "the-little-things",
    storyId: "dating",
    category: "Dating",
    episodeNumber: 3,
    title: "The Little Things",
    coverImage: images.episode3Scene,
    heroImage: images.episode3HeroCard,
    video: {
      uri: "https://pub-c2198be740204535b80c982140941694.r2.dev/dating/episode-3.mp4",
    },
    contextIntro: {
      emphasis: "Jimmy and Taylor",
      rest: " are getting ready\nto meet her friends.",
    },
    contextHook:
      "One small comment makes Jimmy\nlook at himself a little differently.",
    contextHookEmphasis: "Jimmy",
    discoveredPatterns: (
      patternReveals["the-little-things"]?.patterns ?? []
    ).map((pattern) => pattern.title),
    decision: {
      question: "What would you say?",
      subtext: "Taylor just made a comment about what Jimmy's wearing.",
      prompt: "Choose what Jimmy says next.",
      promptEmphasis: "next.",
      options: [
        {
          id: "response-1",
          text: "No, it's fine. Maybe I do play it a little safe.",
          video: {
            uri: "https://pub-c2198be740204535b80c982140941694.r2.dev/dating/reponses/episode-3-a.mp4",
          },
        },
        {
          id: "response-2",
          text: "Okay… what do you think I should wear instead?",
          video: {
            uri: "https://pub-c2198be740204535b80c982140941694.r2.dev/dating/reponses/episode-3-b.mp4",
          },
        },
        {
          id: "response-3",
          text: "Hey, I like this shirt. You're just going to have to deal with it.",
          video: {
            uri: "https://pub-c2198be740204535b80c982140941694.r2.dev/dating/reponses/episode-3-c.mp4",
          },
        },
        {
          id: "response-4",
          text: "I know you're joking, but that made me feel self-conscious.",
          video: {
            uri: "https://pub-c2198be740204535b80c982140941694.r2.dev/dating/reponses/episode-3-d.mp4",
          },
        },
      ],
    },
    nextEpisodeId: "mixed-signals",
  },
  "mixed-signals": {
    id: "mixed-signals",
    storyId: "dating",
    category: "Dating",
    episodeNumber: 4,
    title: "Mixed Signals",
    coverImage: images.episode4Scene,
    heroImage: images.episode4HeroCard,
    video: {
      uri: "https://pub-c2198be740204535b80c982140941694.r2.dev/dating/episode-4.mp4",
    },
    contextIntro: {
      emphasis: "Jimmy and Taylor",
      rest: " have been\ngetting closer.",
    },
    contextHook: "Some days, that closeness\nfeels harder to read.",
    discoveredPatterns: (patternReveals["mixed-signals"]?.patterns ?? []).map(
      (pattern) => pattern.title
    ),
    nextEpisodeId: "the-silent-treatment",
  },
  "the-silent-treatment": {
    id: "the-silent-treatment",
    storyId: "dating",
    category: "Dating",
    episodeNumber: 5,
    title: "The Quiet After",
    coverImage: images.episode5Scene,
    heroImage: images.episode5HeroCard,
    video: {
      uri: "https://pub-c2198be740204535b80c982140941694.r2.dev/dating/episode-5.mp4",
    },
    contextIntro: {
      emphasis: "Jimmy and Taylor",
      rest: " had\na disagreement last night.",
    },
    contextHook: "Today, Taylor barely\nspeaks to him.",
    discoveredPatterns: (
      patternReveals["the-silent-treatment"]?.patterns ?? []
    ).map((pattern) => pattern.title),
    decision: {
      question: "What would you say?",
      subtext: "Taylor has barely spoken to Jimmy all day.",
      prompt: "Choose what Jimmy says next.",
      promptEmphasis: "next.",
      options: [
        {
          id: "response-1",
          text: "Okay… did I do something wrong?",
          video: {
            uri: "https://pub-c2198be740204535b80c982140941694.r2.dev/dating/reponses/episode-5-a.mp4",
          },
        },
        {
          id: "response-2",
          text: "I'm sorry I went out. I didn't mean to make you feel unimportant.",
          video: {
            uri: "https://pub-c2198be740204535b80c982140941694.r2.dev/dating/reponses/episode-5-b.mp4",
          },
        },
        {
          id: "response-3",
          text: "Fine. If you don't want to talk, I won't either.",
          video: {
            uri: "https://pub-c2198be740204535b80c982140941694.r2.dev/dating/reponses/episode-5-c.mp4",
          },
        },
        {
          id: "response-4",
          text: "I'm happy to talk if something's bothering you, but I'm not going to keep guessing.",
          video: {
            uri: "https://pub-c2198be740204535b80c982140941694.r2.dev/dating/reponses/episode-5-d.mp4",
          },
        },
      ],
    },
    nextEpisodeId: "disappearing-act",
  },
  "disappearing-act": {
    id: "disappearing-act",
    storyId: "dating",
    category: "Dating",
    episodeNumber: 6,
    title: "Off Course",
    coverImage: images.episode6Scene,
    heroImage: images.episode6HeroCard,
    video: {
      uri: "https://pub-c2198be740204535b80c982140941694.r2.dev/dating/episode-6.mp4",
    },
    contextIntro: {
      emphasis: "Jimmy",
      rest: " has a big day\nahead of him.",
    },
    contextHook: "Taylor wants to be\npart of the moment.\n\nBut…",
    contextHookEmphasis: "Taylor",
    discoveredPatterns: (
      patternReveals["disappearing-act"]?.patterns ?? []
    ).map((pattern) => pattern.title),
    decision: {
      question: "What would you say?",
      subtext: "Taylor wants to be part of Jimmy's big day.",
      prompt: "Choose what Jimmy says next.",
      promptEmphasis: "next.",
      options: [
        {
          id: "response-1",
          text: "Maybe you're right. I'm sorry.",
          video: {
            uri: "https://pub-c2198be740204535b80c982140941694.r2.dev/dating/reponses/episode-6-a.mp4",
          },
        },
        {
          id: "response-2",
          text: "That's not fair. You're making me sound controlling.",
          video: {
            uri: "https://pub-c2198be740204535b80c982140941694.r2.dev/dating/reponses/episode-6-b.mp4",
          },
        },
        {
          id: "response-3",
          text: "Forget it. It doesn't matter.",
          video: {
            uri: "https://pub-c2198be740204535b80c982140941694.r2.dev/dating/reponses/episode-6-c.mp4",
          },
        },
        {
          id: "response-4",
          text: "I'm not asking for an immediate response. I was just disappointed.",
          video: {
            uri: "https://pub-c2198be740204535b80c982140941694.r2.dev/dating/reponses/episode-6-d.mp4",
          },
        },
      ],
    },
    nextEpisodeId: "walking-on-eggshells",
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
  /** Scene image for the home page's featured/hero card. Falls back to coverImage when unset. */
  heroImage?: ImageSourcePropType;
  patterns: string[];
};

/**
 * Episodes that are part of the story but don't have a built playable flow
 * yet — roster info only, so the Story Detail screen can list them as
 * upcoming/locked without fabricating story content that doesn't exist.
 */
const upcomingEpisodes: EpisodeSummary[] = [
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
      heroImage: episode.heroImage,
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
