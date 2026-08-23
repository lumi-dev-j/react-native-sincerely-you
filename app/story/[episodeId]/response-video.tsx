import { Stack, router, useLocalSearchParams } from "expo-router";

import { EpisodeVideoScreen } from "@/components/EpisodeVideoScreen";
import { Text } from "@/lib/tw";
import { episodes } from "@/data/episodes";

export default function EpisodeResponseVideo() {
  const { episodeId, responseId } = useLocalSearchParams<{
    episodeId: string;
    responseId: string;
  }>();
  const episode = episodeId ? episodes[episodeId] : undefined;
  const option = episode?.decision?.options.find((o) => o.id === responseId);

  if (!episode || !option) {
    return <Text className="flex-1 pt-20 text-center text-body-md">Episode not found.</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <EpisodeVideoScreen
        episode={episode}
        video={option.video}
        ctaLabel="See what you learned"
        onBack={() =>
          router.canGoBack()
            ? router.back()
            : router.replace(`/story/${episodeId}/respond`)
        }
        onCtaPress={() => router.push(`/story/${episodeId}/patterns`)}
      />
    </>
  );
}
