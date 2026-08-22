import { Pressable, Text, View } from "@/lib/tw";

import { Feather } from "@expo/vector-icons";
import type { ImageSourcePropType } from "react-native";
import { Image } from "@/lib/tw/image";
import { colors } from "@/constants/colors";
import { images } from "@/constants/images";

// Native aspect ratio of assets/images/bottom-card.png.
const CARD_RATIO = 1974 / 797;

type PatternHighlightCardProps = {
  title: string;
  description: string;
  ctaLabel?: string;
  /** Scene image for the polaroid opening. Leave unset for a blank slot. */
  sceneImage?: ImageSourcePropType;
  onPress?: () => void;
};

export function PatternHighlightCard({
  title,
  description,
  ctaLabel = "Explore pattern",
  sceneImage,
  onPress,
}: PatternHighlightCardProps) {
  return (
    // Full content width, matching the "Your Stories" rows.
    <View className="w-full" style={{ aspectRatio: CARD_RATIO }}>
      {/* Scene slot sits behind the card art and shows through the polaroid opening */}
      <View className="absolute left-[5%] top-[18.6%] h-[59.1%] w-[25.8%] overflow-hidden rounded-sm bg-paper">
        {sceneImage ? (
          <Image source={sceneImage} className="h-full w-full object-cover" />
        ) : null}
      </View>

      <Image
        source={images.bottomCard}
        className="absolute h-full w-full object-contain"
        pointerEvents="none"
      />

      {/* Clipped to the card's paper region so long content can never bleed
          into whatever renders below the card. Anchored to the top so any
          overflow trims from the bottom rather than slicing through a line.
          shrink-0 on every child stops the web flexbox default (shrink: 1)
          from squeezing text below its natural size. */}
      <View className="absolute left-[36%] right-[8%] top-[8%] bottom-[4%] gap-2 overflow-hidden">
        <Text className="shrink-0 text-h3 text-ink" numberOfLines={1}>
          {title}
        </Text>
        <Text className="shrink-0 text-body-sm text-ink" numberOfLines={3}>
          {description}
        </Text>
        <Pressable
          className="shrink-0 flex-row items-center gap-1.5"
          onPress={onPress}
          hitSlop={8}
        >
          <Text className="text-link text-burgundy">{ctaLabel}</Text>
          <Feather name="arrow-right" size={14} color={colors.burgundy} />
        </Pressable>
      </View>
    </View>
  );
}
