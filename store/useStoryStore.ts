import { useEffect, useState } from "react";
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
  /** Whether the user has made it through the onboarding screen. */
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
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
      hasCompletedOnboarding: false,
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
    }),
    {
      name: "story-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

/**
 * `persist` restores state from AsyncStorage asynchronously, so on first
 * render the store is still holding its default values. Screens that
 * redirect based on persisted state (e.g. onboarding) must wait for this
 * to be true before making that decision.
 */
export function useStoryStoreHydrated() {
  const [hasHydrated, setHasHydrated] = useState(
    useStoryStore.persist.hasHydrated()
  );

  useEffect(() => {
    setHasHydrated(useStoryStore.persist.hasHydrated());
    return useStoryStore.persist.onFinishHydration(() => setHasHydrated(true));
  }, []);

  return hasHydrated;
}
