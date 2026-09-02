import { Pressable, Text, View } from "@/lib/tw";
import { useEffect, useState } from "react";

import { Feather } from "@expo/vector-icons";
import { Image } from "@/lib/tw/image";
import { PatternDeck } from "@/components/PatternDeck";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";
import { getUnlockedPatterns } from "@/data/patterns";
import { images } from "@/constants/images";
import { router, useLocalSearchParams } from "expo-router";
import { useStoryStore } from "@/store/useStoryStore";

export default function Patterns() {
  const insets = useSafeAreaInsets();
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
    <View className="flex-1 bg-paper">
      <Image
        source={images.paperGrain}
        className="absolute h-full w-full object-cover"
        pointerEvents="none"
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View className="gap-1 px-5 pt-3">
          <Text className="text-h1 text-ink">Patterns</Text>
          <Text className="text-hint text-ink-muted">
            Every pattern you&apos;ve uncovered, gathered in one place.
          </Text>
        </View>

        <View className="px-5 pt-4">
          <Feather name="heart" size={22} color={colors.burgundy} />
        </View>

        {patterns.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <View className="items-center pt-4">
              <Text
                className="text-label text-burgundy"
                style={{ letterSpacing: 1 }}
              >
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(patterns.length).padStart(2, "0")}
              </Text>
            </View>

            <View className="flex-1 justify-center">
              <PatternDeck
                patterns={patterns}
                activeIndex={activeIndex}
                onActiveIndexChange={setActiveIndex}
              />
            </View>

            <DeckNav
              activeIndex={activeIndex}
              total={patterns.length}
              onChange={setActiveIndex}
              bottomInset={insets.bottom}
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
  bottomInset,
}: {
  activeIndex: number;
  total: number;
  onChange: (index: number) => void;
  bottomInset: number;
}) {
  const canGoPrevious = activeIndex > 0;
  const canGoNext = activeIndex < total - 1;

  return (
    <View
      className="flex-row items-center justify-center gap-6 pt-6"
      style={{ paddingBottom: bottomInset + 96 }}
    >
      <Pressable
        className="flex-row items-center gap-2"
        style={{ opacity: canGoPrevious ? 1 : 0.35 }}
        onPress={() => canGoPrevious && onChange(activeIndex - 1)}
        disabled={!canGoPrevious}
        hitSlop={8}
      >
        <Feather name="arrow-left" size={16} color={colors.burgundyDark} />
        <Text className="text-link text-burgundy-dark">Previous</Text>
      </Pressable>

      <View className="h-4 w-px bg-border" />

      <Pressable
        className="flex-row items-center gap-2"
        style={{ opacity: canGoNext ? 1 : 0.35 }}
        onPress={() => canGoNext && onChange(activeIndex + 1)}
        disabled={!canGoNext}
        hitSlop={8}
      >
        <Text className="text-link text-burgundy-dark">Next</Text>
        <Feather name="arrow-right" size={16} color={colors.burgundyDark} />
      </Pressable>
    </View>
  );
}

function EmptyState() {
  return (
    <View className="flex-1 items-center justify-center px-5 pb-24">
      <View
        className="w-full items-center gap-3 rounded-2xl bg-paper-light px-6 py-8"
        style={styles.shadow}
      >
        <Image
          source={images.emptyPattern}
          className="h-16 w-16 object-contain"
        />
        <Text className="pt-1 text-center text-h3 text-ink">
          Your first pattern is waiting
        </Text>
        <Text className="text-center text-body-md text-ink-muted">
          Play through a story and learn to spot the subtle signs.
        </Text>
        <Pressable
          className="mt-2 flex-row items-center gap-1.5"
          onPress={() => router.push("/story-detail/dating")}
          hitSlop={8}
        >
          <Text className="text-link text-burgundy">Start discovering</Text>
          <Feather name="arrow-right" size={14} color={colors.burgundy} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
});
