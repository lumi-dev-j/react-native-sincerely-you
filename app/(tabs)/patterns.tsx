import { Pressable, Text, View } from "@/lib/tw";
import { useEffect, useState } from "react";

import { Feather } from "@expo/vector-icons";
import { Image } from "@/lib/tw/image";
import { PatternDeck } from "@/components/PatternDeck";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";
import { colors } from "@/constants/colors";
import { getUnlockedPatterns } from "@/data/patterns";
import { images } from "@/constants/images";
import { router, useLocalSearchParams } from "expo-router";
import { useStoryStore } from "@/store/useStoryStore";

export default function Patterns() {
  const { height: windowHeight } = useWindowDimensions();
  const completedEpisodeIds = useStoryStore(
    (state) => state.completedEpisodeIds
  );
  const patterns = getUnlockedPatterns(completedEpisodeIds);

  // Deep-linked from the home screen's "Recently discovered" card, e.g.
  // /patterns?pattern=boundary-testing — opens the deck centered on it.
  const { pattern: selectedPatternId } = useLocalSearchParams<{
    pattern?: string;
  }>();
  const [activeIndex, setActiveIndex] = useState(() => {
    const index = patterns.findIndex((p) => p.id === selectedPatternId);
    return index >= 0 ? index : 0;
  });

  useEffect(() => {
    if (!selectedPatternId) return;
    const index = patterns.findIndex((p) => p.id === selectedPatternId);
    if (index >= 0) setActiveIndex(index);
    // Only react to the param changing (a fresh navigation), not to every
    // re-render of the patterns list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPatternId]);

  return (
    <View className="flex-1 bg-ink">
      <Image
        source={images.updatedPatternsBackground}
        className="absolute h-full w-full object-cover"
        pointerEvents="none"
      />
      <SafeAreaView style={{ flex: 1, overflow: "visible" }}>
        <View className="gap-1 px-5 pt-2">
          <Text className="text-h2 text-burgundy-dark">Patterns</Text>
          {/* Hard-broken at the same point as the reference, rather than
              left to wrap — a wider device would otherwise pull this onto
              one long line. */}
          <Text
            className="max-w-[78%] text-hint text-ink"
            style={{ fontSize: 13, lineHeight: 18 }}
          >
            {"Every pattern you've uncovered,\ngathered in one place."}
          </Text>
        </View>

        <View className="px-5 pt-2">
          <Feather name="heart" size={16} color={colors.burgundy} />
        </View>

        {patterns.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* A fixed fraction of window height, not flex-1 — flex-1 fills
                *whatever* space the (now smaller) elements below leave
                over, which pushed the deck down as those elements shrank
                instead of moving it up. Pinning this to the window height
                keeps the deck's position predictable and keeps the
                background dominant above it, while still scaling with
                the device rather than a hardcoded pixel value. */}
            <View style={{ height: windowHeight * 0.06 }} />

            <PatternDeck
              patterns={patterns}
              activeIndex={activeIndex}
              onActiveIndexChange={setActiveIndex}
            />

            <DeckNav
              activeIndex={activeIndex}
              total={patterns.length}
              onChange={setActiveIndex}
            />
          </>
        )}
      </SafeAreaView>
    </View>
  );
}

function DeckNav({
  activeIndex,
  total,
  onChange,
}: {
  activeIndex: number;
  total: number;
  onChange: (index: number) => void;
}) {
  const canGoPrevious = activeIndex > 0;
  const canGoNext = activeIndex < total - 1;

  return (
    <View
      className="flex-row items-center justify-center gap-8 pt-3"
      style={{ paddingBottom: 66 }}
    >
      <Pressable
        className="flex-row items-center gap-1.5"
        style={{ opacity: canGoPrevious ? 1 : 0.35 }}
        onPress={() => canGoPrevious && onChange(activeIndex - 1)}
        disabled={!canGoPrevious}
        hitSlop={8}
      >
        <Feather name="arrow-left" size={14} color={colors.roseDust} />
        <Text
          className="font-sans-medium"
          style={{ color: colors.roseDust, fontSize: 14, lineHeight: 18 }}
        >
          Previous
        </Text>
      </Pressable>

      <View className="h-5 w-px bg-rose-dust/70" />

      <Pressable
        className="flex-row items-center gap-1.5"
        style={{ opacity: canGoNext ? 1 : 0.35 }}
        onPress={() => canGoNext && onChange(activeIndex + 1)}
        disabled={!canGoNext}
        hitSlop={8}
      >
        <Text
          className="font-sans-medium"
          style={{ color: colors.roseDust, fontSize: 14, lineHeight: 18 }}
        >
          Next
        </Text>
        <Feather name="arrow-right" size={14} color={colors.roseDust} />
      </Pressable>
    </View>
  );
}

const EMPTY_COPY = "#F3E2A6";
const EMPTY_CTA = "#E8B4B4";

function EmptyState() {
  return (
    <View className="flex-1 items-center justify-center px-8 pb-24">
      <View className="items-center" style={{ marginTop: 140 }}>
        <Image
          source={images.emptyPatternsIcon}
          className="h-[101px] w-[101px] object-contain"
        />
        <Text
          className="mt-6 text-center text-h1"
          style={{ color: EMPTY_COPY }}
        >
          No Patterns Yet
        </Text>
        <Text
          className="mt-3 max-w-[280px] text-center font-serif"
          style={{ color: EMPTY_COPY, fontSize: 16, lineHeight: 22 }}
        >
          They&apos;ll appear here as you move through the story.
        </Text>
        <Pressable
          className="mt-8 items-center"
          onPress={() => router.push("/story-detail/dating")}
          hitSlop={8}
        >
          <View className="flex-row items-center gap-1.5">
            <Text className="text-link" style={{ color: EMPTY_CTA }}>
              Continue story
            </Text>
            <Feather name="arrow-right" size={14} color={EMPTY_CTA} />
          </View>
          <View
            className="mt-1.5 h-px w-14"
            style={{ backgroundColor: EMPTY_CTA }}
          />
        </Pressable>
      </View>
    </View>
  );
}
