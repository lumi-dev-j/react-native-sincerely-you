import { Stack, router, useLocalSearchParams } from "expo-router";

import { StoryDetailScreen } from "@/components/StoryDetailScreen";
import { Text } from "@/lib/tw";
import { getCurrentEpisodeId, getStoryEpisodes } from "@/data/episodes";
import { storyCategories } from "@/data/stories";
import { useStoryStore } from "@/store/useStoryStore";

/** Story-arc copy for each story id — the episode roster itself comes from data/episodes.ts. */
const STORY_META: Record<string, { category: string; title: string }> = {
  dating: { category: "Dating", title: "Something Feels Off" },
};

export default function StoryDetail() {
  const { storyId } = useLocalSearchParams<{ storyId: string }>();
  const meta = storyId ? STORY_META[storyId] : undefined;
  const storyCategory = storyId
    ? storyCategories.find((category) => category.id === storyId)
    : undefined;
  const completedEpisodeIds = useStoryStore((state) => state.completedEpisodeIds);

  if (
    !storyId ||
    !meta ||
    !storyCategory ||
    storyCategory.status.kind !== "in-progress"
  ) {
    return (
      <Text className="flex-1 pt-20 text-center text-body-md">Story not found.</Text>
    );
  }

  const episodes = getStoryEpisodes(storyId);
  const currentEpisodeId = getCurrentEpisodeId(storyId, completedEpisodeIds);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StoryDetailScreen
        category={meta.category}
        title={meta.title}
        episodes={episodes}
        currentEpisodeId={currentEpisodeId}
        completedEpisodeIds={completedEpisodeIds}
        totalEpisodes={storyCategory.status.total}
        onBack={() => (router.canGoBack() ? router.back() : router.replace("/"))}
        onSelectEpisode={(episodeId) => router.push(`/story/${episodeId}`)}
      />
    </>
  );
}
