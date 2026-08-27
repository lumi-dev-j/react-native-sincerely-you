import { Pressable, Text, View } from "@/lib/tw";

import { Feather } from "@expo/vector-icons";
import type { ImageSourcePropType } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "@/lib/tw/image";
import { colors } from "@/constants/colors";
import { images } from "@/constants/images";

// Native aspect ratio of assets/images/top-card.png, so the card scales
// responsively while keeping the die-cut photo opening lined up.
const CARD_RATIO = 1536 / 1024;

type FeaturedStoryCardProps = {
  category: string;
  episodeNumber: number;
  episodeTitle: string;
  durationMinutes: number;
  /** Scene image for the die-cut photo opening. Leave unset for a blank slot. */
  sceneImage?: ImageSourcePropType;
  onContinue?: () => void;
};

export function FeaturedStoryCard({
  category,
  episodeNumber,
  episodeTitle,
  durationMinutes,
  sceneImage,
  onContinue,
}: FeaturedStoryCardProps) {
  return (
    // Full content width, matching the mock — the card's rendered height
    // simply follows from CARD_RATIO. Tilted a couple of degrees
    // counter-clockwise to read as a loosely placed photo, matching the mock.
    <View
      className="w-full"
      style={{ aspectRatio: CARD_RATIO, transform: [{ rotate: "-3deg" }] }}
    >
      {/* Scene slot sits behind the card art and shows through its die-cut
          opening. Sized/positioned with StyleSheet, not NativeWind percentage
          classes — the die-cut opening must line up pixel-precisely with
          top-card.png's transparent window, and contentFit is set directly
          on the Image so the fill mode can't silently fail to apply. */}
      <View style={styles.sceneSlot}>
        {sceneImage ? (
          <Image
            source={sceneImage}
            contentFit="cover"
            style={StyleSheet.absoluteFill}
          />
        ) : null}
      </View>

      <Image
        source={images.topCard}
        className="absolute h-full w-full object-contain"
        pointerEvents="none"
      />

      {/* Clipped to the card's paper region so long content can never bleed
          into whatever renders below the card. Anchored to the top so any
          overflow trims from the bottom rather than slicing through a line.
          shrink-0 on every child stops the web flexbox default (shrink: 1)
          from squeezing text below its natural size. */}
      <View className="absolute left-[11%] right-[26%] top-[47%] bottom-[1%] gap-1 overflow-hidden">
        <Text
          className="shrink-0 text-label text-burgundy"
          style={{ letterSpacing: 0.8 }}
        >
          {category.toUpperCase()} · CURRENT EPISODE
        </Text>
        <Text className="shrink-0 text-h3 text-ink" numberOfLines={2}>
          Episode {String(episodeNumber).padStart(2, "0")} — {episodeTitle}
        </Text>
        <Text className="shrink-0 text-body-sm text-ink-muted">
          {durationMinutes} min
        </Text>
        <View className="my-0.5 h-0.5 w-6 shrink-0 rounded-full bg-burgundy/70" />
        <Pressable
          className="shrink-0 flex-row items-center gap-1.5"
          onPress={onContinue}
          hitSlop={8}
        >
          <Text className="text-link text-burgundy">Continue episode</Text>
          <Feather name="arrow-right" size={14} color={colors.burgundy} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Sized/positioned with StyleSheet rather than NativeWind percentage
  // classes so contentFit="cover" below is guaranteed to apply. top/height
  // are nudged above top-card.png's coded die-cut opening (10.7%/33.7%) —
  // the rendered opening sits ~3.4% of card height higher than that, so the
  // original values left a visible paper-colored band above the photo.
  sceneSlot: {
    position: "absolute",
    left: "6.8%",
    top: "6.7%",
    height: "37.7%",
    width: "85.2%",
    overflow: "hidden",
    borderRadius: 2,
    backgroundColor: colors.paper,
  },
});
