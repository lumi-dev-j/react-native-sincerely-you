import { Stack, router, useLocalSearchParams } from "expo-router";

import { EpisodeContextScreen } from "@/components/EpisodeContextScreen";
import { Text } from "@/lib/tw";
import { episodes } from "@/data/episodes";

export default function EpisodeContext() {
  const { episodeId } = useLocalSearchParams<{ episodeId: string }>();
  const episode = episodeId ? episodes[episodeId] : undefined;

  if (!episode) {
    return <Text className="flex-1 pt-20 text-center text-body-md">Episode not found.</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <EpisodeContextScreen
        episode={episode}
        onBack={() => router.back()}
        onBeginStory={() => router.push(`/story/${episodeId}/video`)}
      />
    </>
  );
}
