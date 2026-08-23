import { Stack, router, useLocalSearchParams } from "expo-router";

import { EpisodeCompleteScreen } from "@/components/EpisodeCompleteScreen";
import { Text } from "@/lib/tw";
import { episodeCompletions } from "@/data/episodeCompletions";
import { episodes } from "@/data/episodes";

export default function EpisodeComplete() {
  const { episodeId } = useLocalSearchParams<{ episodeId: string }>();
  const episode = episodeId ? episodes[episodeId] : undefined;
  const completion = episodeId ? episodeCompletions[episodeId] : undefined;

  if (!episode || !completion) {
    return <Text className="flex-1 pt-20 text-center text-body-md">Episode not found.</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <EpisodeCompleteScreen
        episode={episode}
        patternsDiscovered={episode.discoveredPatterns}
        nextEpisode={completion.nextEpisode}
        onBack={() =>
          router.canGoBack()
            ? router.back()
            : router.replace(`/story/${episodeId}/patterns`)
        }
        onContinue={() => {
          if (episode.nextEpisodeId) {
            router.push(`/story/${episode.nextEpisodeId}`);
          }
        }}
        onBackToHome={() => router.push("/")}
      />
    </>
  );
}
