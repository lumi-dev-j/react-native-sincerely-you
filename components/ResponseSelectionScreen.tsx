import { Pressable, ScrollView, Text, View } from "@/lib/tw";

import type { Episode, ResponseOption } from "@/data/episodes";
import { Feather } from "@expo/vector-icons";
import { Image } from "@/lib/tw/image";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";
import { images } from "@/constants/images";
import { useState } from "react";

// Native aspect ratio of assets/images/reponse-card.png — the torn-paper
// texture already bakes in its own drop shadow, so cards just need to keep
// this ratio rather than carry an extra StyleSheet shadow.
const CARD_RATIO = 2135 / 736;

type ResponseSelectionScreenProps = {
  episode: Episode;
  onBack?: () => void;
  onSelect?: (option: ResponseOption) => void;
};

export function ResponseSelectionScreen({
  episode,
  onBack,
  onSelect,
}: ResponseSelectionScreenProps) {
  const decision = episode.decision;
  if (!decision) return null;

  return (
    <View className="flex-1 bg-paper">
      <Image
        source={images.responsePageBackground}
        className="absolute h-full w-full object-cover"
        pointerEvents="none"
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1 px-5 pt-2">
          {/* Header */}
          <Pressable
            className="h-10 w-10 items-center justify-center rounded-full bg-paper-light"
            style={styles.shadow}
            onPress={onBack}
            hitSlop={8}
          >
            <Feather name="chevron-left" size={20} color={colors.ink} />
          </Pressable>

          <ScrollView
            className="flex-1"
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Eyebrow + title */}
            <View className="items-center gap-3 pt-6">
              <View className="flex-row items-center gap-2">
                <View className="h-5 w-5 items-center justify-center rounded-md border border-burgundy">
                  <Feather name="heart" size={10} color={colors.burgundy} />
                </View>
                <Text
                  className="text-label text-burgundy"
                  style={{ letterSpacing: 1 }}
                >
                  EPISODE {String(episode.episodeNumber).padStart(2, "0")} ·{" "}
                  {episode.category.toUpperCase()}
                </Text>
              </View>
              <Text className="text-display text-center text-burgundy-dark">
                {decision.question}
              </Text>
              <Text className="text-center text-body-md text-ink-muted">
                {decision.subtext}
              </Text>

              <View className="flex-row items-center gap-2 pt-1">
                <View className="h-px w-10 bg-burgundy/40" />
                <Feather name="heart" size={10} color={colors.burgundy} />
                <View className="h-px w-10 bg-burgundy/40" />
              </View>
            </View>

            {/* Response cards */}
            <View className="pt-4">
              {decision.options.map((option, index) => (
                <ResponseCard
                  key={option.id}
                  text={option.text}
                  overlapPrevious={index > 0}
                  onPress={() => onSelect?.(option)}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

// The torn-paper texture carries its own transparent margin (top ~3%,
// bottom ~7% of the asset's height), so a plain layout gap of 0 still reads
// as a wide gap between cards. Pulling each card up with a negative margin,
// sized off its own rendered height, closes that baked-in whitespace so the
// torn edges sit right up against each other.
const CARD_OVERLAP_RATIO = 0.09;

function ResponseCard({
  text,
  overlapPrevious,
  onPress,
}: {
  text: string;
  overlapPrevious?: boolean;
  onPress?: () => void;
}) {
  const [cardHeight, setCardHeight] = useState(0);

  return (
    <Pressable
      onPress={onPress}
      className="w-full"
      style={{
        aspectRatio: CARD_RATIO,
        marginTop: overlapPrevious ? -cardHeight * CARD_OVERLAP_RATIO : 0,
      }}
      onLayout={(event) => setCardHeight(event.nativeEvent.layout.height)}
    >
      <Image
        source={images.responseCard}
        className="absolute h-full w-full object-fill"
        pointerEvents="none"
      />
      <View className="flex-1 flex-row items-center justify-between px-7">
        <Text className="flex-1 pr-4 text-h3 text-burgundy-dark">{text}</Text>
        <Feather name="chevron-right" size={20} color={colors.burgundyDark} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 24,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
});
