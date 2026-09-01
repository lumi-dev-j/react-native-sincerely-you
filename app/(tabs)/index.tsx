import { ScrollView, Text, View } from "@/lib/tw";

import { CategoryStoryRow } from "@/components/CategoryStoryRow";
import { FeaturedStoryCard } from "@/components/FeaturedStoryCard";
import { Image } from "@/lib/tw/image";
import { PatternHighlightCard } from "@/components/PatternHighlightCard";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { SectionTag } from "@/components/SectionTag";
import { Redirect, router } from "expo-router";
import {
  countCompletedEpisodes,
  getCurrentEpisodeId,
  getStoryEpisodes,
} from "@/data/episodes";
import { getMostRecentPattern } from "@/data/patterns";
import { images } from "@/constants/images";
import { storyCategories } from "@/data/stories";
import { useStoryStore } from "@/store/useStoryStore";

export default function Home() {
  const insets = useSafeAreaInsets();
  const hasCompletedOnboarding = useStoryStore(
    (state) => state.hasCompletedOnboarding
  );
  const completedEpisodeIds = useStoryStore((state) => state.completedEpisodeIds);
  const recentPattern = getMostRecentPattern(completedEpisodeIds);

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  const datingEpisodes = getStoryEpisodes("dating");
  const currentEpisodeId = getCurrentEpisodeId("dating", completedEpisodeIds);
  const currentEpisode =
    datingEpisodes.find((episode) => episode.id === currentEpisodeId) ??
    datingEpisodes[datingEpisodes.length - 1];

  return (
    <View className="flex-1 bg-paper">
      {/* Very subtle paper-grain texture over the flat screen background.
          The grain's own alpha channel is already faint (~8% max), so no
          extra opacity is layered on top. */}
      <Image
        source={images.paperGrain}
        className="absolute h-full w-full object-cover"
        pointerEvents="none"
      />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="gap-1 px-5 pt-3">
            <Text className="text-h1 text-ink">Welcome back.</Text>
            <Text className="text-body-md text-ink-muted">
              Your story is waiting.
            </Text>
          </View>

          {/* Featured story */}
          <View className="px-5 pt-3">
            <FeaturedStoryCard
              category="Dating"
              episodeNumber={currentEpisode.episodeNumber}
              episodeTitle={currentEpisode.title}
              durationMinutes={6}
              sceneImage={currentEpisode.heroImage ?? currentEpisode.coverImage}
              onContinue={() => router.push(`/story/${currentEpisode.id}`)}
            />
          </View>

          {/* Your stories */}
          <View className="gap-2 px-5 pt-5">
            <SectionTag>Your stories</SectionTag>
            <View className="gap-0.5">
              {storyCategories.map((category) => (
                <CategoryStoryRow
                  key={category.id}
                  title={category.title}
                  icon={category.icon}
                  accentClass={category.accentClass}
                  status={
                    category.status.kind === "in-progress"
                      ? {
                          kind: "in-progress",
                          completed: countCompletedEpisodes(
                            category.id,
                            completedEpisodeIds
                          ),
                          total: category.status.total,
                        }
                      : category.status
                  }
                  onPress={
                    category.status.kind === "in-progress"
                      ? () => router.push(`/story-detail/${category.id}`)
                      : undefined
                  }
                />
              ))}
            </View>
          </View>

          {/* Recently discovered */}
          {recentPattern ? (
            <View className="pt-5">
              <View className="px-5">
                <SectionTag>Recently discovered</SectionTag>
              </View>
              {/* The pattern-card art has a baked-in ~1.8% transparent margin
                  on each side, so px-5 alone would leave the visible card
                  narrower than the rows/tabs above and below it. It also has
                  a ~4% transparent margin on top, so pull the card up
                  slightly to tighten the visual gap below the tag. */}
              <View className="-mt-0.5 px-3.5">
                <PatternHighlightCard
                  title={recentPattern.title}
                  description={recentPattern.description}
                  patternImage={recentPattern.image}
                />
              </View>
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
