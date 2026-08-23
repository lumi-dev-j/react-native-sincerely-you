import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import AsyncStorage from "@react-native-async-storage/async-storage";

type StoryState = {
  /** Id of the response option the user picked, keyed by episode id. */
  selectedResponses: Record<string, string>;
  setSelectedResponse: (episodeId: string, responseId: string) => void;
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
    }),
    {
      name: "story-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
