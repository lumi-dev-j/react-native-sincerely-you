import { Stack, router, useLocalSearchParams } from "expo-router";

import { EpisodeCompleteScreen } from "@/components/EpisodeCompleteScreen";
import { Text } from "@/lib/tw";
import { episodeCompletions } from "@/data/episodeCompletions";
import { episodes } from "@/data/episodes";
import { patternReveals } from "@/data/patterns";

export default function EpisodeComplete() {
  const { episodeId } = useLocalSearchParams<{ episodeId: string }>();
  const episode = episodeId ? episodes[episodeId] : undefined;
  const completion = episodeId ? episodeCompletions[episodeId] : undefined;
  const reveal = episodeId ? patternReveals[episodeId] : undefined;

  if (!episode || !completion || !reveal) {
    return <Text className="flex-1 pt-20 text-center text-body-md">Episode not found.</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <EpisodeCompleteScreen
        episode={episode}
        patternsDiscovered={reveal.patterns.map((pattern) => pattern.title)}
        nextEpisode={completion.nextEpisode}
        onBack={() => router.back()}
        onContinue={() => {
          const { episodeId: nextEpisodeId } = completion.nextEpisode;
          if (nextEpisodeId) {
            router.push(`/story/${nextEpisodeId}`);
          }
          // Next episode isn't built yet otherwise — wire this up once it exists.
        }}
        onBackToJourney={() => router.push("/")}
      />
    </>
  );
}
