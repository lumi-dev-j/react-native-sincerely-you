import { Pressable, ScrollView, Text, View } from "@/lib/tw";

import type { Episode } from "@/data/episodes";
import type { EpisodeCompletion } from "@/data/episodeCompletions";
import { Feather } from "@expo/vector-icons";
import { Image } from "@/lib/tw/image";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";
import { images } from "@/constants/images";

type EpisodeCompleteScreenProps = {
  episode: Episode;
  patternsDiscovered: string[];
  nextEpisode: EpisodeCompletion["nextEpisode"];
  onBack?: () => void;
  onContinue?: () => void;
  onBackToHome?: () => void;
};

export function EpisodeCompleteScreen({
  episode,
  patternsDiscovered,
  nextEpisode,
  onBack,
  onContinue,
  onBackToHome,
}: EpisodeCompleteScreenProps) {
  return (
    <View className="flex-1 bg-paper">
      <Image
        source={images.completeEpisodeBackground}
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
            {/* Episode complete */}
            <View className="items-center gap-3 pt-2">
              <Text className="text-h1-bold text-center text-burgundy-dark">
                Episode Complete
              </Text>
              <View className="flex-row items-center gap-3">
                <View className="h-px w-10 bg-burgundy/40" />
                <Feather name="heart" size={11} color={colors.burgundy} />
                <View className="h-px w-10 bg-burgundy/40" />
              </View>
              <Text className="text-body-md text-ink-muted">
                {episode.category} &nbsp;•&nbsp; Episode{" "}
                {String(episode.episodeNumber).padStart(2, "0")}
              </Text>
            </View>

            {/* Patterns discovered */}
            <View
              className="mt-8 rounded-3xl bg-paper-light p-5"
              style={styles.cardShadow}
            >
              <Text
                className="text-label text-burgundy"
                style={{ letterSpacing: 0.6 }}
              >
                PATTERNS DISCOVERED
              </Text>
              <View className="flex-row flex-wrap gap-2 pt-3">
                {patternsDiscovered.map((pattern) => (
                  <View
                    key={pattern}
                    className="rounded-lg bg-rose-dust/40 px-4 py-2.5"
                  >
                    <Text className="font-sans-medium text-body-md text-burgundy-dark">
                      {pattern}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Next episode */}
            <View
              className="mt-4 rounded-3xl bg-paper-light p-5"
              style={styles.cardShadow}
            >
              <Text
                className="text-label text-burgundy"
                style={{ letterSpacing: 0.6 }}
              >
                NEXT EPISODE
              </Text>

              <View className="flex-row gap-4 pt-3">
                <View
                  className="w-[42%] overflow-hidden rounded-xl bg-paper"
                  style={{ aspectRatio: 1.2 }}
                >
                  {nextEpisode.thumbnail ? (
                    <Image
                      source={nextEpisode.thumbnail}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <View className="h-full w-full items-center justify-center border border-dashed border-border">
                      <Feather name="image" size={22} color={colors.inkMuted} />
                    </View>
                  )}
                </View>

                <View className="flex-1 gap-1.5 pt-0.5">
                  <Text
                    className="text-label text-burgundy"
                    style={{ letterSpacing: 0.6 }}
                  >
                    EPISODE {String(nextEpisode.episodeNumber).padStart(2, "0")}
                  </Text>
                  <Text className="text-h2 text-burgundy-dark">
                    {nextEpisode.titleLine}
                  </Text>
                  <View className="h-[2px] w-8 rounded-full bg-burgundy/70" />
                  <Text className="pt-1 text-body-sm text-ink-muted">
                    {nextEpisode.description}
                  </Text>
                </View>
              </View>

              <Pressable
                className="mt-5 flex-row items-center justify-center gap-2.5 rounded-2xl bg-burgundy-dark px-6 py-4"
                style={styles.buttonShadow}
                onPress={onContinue}
              >
                <Text className="text-button text-paper-light">
                  Continue to Episode{" "}
                  {String(nextEpisode.episodeNumber).padStart(2, "0")}
                </Text>
                <Feather name="arrow-right" size={16} color={colors.paperLight} />
              </Pressable>
            </View>

            {/* Back to home */}
            <Pressable
              className="flex-row items-center justify-center gap-2 pt-6"
              onPress={onBackToHome}
              hitSlop={8}
            >
              <Feather name="book-open" size={15} color={colors.burgundy} />
              <Text className="text-link text-burgundy underline">
                Back to Home
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 16,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  buttonShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
});
