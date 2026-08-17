import { Pressable, Text, View } from "@/lib/tw";

import { Feather } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import type { StoryCategory } from "@/data/stories";
import { colors } from "@/constants/colors";

type CategoryStoryRowProps = Pick<
  StoryCategory,
  "title" | "icon" | "accentClass" | "status"
> & {
  onPress?: () => void;
};

export function CategoryStoryRow({
  title,
  icon,
  accentClass,
  status,
  onPress,
}: CategoryStoryRowProps) {
  return (
    <Pressable
      className="flex-row items-center justify-between rounded-lg bg-paper-light px-3 py-2.5"
      style={styles.shadow}
      onPress={onPress}
    >
      <View className="flex-1 flex-row items-center gap-2.5">
        <View
          className={`h-10 w-10 shrink-0 items-center justify-center rounded-full ${accentClass}`}
        >
          <Feather name={icon} size={16} color={colors.paperLight} />
        </View>

        <View className="flex-1 gap-1">
          <Text className="text-h5 text-ink" numberOfLines={1}>
            {title}
          </Text>
          {status.kind === "in-progress" ? (
            <View className="h-1 w-32 max-w-full overflow-hidden rounded-full bg-border">
              <View
                className="h-full rounded-full bg-burgundy"
                style={{
                  width: `${(status.completed / status.total) * 100}%`,
                }}
              />
            </View>
          ) : (
            <Text className="text-body-sm text-ink-muted">
              Coming up soon
            </Text>
          )}
        </View>
      </View>

      <View className="flex-row shrink-0 items-center gap-1 pl-2">
        {status.kind === "in-progress" ? (
          <Text className="text-body-sm text-burgundy">
            {status.completed} / {status.total}
          </Text>
        ) : (
          <View className="rounded-full bg-border/60 px-2 py-0.5">
            <Text
              className="text-label text-ink-muted"
              style={{ letterSpacing: 0.5 }}
            >
              COMING SOON
            </Text>
          </View>
        )}
        <Feather name="chevron-right" size={15} color={colors.inkMuted} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
});
