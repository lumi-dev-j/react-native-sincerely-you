import { Animated, Pressable, StyleSheet } from "react-native";
import { Text, View } from "@/lib/tw";
import { useRef, useState } from "react";

import { Feather } from "@expo/vector-icons";
import { Image } from "@/lib/tw/image";
import type { PatternInsight } from "@/data/patterns";
import { colors } from "@/constants/colors";
import { images } from "@/constants/images";

// Native aspect ratio of assets/images/torn-pattern-card.png.
export const CARD_RATIO = 1024 / 1536;

type PatternFlipCardProps = {
  pattern: PatternInsight;
  /** Whether this is the focused card in the deck — only the focused card flips on tap. */
  active: boolean;
  /** Tapping a card that isn't focused brings it into focus instead of flipping it. */
  onPressInactive?: () => void;
};

export function PatternFlipCard({
  pattern,
  active,
  onPressInactive,
}: PatternFlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const spin = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    if (!active) {
      onPressInactive?.();
      return;
    }
    Animated.spring(spin, {
      toValue: flipped ? 0 : 1,
      useNativeDriver: true,
      friction: 8,
      tension: 10,
    }).start();
    setFlipped(!flipped);
  };

  const frontRotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const backRotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });
  // Cross-fade at the halfway point of the rotation, standing in for
  // `backfaceVisibility: "hidden"` — that style can make the whole view
  // disappear (not just its back face) under React Native's New Architecture.
  const frontOpacity = spin.interpolate({
    inputRange: [0, 0.5, 0.5, 1],
    outputRange: [1, 1, 0, 0],
  });
  const backOpacity = spin.interpolate({
    inputRange: [0, 0.5, 0.5, 1],
    outputRange: [0, 0, 1, 1],
  });

  return (
    <View className="w-full" style={{ aspectRatio: CARD_RATIO }}>
      {/* Tape pinning the focused card in place — unfocused cards in the
          deck sit plain, matching the reference design. */}
      {active ? (
        <Image
          source={images.maskingTape}
          className="absolute self-center object-contain"
          style={styles.tape}
          pointerEvents="none"
        />
      ) : null}

      <Pressable onPress={handlePress} style={styles.pressable}>
        {/* Front — illustration + title, "Tap to reveal" hint. */}
        <Animated.View
          style={[
            styles.face,
            active && styles.shadow,
            { opacity: frontOpacity, transform: [{ rotateY: frontRotate }] },
          ]}
        >
          <Image
            source={images.tornPatternCard}
            className="absolute h-full w-full object-contain"
            pointerEvents="none"
          />
          <View className="absolute left-[10%] right-[10%] top-[9%] bottom-[9%] items-center">
            <Image
              source={pattern.image}
              className="h-[38%] w-full object-contain"
            />
            <HeartDivider />
            <Text
              className="pt-3 text-center text-h2 text-ink"
              numberOfLines={2}
            >
              {pattern.title}
            </Text>
            <View className="mt-3 h-px w-10 bg-rose-dust" />
            {active ? (
              <>
                <View className="flex-1" />
                <View className="flex-row items-center gap-1.5 pb-2">
                  <Text className="text-body-md text-ink-muted">
                    Tap to reveal
                  </Text>
                  <Feather
                    name="refresh-cw"
                    size={14}
                    color={colors.inkMuted}
                  />
                </View>
              </>
            ) : null}
          </View>
        </Animated.View>

        {/* Back — the pattern's definition. */}
        <Animated.View
          style={[
            styles.face,
            active && styles.shadow,
            styles.back,
            { opacity: backOpacity, transform: [{ rotateY: backRotate }] },
          ]}
        >
          <Image
            source={images.tornPatternCard}
            className="absolute h-full w-full object-contain"
            pointerEvents="none"
          />
          <View className="absolute left-[10%] right-[10%] top-[9%] bottom-[9%] items-center justify-center gap-3">
            <Text
              className="text-label text-burgundy"
              style={{ letterSpacing: 0.6 }}
            >
              {pattern.label.toUpperCase()}
            </Text>
            <Text className="text-center text-h2 text-burgundy-dark">
              {pattern.title}
            </Text>
            <View className="h-px w-10 bg-rose-dust" />
            <Text className="text-center text-body-md text-ink">
              {pattern.description}
            </Text>
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
}

// A small "──── ♡ ────" ornament, echoing the app's heart motif.
function HeartDivider() {
  return (
    <View className="mt-4 flex-row items-center gap-2">
      <View className="h-px w-8 bg-rose-dust" />
      <Feather name="heart" size={12} color={colors.burgundy} />
      <View className="h-px w-8 bg-rose-dust" />
    </View>
  );
}

const styles = StyleSheet.create({
  tape: {
    top: "-7%",
    width: "46%",
    aspectRatio: 2172 / 724,
    transform: [{ rotate: "-2deg" }],
    zIndex: 1,
  },
  pressable: {
    flex: 1,
  },
  face: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  back: {
    position: "absolute",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
});
