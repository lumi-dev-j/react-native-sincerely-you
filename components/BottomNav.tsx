import { Pressable, Text, View } from "@/lib/tw";

import { Feather } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

type NavTabKey = "home" | "patterns";

const TABS: { key: NavTabKey; label: string; icon: React.ComponentProps<typeof Feather>["name"] }[] = [
  { key: "home", label: "Home", icon: "home" },
  { key: "patterns", label: "Patterns", icon: "compass" },
];

type BottomNavProps = {
  activeTab?: NavTabKey;
};

export function BottomNav({ activeTab = "home" }: BottomNavProps) {
  return (
    <View
      className="flex-row items-center justify-between rounded-2xl bg-paper-light px-3 py-2"
      style={styles.shadow}
    >
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <Pressable key={tab.key} className="flex-1 items-center gap-1">
            <Feather
              name={tab.icon}
              size={18}
              color={isActive ? colors.burgundy : colors.inkMuted}
            />
            <Text
              className={`text-caption ${isActive ? "text-burgundy" : "text-ink-muted"}`}
            >
              {tab.label}
            </Text>
            <View
              className={`mt-0.5 h-0.5 w-4 rounded-full ${isActive ? "bg-burgundy" : "bg-transparent"}`}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
});
