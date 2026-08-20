import { Pressable, Text, View } from "@/lib/tw";
import { useVideoPlayer, VideoView } from "expo-video";

import type { Episode } from "@/data/episodes";
import { Feather } from "@expo/vector-icons";
import { Image } from "@/lib/tw/image";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";
import { images } from "@/constants/images";

// Native aspect ratio of the visible white card (border + opening) inside
// assets/images/video-page-white-frame.png. The PNG canvas is larger than
// the card, with transparent padding and a glow around it (plus the pin
// sticking out above), so the frame image is rendered oversized (see
// FRAME_BOX below) and cropped back down by the wrapper's bounds.
const CARD_RATIO = 1228 / 915;

// The frame PNG's card sits inside its canvas at roughly x:155-1383,
// y:59-974 of a 1536x1024 canvas. Expressed as percentages of the card's
// own box, this is how much larger/offset the full frame image needs to
// be to make the card exactly fill its wrapper.
const FRAME_BOX = {
  left: "-12.62%",
  top: "-6.45%",
  width: "125.08%",
  height: "111.91%",
} as const;

// The frame's transparent video opening, as a percentage rect of the full
// frame canvas (i.e. relative to FRAME_BOX above) — measured directly from
// the asset's alpha channel. Unlike the context screen's photo frame, this
// opening sits (almost) square within the canvas, so no extra tilt is
// needed here — the whole group is rotated together instead.
const VIDEO_OPENING = {
  left: "13.97%",
  top: "10.91%",
  width: "72.25%",
  height: "69.01%",
} as const;

type EpisodeVideoScreenProps = {
  episode: Episode;
  onBack?: () => void;
  onSeeWhatYouLearned?: () => void;
};

export function EpisodeVideoScreen({
  episode,
  onBack,
  onSeeWhatYouLearned,
}: EpisodeVideoScreenProps) {
  const player = useVideoPlayer(episode.video);

  return (
    <View className="flex-1 bg-paper">
      <Image
        source={images.videoPageBackground}
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
              <EpisodeIcon />
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
            <View pointerEvents="none" style={styles.underlineArc} />
          </View>

          {/* Video */}
          <View className="items-center pt-9">
            <View
              className="w-[85%]"
              style={{ aspectRatio: CARD_RATIO, transform: [{ rotate: "-4deg" }] }}
            >
              {/* Note paper, tucked behind the frame, peeking out lower-right */}
              <Image
                source={images.videoPageNoteClip}
                className="absolute bottom-[-10%] right-[-24%] h-[62%] w-[58%] object-contain"
                pointerEvents="none"
              />

              <View className="absolute" style={FRAME_BOX}>
                <View className="absolute overflow-hidden bg-ink" style={VIDEO_OPENING}>
                  <VideoView
                    player={player}
                    style={{ flex: 1 }}
                    nativeControls
                    contentFit="cover"
                  />
                </View>
                <Image
                  source={images.videoPageWhiteFrame}
                  className="absolute h-full w-full object-contain"
                  pointerEvents="none"
                />
              </View>
            </View>
          </View>

          {/* CTA */}
          <View className="flex-1 justify-end px-4 pb-10 pt-6">
            <Pressable
              className="flex-row items-center justify-center gap-3 rounded-2xl bg-burgundy-dark px-6 py-5"
              style={styles.buttonShadow}
              onPress={onSeeWhatYouLearned}
            >
              <Text className="text-button text-paper-light">See what you learned</Text>
              <Feather name="arrow-right" size={18} color={colors.paperLight} />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

// Small hand-drawn-style "episode" glyph — a rounded card with a crossed
// corner fold and a caption line, built from plain Views to match the
// reference icon without pulling in a new icon asset or SVG dependency.
function EpisodeIcon() {
  return (
    <View style={iconStyles.box}>
      <View style={[iconStyles.cross, { transform: [{ rotate: "45deg" }] }]} />
      <View style={[iconStyles.cross, { transform: [{ rotate: "-45deg" }] }]} />
      <View style={iconStyles.underline} />
    </View>
  );
}

const iconStyles = StyleSheet.create({
  box: {
    width: 16,
    height: 20,
    borderRadius: 3,
    borderWidth: 1.4,
    borderColor: colors.burgundy,
    alignItems: "center",
    justifyContent: "center",
  },
  cross: {
    position: "absolute",
    top: 6,
    width: 9,
    height: 1.3,
    borderRadius: 1,
    backgroundColor: colors.burgundy,
  },
  underline: {
    position: "absolute",
    bottom: 3.5,
    width: 7,
    height: 1.3,
    borderRadius: 1,
    backgroundColor: colors.burgundy,
  },
});

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
  underlineArc: {
    width: 70,
    height: 16,
    borderRadius: 70,
    borderWidth: 1.6,
    borderColor: "transparent",
    borderTopColor: colors.burgundy,
    opacity: 0.85,
    transform: [{ rotate: "-2deg" }],
  },
});
