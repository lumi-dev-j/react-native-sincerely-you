import { Pressable, Text, View } from "@/lib/tw";

import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Fragment, useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { Image } from "@/lib/tw/image";
import type { PatternReveal } from "@/data/patterns";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";
import { images } from "@/constants/images";

// The torn-paper card (plus tape) is baked directly into
// assets/images/tutorial-page-background.png, at a fixed spot on its canvas.
// These percentages (measured from that canvas) position the actual content
// to line up with the card's edges instead of drawing a separate card image.
const CARD_INSET = {
  left: "6.3%",
  right: "5.7%",
  top: "19.1%",
  bottom: "8.1%",
} as const;

type PatternRevealScreenProps = {
  reveal: PatternReveal;
  onBack?: () => void;
  onContinue?: () => void;
};

export function PatternRevealScreen({
  reveal,
  onBack,
  onContinue,
}: PatternRevealScreenProps) {
  return (
    <View className="flex-1 bg-paper">
      <Image
        source={images.tutorialPageBackground}
        className="absolute h-full w-full object-cover"
        pointerEvents="none"
      />
      <SafeAreaView style={{ flex: 1 }} pointerEvents="box-none">
        <View className="px-5 pt-2">
          <Pressable
            className="h-10 w-10 items-center justify-center rounded-full bg-paper-light"
            style={styles.shadow}
            onPress={onBack}
            hitSlop={8}
          >
            <Feather name="chevron-left" size={20} color={colors.ink} />
          </Pressable>
        </View>
      </SafeAreaView>

      {/* Content aligned to the card's edges baked into the background
          image above, rather than measured from the safe area — the
          background itself ignores safe-area insets too. */}
      <View
        className="absolute"
        style={{
          left: CARD_INSET.left,
          right: CARD_INSET.right,
          top: CARD_INSET.top,
          bottom: CARD_INSET.bottom,
        }}
      >
        <View className="flex-1 px-5 pb-5 pt-4">
          {reveal.patterns.map((pattern) => (
            <Fragment key={pattern.title}>
              <PatternRow
                label={pattern.label}
                title={pattern.title}
                description={pattern.description}
                icon={pattern.icon}
              />
              <Divider />
            </Fragment>
          ))}

          <View className="flex-row gap-3">
            <IconCircle icon={reveal.watchFor.icon} />
            <View className="flex-1 gap-2 pt-0.5">
              <Text className="text-label text-burgundy" style={{ letterSpacing: 0.6 }}>
                {reveal.watchFor.label.toUpperCase()}
              </Text>
              <View className="gap-1">
                {reveal.watchFor.items.map((item) => (
                  <View key={item} className="flex-row gap-1.5">
                    <View className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-burgundy" />
                    <Text
                      className="flex-1 text-ink"
                      style={{ fontSize: 12, lineHeight: 18 }}
                    >
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <ReminderStrip text={reveal.reminder} />

          {/* CTA — narrower and clearly secondary to the educational content above. */}
          <Pressable
            className="mx-8 mt-8 flex-row items-center justify-center gap-2.5 rounded-2xl bg-burgundy-dark px-6 py-4"
            style={styles.buttonShadow}
            onPress={onContinue}
          >
            <Text className="text-link text-paper-light">
              Continue to next part
            </Text>
            <Feather name="arrow-right" size={16} color={colors.paperLight} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function InsightIcon({
  icon,
  size = 20,
}: {
  icon: PatternReveal["watchFor"]["icon"];
  size?: number;
}) {
  if (icon.set === "material") {
    return (
      <MaterialCommunityIcons name={icon.name} size={size} color={colors.burgundy} />
    );
  }
  return <Feather name={icon.name} size={size} color={colors.burgundy} />;
}

function IconCircle({ icon }: { icon: PatternReveal["watchFor"]["icon"] }) {
  return (
    <View className="h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-dust/25">
      <InsightIcon icon={icon} />
    </View>
  );
}

// mt is the gap from a section's own content down to the divider; mb is the
// (larger) gap from the divider down to the next section — two distinct
// values so the rhythm reads as intentional rather than evenly stretched.
function Divider() {
  return <View className="h-px bg-rose-dust/60" style={{ marginTop: 28, marginBottom: 32 }} />;
}

// The pink-reminder.png texture is stretched to match this row's own
// content height (icon + however many lines the text wraps to). A plain
// `h-full` on the image is unreliable here — Image doesn't consistently
// pick up a percentage height from a sibling-driven auto-height parent, so
// the texture would stay short and the last line of text would spill onto
// the bare page. Measuring the content and applying an explicit pixel
// height to the image sidesteps that.
function ReminderStrip({ text }: { text: string }) {
  const [height, setHeight] = useState<number | undefined>(undefined);

  const onLayout = (event: LayoutChangeEvent) => {
    // A small buffer so the texture clears text descenders on the last
    // line, which render slightly below the nominal line-height box. Kept
    // small since the real top/bottom breathing room comes from the
    // content row's own (symmetric) padding below, not from this — adding
    // it here only extends the bottom edge, which would push the text
    // visually toward the top of the strip.
    setHeight(event.nativeEvent.layout.height + 6);
  };

  return (
    <View className="relative overflow-hidden rounded-sm" style={{ marginTop: 24 }}>
      {height ? (
        <View className="absolute w-full" style={{ height }}>
          <Image
            source={images.pinkReminder}
            className="h-full w-full object-fill"
            pointerEvents="none"
          />
        </View>
      ) : null}
      <View
        className="flex-row items-center gap-2.5 px-5 py-5"
        onLayout={onLayout}
      >
        <Feather name="heart" size={15} color={colors.burgundyDark} />
        <Text className="flex-1 text-ink" style={{ fontSize: 10, lineHeight: 14 }}>
          {text}
        </Text>
      </View>
    </View>
  );
}

// Shared icon + label + title + description layout used by the pattern rows.
function PatternRow({
  label,
  title,
  description,
  icon,
}: {
  label: string;
  title: string;
  description: string;
  icon: PatternReveal["watchFor"]["icon"];
}) {
  return (
    <View className="flex-row gap-3">
      <IconCircle icon={icon} />
      <View className="flex-1 gap-1.5 pt-0.5">
        <Text className="text-label text-burgundy" style={{ letterSpacing: 0.6 }}>
          {label.toUpperCase()}
        </Text>
        <Text className="text-h2 text-burgundy-dark">{title}</Text>
        <Text className="text-ink" style={{ fontSize: 12, lineHeight: 18 }}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
});
