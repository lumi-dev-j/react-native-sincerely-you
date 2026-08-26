import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import AsyncStorage from "@react-native-async-storage/async-storage";

type StoryState = {
  /** Id of the response option the user picked, keyed by episode id. */
  selectedResponses: Record<string, string>;
  setSelectedResponse: (episodeId: string, responseId: string) => void;
  /** Ids of episodes the user has finished, across all stories. */
  completedEpisodeIds: string[];
  completeEpisode: (episodeId: string) => void;
};

export const useStoryStore = create<StoryState>()(
  persist(
    (set) => ({
      selectedResponses: {},
      setSelectedResponse: (episodeId, responseId) =>
        set((state) => ({
          selectedResponses: {
            ...state.selectedResponses,
            [episodeId]: responseId,
          },
        })),
      completedEpisodeIds: [],
      completeEpisode: (episodeId) =>
        set((state) =>
          state.completedEpisodeIds.includes(episodeId)
            ? state
            : {
                completedEpisodeIds: [...state.completedEpisodeIds, episodeId],
              }
        ),
    }),
    {
      name: "story-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
