import type { ImageSourcePropType } from "react-native";

export type EpisodeCompletion = {
  nextEpisode: {
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
  "friday-night": {
    nextEpisode: {
      episodeNumber: 3,
      titleLine: "The Little Things",
      description: "Small comments start to\nmake Jimmy second-guess himself.",
    },
  },
};
