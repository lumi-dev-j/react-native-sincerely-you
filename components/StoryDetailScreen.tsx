import { Pressable, ScrollView, Text, View } from "@/lib/tw";

import type { EpisodeSummary } from "@/data/episodes";
import { Feather } from "@expo/vector-icons";
import { Image } from "@/lib/tw/image";
import type { ImageSourcePropType } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SectionTag } from "@/components/SectionTag";
import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";
import { images } from "@/constants/images";

type EpisodeStatus = "completed" | "current" | "locked";

type StoryDetailScreenProps = {
  category: string;
  title: string;
  episodes: EpisodeSummary[];
  /** Id of the first not-yet-completed episode, if any. */
  currentEpisodeId?: string;
  completedEpisodeIds: string[];
  totalEpisodes: number;
  onBack?: () => void;
  onSelectEpisode?: (episodeId: string) => void;
};

function statusFor(
  episodeId: string,
  currentEpisodeId: string | undefined,
  completedEpisodeIds: string[]
): EpisodeStatus {
  if (completedEpisodeIds.includes(episodeId)) return "completed";
  if (episodeId === currentEpisodeId) return "current";
  return "locked";
}

export function StoryDetailScreen({
  category,
  title,
  episodes,
  currentEpisodeId,
  completedEpisodeIds,
  totalEpisodes,
  onBack,
  onSelectEpisode,
}: StoryDetailScreenProps) {
  const completedCount = episodes.filter((episode) =>
    completedEpisodeIds.includes(episode.id)
  ).length;
  const progress = totalEpisodes > 0 ? completedCount / totalEpisodes : 0;
  const statuses = episodes.map((episode) =>
    statusFor(episode.id, currentEpisodeId, completedEpisodeIds)
  );

  return (
    <View className="flex-1 bg-paper">
      <Image
        source={images.storyDetailBackground}
        className="absolute h-full w-full object-cover"
        pointerEvents="none"
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1 px-5 pt-2">
          {/* Header */}
          <View className="flex-row items-center">
            <Pressable
              className="h-10 w-10 items-center justify-center rounded-full bg-paper-light"
              style={styles.shadow}
              onPress={onBack}
              hitSlop={8}
            >
              <Feather name="chevron-left" size={20} color={colors.ink} />
            </Pressable>
          </View>

          <ScrollView
            className="flex-1"
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Title */}
            <View className="gap-1.5 pt-5">
              <Text className="text-label text-burgundy" style={{ letterSpacing: 1 }}>
                {category.toUpperCase()}
              </Text>
              <Text className="text-h1 text-burgundy-dark">{title}</Text>
              <View
                className="h-[2px] w-10 rounded-full bg-burgundy/70"
                style={{ transform: [{ rotate: "-1deg" }] }}
              />
            </View>

            {/* Progress */}
            <View className="gap-1.5 pt-4">
              <Text className="text-body-md text-ink-muted">
                {completedCount} of {totalEpisodes} episodes completed
              </Text>
              <View className="h-1 w-full overflow-hidden rounded-full bg-border">
                <View
                  className="h-full rounded-full bg-burgundy-dark"
                  style={{ width: `${progress * 100}%` }}
                />
              </View>
            </View>

            {/* Episodes */}
            <View className="gap-2 pt-5">
              <SectionTag>Episodes</SectionTag>

              <View className="pt-1">
                {episodes.map((episode, index) => (
                  <EpisodeRow
                    key={episode.id}
                    episode={episode}
                    status={statuses[index]}
                    lineAboveActive={index > 0 && statuses[index - 1] !== "locked"}
                    lineBelowActive={
                      index < episodes.length - 1 && statuses[index] !== "locked"
                    }
                    isFirst={index === 0}
                    isLast={index === episodes.length - 1}
                    onPress={
                      statuses[index] === "current"
                        ? () => onSelectEpisode?.(episode.id)
                        : undefined
                    }
                  />
                ))}
              </View>
            </View>

            {/* Footer note */}
            <View className="items-center pt-0">
              <Image
                source={images.storyDetailBottomHandwritten}
                className="object-contain"
                style={styles.footerNote}
                pointerEvents="none"
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

function EpisodeRow({
  episode,
  status,
  lineAboveActive,
  lineBelowActive,
  isFirst,
  isLast,
  onPress,
}: {
  episode: EpisodeSummary;
  status: EpisodeStatus;
  lineAboveActive: boolean;
  lineBelowActive: boolean;
  isFirst: boolean;
  isLast: boolean;
  onPress?: () => void;
}) {
  const isCompleted = status === "completed";
  const isCurrent = status === "current";
  const isLocked = status === "locked";
  const numberLabel = String(episode.episodeNumber).padStart(2, "0");

  return (
    <View className="flex-row gap-3">
      {/* Timeline */}
      <View className="w-6 items-center">
        <View
          style={[
            styles.timelineSegment,
            {
              backgroundColor: isFirst
                ? "transparent"
                : lineAboveActive
                  ? colors.burgundyDark
                  : colors.border,
            },
          ]}
        />
        <TimelineMarker status={status} />
        <View
          style={[
            styles.timelineSegment,
            {
              backgroundColor: isLast
                ? "transparent"
                : lineBelowActive
                  ? colors.burgundyDark
                  : colors.border,
            },
          ]}
        />
      </View>

      <Pressable
        className={`mb-3 flex-1 flex-row items-center gap-2 rounded-xl py-2.5 pl-4 pr-3 ${
          isCurrent ? "bg-rose-dust/10" : "bg-paper-light"
        }`}
        style={styles.cardShadow}
        onPress={onPress}
        disabled={!onPress}
      >
        <View className="flex-1 gap-1">
          <View className="flex-row items-end gap-2">
            <Text
              className={`text-h1 ${isLocked ? "text-ink-muted/50" : "text-burgundy/50"}`}
            >
              {numberLabel}
            </Text>
            <Text className="flex-1 pb-0.5 text-h3 text-ink">{episode.title}</Text>
          </View>

          {isCompleted ? (
            <View className="flex-row items-center gap-1.5">
              <Feather name="check" size={11} color={colors.burgundy} />
              <Text className="text-body-sm text-ink-muted">Completed</Text>
            </View>
          ) : null}

          {isCurrent ? (
            <View className="flex-row items-center gap-1">
              <Text className="text-body-sm text-burgundy-dark">Continue episode</Text>
              <Feather name="arrow-right" size={11} color={colors.burgundyDark} />
            </View>
          ) : null}

          {isLocked ? (
            <View className="flex-row items-center gap-1.5">
              <Feather name="lock" size={10} color={colors.inkMuted} />
              <Text className="text-body-sm text-ink-muted">Locked</Text>
            </View>
          ) : null}

          {isCompleted && episode.patterns.length > 0 ? (
            <View className="flex-row flex-wrap gap-1 pt-0.5">
              {episode.patterns.map((pattern) => (
                <View key={pattern} className="rounded-md bg-rose-dust/30 px-2 py-1">
                  <Text className="font-sans-medium text-body-sm text-burgundy-dark">
                    {pattern}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>

        <EpisodeThumbnail coverImage={episode.coverImage} locked={isLocked} />
      </Pressable>
    </View>
  );
}

function TimelineMarker({ status }: { status: EpisodeStatus }) {
  if (status === "completed") {
    return (
      <View className="h-6 w-6 shrink-0 items-center justify-center rounded-full bg-burgundy-dark">
        <Feather name="check" size={11} color={colors.paperLight} />
      </View>
    );
  }

  if (status === "current") {
    return (
      <View
        className="h-6 w-6 shrink-0 items-center justify-center rounded-full bg-paper-light"
        style={{ borderWidth: 2, borderColor: colors.burgundyDark }}
      />
    );
  }

  return <View className="h-2 w-2 shrink-0 rounded-full bg-border" />;
}

function EpisodeThumbnail({
  coverImage,
  locked,
}: {
  coverImage?: ImageSourcePropType;
  locked: boolean;
}) {
  return (
    <View
      className="aspect-square w-[21%] shrink-0"
      style={{ transform: [{ rotate: "-3deg" }] }}
    >
      <Image
        source={images.storyDetailTornPaperCard}
        className="absolute h-full w-full object-cover"
        pointerEvents="none"
      />
      <View className="absolute left-[10%] right-[10%] top-[10%] bottom-[10%] items-center justify-center overflow-hidden rounded-sm">
        {locked ? (
          <Feather name="lock" size={16} color={colors.inkMuted} />
        ) : coverImage ? (
          <Image source={coverImage} className="h-full w-full object-cover" />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 10,
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
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  timelineSegment: {
    width: 1.5,
    flex: 1,
  },
  footerNote: {
    width: "72%",
    aspectRatio: 2024 / 777,
    transform: [{ rotate: "4deg" }],
  },
});
