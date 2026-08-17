import { Pressable, ScrollView, Text, View } from "@/lib/tw";

import { BottomNav } from "@/components/BottomNav";
import { CategoryStoryRow } from "@/components/CategoryStoryRow";
import { Feather } from "@expo/vector-icons";
import { FeaturedStoryCard } from "@/components/FeaturedStoryCard";
import { Image } from "@/lib/tw/image";
import { PatternHighlightCard } from "@/components/PatternHighlightCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";
import { images } from "@/constants/images";
import { storyCategories } from "@/data/stories";

function SectionTag({ children }: { children: string }) {
  return (
    <View
      className="self-start rounded-sm border border-border/70 bg-paper-light px-2.5 py-1"
      style={styles.tag}
    >
      <Text className="text-label text-burgundy" style={{ letterSpacing: 0.6 }}>
        {children.toUpperCase()}
      </Text>
    </View>
  );
}

export default function Home() {
  return (
    <View className="flex-1 bg-paper">
      <Stack.Screen options={{ headerShown: false }} />
      {/* Very subtle paper-grain texture over the flat screen background.
          The grain's own alpha channel is already faint (~8% max), so no
          extra opacity is layered on top. */}
      <Image
        source={images.paperGrain}
        className="absolute h-full w-full object-cover"
        pointerEvents="none"
      />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="flex-row items-start justify-between px-5 pt-3">
            <View className="gap-1">
              <Text className="text-h1 text-ink">Welcome back.</Text>
              <Text className="text-body-md text-ink-muted">
                Your story is waiting.
              </Text>
            </View>
            <Pressable
              className="h-10 w-10 items-center justify-center rounded-full bg-paper-light"
              style={styles.settingsShadow}
              hitSlop={8}
            >
              <Feather name="settings" size={18} color={colors.ink} />
            </Pressable>
          </View>

          {/* Featured story */}
          <View className="px-5 pt-3">
            <FeaturedStoryCard
              storyNumber={1}
              category="Dating"
              title="Something feels off."
              episode={4}
              durationMinutes={6}
              sceneImage={images.storyDating01Scene}
            />
          </View>

          {/* Your stories */}
          <View className="gap-2 px-5 pt-5">
            <SectionTag>Your stories</SectionTag>
            <View className="gap-2">
              {storyCategories.map((category) => (
                <CategoryStoryRow
                  key={category.id}
                  title={category.title}
                  icon={category.icon}
                  accentClass={category.accentClass}
                  status={category.status}
                />
              ))}
            </View>
          </View>

          {/* Recently discovered */}
          <View className="gap-2 pt-5">
            <View className="px-5">
              <SectionTag>Recently discovered</SectionTag>
            </View>
            <View className="px-5">
              <PatternHighlightCard
                title="Guilt-Tripping"
                description="When someone shifts the focus from your boundary to whether you care about them."
              />
            </View>
          </View>
        </ScrollView>

        <View className="px-5 pt-1.5">
          <BottomNav activeTab="home" />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 12,
  },
  settingsShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  tag: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
    elevation: 1,
    transform: [{ rotate: "-1deg" }],
  },
});
