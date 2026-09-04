import { Animated, Pressable, StyleSheet } from "react-native";
import { Text, View } from "@/lib/tw";
import { useRef, useState } from "react";

import { Feather } from "@expo/vector-icons";
import { Image } from "@/lib/tw/image";
import type { PatternInsight } from "@/data/patterns";
import { colors } from "@/constants/colors";
import { images } from "@/constants/images";

// Native aspect ratio of assets/images/torn-pattern-card.png. Stretching
// this taller (as tried previously, via object-fill) distorted the paper
// texture and threw off the tape's calibrated overlap — matching the
// reference's proportions means keeping the asset's own ratio and sizing
// the card via width instead.
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
      {/* Tape pinning every card in the deck, matching the reference design. */}
      <Image
        source={images.maskingTape}
        className="absolute self-center object-contain"
        style={styles.tape}
        pointerEvents="none"
      />

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
            source={images.tornPatternCardParchment}
            className="absolute h-full w-full object-contain"
            pointerEvents="none"
          />
          <View className="absolute left-[10%] right-[10%] top-[9%] bottom-[14%] items-center">
            <Image
              source={pattern.image}
              className="h-[40%] w-full object-contain"
              style={{ marginTop: 35, marginBottom: 8 }}
            />
            <HeartDivider />
            <Text
              className="pt-2.5 text-center text-h2 text-ink"
              numberOfLines={2}
            >
              {splitTitle(pattern.title)}
            </Text>
            {active ? (
              // Pinned to the bottom of the card independently of the
              // content above — as a flex-flow item it competed with the
              // icon/title for space, and got squeezed out of view
              // entirely once the icon grew large enough to fill it.
              <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-center gap-1">
                <Text
                  className="text-ink-muted"
                  style={{ fontSize: 12, lineHeight: 16 }}
                >
                  Tap to reveal
                </Text>
                <Feather name="refresh-cw" size={11} color={colors.inkMuted} />
              </View>
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
            source={images.tornPatternCardParchment}
            className="absolute h-full w-full object-contain"
            pointerEvents="none"
          />
          <View className="absolute left-[10%] right-[10%] top-[9%] bottom-[9%] items-center justify-center gap-2">
            <Text
              className="text-label text-burgundy"
              style={{ fontSize: 10, lineHeight: 13, letterSpacing: 0.6 }}
            >
              {pattern.label.toUpperCase()}
            </Text>
            <Text className="text-center text-h2 text-burgundy-dark">
              {splitTitle(pattern.title)}
            </Text>
            <View className="h-px w-8 bg-rose-dust" />
            <Text
              className="text-center text-ink"
              style={{ fontSize: 13, lineHeight: 19 }}
            >
              {pattern.description}
            </Text>
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
}

// Breaks every title onto two lines, e.g. "Future Faking" ->
// "Future\nFaking", instead of leaving it to wrap naturally. Hyphens are
// dropped first (turning "Guilt-Tripping" into "Guilt Tripping") so a
// hyphenated title breaks the same clean way, with no dash left in the
// wrapped text.
function splitTitle(title: string): string {
  return title.replace(/-/g, " ").replace(" ", "\n");
}

// A small "──── ♡ ────" ornament, echoing the app's heart motif.
function HeartDivider() {
  return (
    <View className="mt-3 flex-row items-center gap-1.5">
      <View className="h-px w-6 bg-rose-dust" />
      <Feather name="heart" size={10} color={colors.burgundy} />
      <View className="h-px w-6 bg-rose-dust" />
    </View>
  );
}

const styles = StyleSheet.create({
  tape: {
    // masking-tape.png has ~13% transparent padding above and below the
    // drawn tape within its own canvas. -2% leaves about half the visible
    // strip on the card and half above it.
    top: "-2%",
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
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
});
