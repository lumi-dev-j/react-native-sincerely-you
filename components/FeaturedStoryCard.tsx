import { Pressable, Text, View } from "@/lib/tw";

import { Feather } from "@expo/vector-icons";
import type { ImageSourcePropType } from "react-native";
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
      {/* Scene slot sits behind the card art and shows through its die-cut opening */}
      <View className="absolute left-[6.8%] top-[10.7%] h-[33.7%] w-[85.2%] overflow-hidden rounded-sm bg-paper">
        {sceneImage ? (
          <Image source={sceneImage} className="h-full w-full object-cover" />
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
