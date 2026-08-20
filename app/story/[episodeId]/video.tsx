import { Stack, router, useLocalSearchParams } from "expo-router";

import { EpisodeVideoScreen } from "@/components/EpisodeVideoScreen";
import { Text } from "@/lib/tw";
import { episodes } from "@/data/episodes";

export default function EpisodeVideo() {
  const { episodeId } = useLocalSearchParams<{ episodeId: string }>();
  const episode = episodeId ? episodes[episodeId] : undefined;

  if (!episode) {
    return <Text className="flex-1 pt-20 text-center text-body-md">Episode not found.</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <EpisodeVideoScreen
        episode={episode}
        onBack={() => router.back()}
        onSeeWhatYouLearned={() => router.push(`/story/${episodeId}/patterns`)}
      />
    </>
  );
}
