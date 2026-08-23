import { Stack, router, useLocalSearchParams } from "expo-router";

import { ResponseSelectionScreen } from "@/components/ResponseSelectionScreen";
import { Text } from "@/lib/tw";
import { episodes } from "@/data/episodes";
import { useStoryStore } from "@/store/useStoryStore";

export default function EpisodeRespond() {
  const { episodeId } = useLocalSearchParams<{ episodeId: string }>();
  const episode = episodeId ? episodes[episodeId] : undefined;
  const setSelectedResponse = useStoryStore((state) => state.setSelectedResponse);

  if (!episode || !episode.decision) {
    return <Text className="flex-1 pt-20 text-center text-body-md">Episode not found.</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ResponseSelectionScreen
        episode={episode}
        onBack={() =>
          router.canGoBack()
            ? router.back()
            : router.replace(`/story/${episodeId}/video`)
        }
        onSelect={(option) => {
          setSelectedResponse(episodeId, option.id);
          router.push({
            pathname: "/story/[episodeId]/response-video",
            params: { episodeId, responseId: option.id },
          });
        }}
      />
    </>
  );
}
