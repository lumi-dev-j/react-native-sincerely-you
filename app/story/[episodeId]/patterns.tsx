import { Stack, router, useLocalSearchParams } from "expo-router";

import { PatternRevealScreen } from "@/components/PatternRevealScreen";
import { Text } from "@/lib/tw";
import { episodes } from "@/data/episodes";
import { patternReveals } from "@/data/patterns";
import { useStoryStore } from "@/store/useStoryStore";

export default function EpisodePatterns() {
  const { episodeId } = useLocalSearchParams<{ episodeId: string }>();
  const episode = episodeId ? episodes[episodeId] : undefined;
  const reveal = episodeId ? patternReveals[episodeId] : undefined;
  const selectedResponseId = useStoryStore((state) =>
    episodeId ? state.selectedResponses[episodeId] : undefined
  );

  if (!episode || !reveal) {
    return <Text className="flex-1 pt-20 text-center text-body-md">Episode not found.</Text>;
  }

  const selectedOption = episode.decision?.options.find(
    (option) => option.id === selectedResponseId
  );
  const reflection = reveal.responses?.find(
    (response) => response.id === selectedResponseId
  )?.reflection;
  const yourResponse =
    selectedOption && reflection
      ? { text: selectedOption.text, reflection }
      : undefined;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <PatternRevealScreen
        reveal={reveal}
        yourResponse={yourResponse}
        onBack={() =>
          router.canGoBack()
            ? router.back()
            : router.replace(`/story/${episodeId}/video`)
        }
        onContinue={() => router.push(`/story/${episodeId}/complete`)}
      />
    </>
  );
}
