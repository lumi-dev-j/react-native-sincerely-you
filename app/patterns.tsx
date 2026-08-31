import { Text, View } from "@/lib/tw";

import { BottomNav } from "@/components/BottomNav";
import { Image } from "@/lib/tw/image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { images } from "@/constants/images";

export default function Patterns() {
  return (
    <View className="flex-1 bg-paper">
      <Stack.Screen options={{ headerShown: false }} />
      <Image
        source={images.paperGrain}
        className="absolute h-full w-full object-cover"
        pointerEvents="none"
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View className="gap-1 px-5 pt-3">
          <Text className="text-h1 text-ink">Patterns</Text>
          <Text className="text-body-md text-ink-muted">
            Every pattern you&apos;ve uncovered, gathered in one place.
          </Text>
        </View>

        <View className="flex-1 items-center justify-center px-5">
          <Text className="text-body-md text-ink-muted">Coming soon.</Text>
        </View>

        <View className="px-5 pt-1.5">
          <BottomNav activeTab="patterns" />
        </View>
      </SafeAreaView>
    </View>
  );
}
