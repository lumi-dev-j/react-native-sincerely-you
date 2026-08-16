import "@/global.css";

import { useCallback, useEffect } from "react";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";

import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    DMSerifDisplay_400Regular,
    Inter_400Regular,
    Inter_500Medium,
  });

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayout();
  }, [onLayout]);

  if (!fontsLoaded) {
    return null;
  }

  return <Stack />;
}
