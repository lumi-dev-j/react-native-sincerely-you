import { Pressable, StyleSheet, Text, View } from "react-native";

import { Feather } from "@expo/vector-icons";
import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { colors } from "@/constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabButtonProps = BottomTabBarButtonProps & {
  icon: React.ComponentProps<typeof Feather>["name"];
  label: string;
};

function TabButton({
  icon,
  label,
  onPress,
  onLongPress,
  testID,
  style,
  "aria-selected": ariaSelected,
}: TabButtonProps) {
  const focused = ariaSelected ?? false;
  const color = focused ? colors.burgundy : colors.inkMuted;
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      testID={testID}
      style={[styles.tabItem, style]}
    >
      <View style={styles.tabContent}>
        <Feather name={icon} size={20} color={color} />
        <Text
          style={[styles.tabLabel, { color, marginTop: 5 }]}
          numberOfLines={1}
        >
          {label}
        </Text>
        <View
          style={[
            styles.tabUnderline,
            { backgroundColor: focused ? colors.burgundy : "transparent" },
          ]}
        />
      </View>
    </Pressable>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { ...styles.tabBar, bottom: Math.max(insets.bottom - 11, 0) },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarButton: (props) => (
            <TabButton {...props} icon="home" label="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="patterns"
        options={{
          tabBarButton: (props) => (
            <TabButton {...props} icon="compass" label="Patterns" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    marginHorizontal: 18,
    height: 54,
    paddingBottom: 0,
    borderRadius: 18,
    backgroundColor: colors.paperLight,
    borderTopWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabContent: {
    alignItems: "center",
    transform: [{ translateY: 2 }],
  },
  tabLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    lineHeight: 14,
  },
  tabUnderline: {
    marginTop: 5,
    height: 2,
    width: 24,
    borderRadius: 1,
  },
});
