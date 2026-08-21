import type { ImageSourcePropType } from "react-native";

export type EpisodeCompletion = {
  nextEpisode: {
    /** Route id for the next episode; undefined if it isn't built yet. */
    episodeId?: string;
    episodeNumber: number;
    /** Rendered as-is, so a literal "\n" controls the line break. */
    titleLine: string;
    description: string;
    /** Leave unset to show a placeholder slot until the art exists. */
    thumbnail?: ImageSourcePropType;
  };
};

export const episodeCompletions: Record<string, EpisodeCompletion> = {
  "too-good-to-be-true": {
    nextEpisode: {
      episodeNumber: 2,
      titleLine: "Friday night...",
      description: "Maya meets your\nclosest friends.",
    },
  },
};
