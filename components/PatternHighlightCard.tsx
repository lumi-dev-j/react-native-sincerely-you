import { Pressable, Text, View } from "@/lib/tw";

import { Feather } from "@expo/vector-icons";
import type { ImageSourcePropType } from "react-native";
import { Image } from "@/lib/tw/image";
import { colors } from "@/constants/colors";
import { images } from "@/constants/images";

// Native aspect ratio of assets/images/pattern-card.png.
const CARD_RATIO = 2048 / 768;

type PatternHighlightCardProps = {
  title: string;
  description: string;
  ctaLabel?: string;
  /** Illustration for the pattern, shown directly on the card (no frame). */
  patternImage?: ImageSourcePropType;
  onPress?: () => void;
};

export function PatternHighlightCard({
  title,
  description,
  ctaLabel = "Explore pattern",
  patternImage,
  onPress,
}: PatternHighlightCardProps) {
  return (
    // Full content width, matching the "Your Stories" rows.
    <View className="w-full" style={{ aspectRatio: CARD_RATIO }}>
      <Image
        source={images.patternCard}
        className="absolute h-full w-full object-contain"
        pointerEvents="none"
      />

      {/* Sized independently of the text column (1.3x its old box) so it can
          overflow the text row's vertical center, matching the reference. */}
      {patternImage ? (
        <Image
          source={patternImage}
          className="absolute bottom-[6%] left-[5%] top-[6%] w-[30%] object-contain"
        />
      ) : null}

      {/* Inset to the card's plain paper region so content never runs under
          the botanical flourish printed into the art's bottom-right. */}
      <View className="absolute bottom-[16%] left-[37%] right-[28%] top-[16%] gap-2">
        {/* shrink-0 on every child stops the web flexbox default (shrink: 1)
            from squeezing text below its natural size. */}
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
