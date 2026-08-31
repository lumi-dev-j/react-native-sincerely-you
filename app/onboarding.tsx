import { Pressable, Text, View } from "@/lib/tw";

import { Image } from "@/lib/tw/image";
import { StyleSheet } from "react-native";

import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router } from "expo-router";
import { colors } from "@/constants/colors";
import { images } from "@/constants/images";
import { useStoryStore } from "@/store/useStoryStore";

export default function Onboarding() {
  const completeOnboarding = useStoryStore((state) => state.completeOnboarding);

  const handleBegin = () => {
    completeOnboarding();
    router.replace("/");
  };

  return (
    <View className="flex-1 bg-paper-light">
      <Stack.Screen options={{ headerShown: false }} />
      <Image
        source={images.onboardingBackground}
        className="absolute h-full w-full object-cover"
      />

      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1 justify-end px-6 pb-16">
          <Pressable
            className="flex-row items-center justify-center gap-3 rounded-2xl bg-burgundy-dark px-6 py-5"
            style={styles.buttonShadow}
            onPress={handleBegin}
          >
            <Text className="text-button text-paper-light">
              Begin your journey
            </Text>
            <Feather name="arrow-right" size={20} color={colors.paperLight} />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
});
