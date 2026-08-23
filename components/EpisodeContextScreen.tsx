import { Pressable, Text, View } from "@/lib/tw";

import type { Episode } from "@/data/episodes";
import { Feather } from "@expo/vector-icons";
import { Image } from "@/lib/tw/image";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";
import { images } from "@/constants/images";

// Native aspect ratio of the visible polaroid card inside
// assets/images/white-frame.png. The PNG canvas itself is much larger,
// with soft transparent padding around the card, so the frame image is
// rendered oversized (see FRAME_BOX below) and cropped back down by the
// wrapper's overflow rather than by trimming the asset itself.
const CARD_RATIO = 743 / 753;

// The frame PNG's card sits inside its canvas at x:110-853, y:460-1213 of
// a 1024x1536 canvas. Expressed as percentages of the card's own box, this
// is how much larger/offset the full frame image needs to be to make the
// card exactly fill its wrapper.
const FRAME_BOX = {
  left: "-14.8%",
  top: "-61.09%",
  width: "137.82%",
  height: "203.98%",
} as const;

// The frame's transparent photo opening, as a percentage rect of the full
// frame canvas (i.e. relative to FRAME_BOX above) — measured directly from
// the asset's alpha channel, then padded out slightly so the cover image
// fully overlaps the opening (the overhang is masked by the opaque frame
// border on top). The opening is tilted a few degrees within an otherwise
// straight canvas, so the clipping view carries that same tilt.
const PHOTO_OPENING = {
  left: "15.65%",
  top: "32.98%",
  width: "62.93%",
  height: "37.47%",
  rotate: "-3.07deg",
} as const;

// Renders text with a single substring (e.g. a character's name) bolded to
// match the contextIntro emphasis styling, falling back to plain text when
// no emphasis is given or the substring isn't found.
function renderWithEmphasis(text: string, emphasis?: string) {
  const index = emphasis ? text.indexOf(emphasis) : -1;
  if (index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <Text className="font-sans-medium text-ink">{emphasis}</Text>
      {text.slice(index + emphasis!.length)}
    </>
  );
}

type EpisodeContextScreenProps = {
  episode: Episode;
  onBack?: () => void;
  onBeginStory?: () => void;
};

export function EpisodeContextScreen({
  episode,
  onBack,
  onBeginStory,
}: EpisodeContextScreenProps) {
  return (
    <View className="flex-1 bg-paper">
      <Image
        source={images.contextBackground}
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
              {episode.title}
            </Text>
            <View
              className="h-[3px] w-16 rounded-full bg-burgundy/70"
              style={{ transform: [{ rotate: "-1deg" }] }}
            />
          </View>

          {/* Photo */}
          <View className="items-center pt-8">
            <View className="w-[62%]" style={{ aspectRatio: CARD_RATIO }}>
              {/* Note paper, tucked behind the card, peeking out lower-right */}
              <Image
                source={images.noteClip}
                className="absolute bottom-[8%] right-[-24%] h-[59.2%] w-[60%] object-contain"
                pointerEvents="none"
              />

              <View className="absolute" style={FRAME_BOX}>
                <View
                  className="absolute overflow-hidden rounded-sm bg-paper"
                  style={{
                    left: PHOTO_OPENING.left,
                    top: PHOTO_OPENING.top,
                    width: PHOTO_OPENING.width,
                    height: PHOTO_OPENING.height,
                    transform: [{ rotate: PHOTO_OPENING.rotate }],
                  }}
                >
                  <Image
                    source={episode.coverImage}
                    className="h-full w-full object-cover"
                  />
                </View>
                <Image
                  source={images.whiteFrame}
                  className="absolute h-full w-full object-contain"
                  pointerEvents="none"
                />
              </View>
            </View>
          </View>

          {/* Context copy */}
          <View className="gap-4 px-6 pt-6">
            <Text className="text-center text-body-lg">
              <Text className="font-sans-medium text-ink">
                {episode.contextIntro.emphasis}
              </Text>
              <Text className="text-ink-muted">{episode.contextIntro.rest}</Text>
            </Text>

            <View className="flex-row items-center justify-center gap-2">
              <View className="h-px w-10 bg-burgundy/40" />
              <Feather name="heart" size={10} color={colors.burgundy} />
              <View className="h-px w-10 bg-burgundy/40" />
            </View>

            <Text className="text-center text-body-lg text-ink-muted">
              {renderWithEmphasis(episode.contextHook, episode.contextHookEmphasis)}
            </Text>
          </View>

          {/* CTA */}
          <View className="px-4 pb-10 pt-10">
            <Pressable
              className="flex-row items-center justify-center gap-3 rounded-2xl bg-burgundy-dark px-6 py-5"
              style={styles.buttonShadow}
              onPress={onBeginStory}
            >
              <Text className="text-button text-paper-light">Begin story</Text>
              <Feather name="arrow-right" size={18} color={colors.paperLight} />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
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
