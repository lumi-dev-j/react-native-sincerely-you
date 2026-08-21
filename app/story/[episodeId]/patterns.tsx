import { Stack, router, useLocalSearchParams } from "expo-router";

import { PatternRevealScreen } from "@/components/PatternRevealScreen";
import { Text } from "@/lib/tw";
import { patternReveals } from "@/data/patterns";

export default function EpisodePatterns() {
  const { episodeId } = useLocalSearchParams<{ episodeId: string }>();
  const reveal = episodeId ? patternReveals[episodeId] : undefined;

  if (!reveal) {
    return <Text className="flex-1 pt-20 text-center text-body-md">Episode not found.</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <PatternRevealScreen
        reveal={reveal}
        onBack={() => router.back()}
        onContinue={() => router.push(`/story/${episodeId}/complete`)}
      />
    </>
  );
}
