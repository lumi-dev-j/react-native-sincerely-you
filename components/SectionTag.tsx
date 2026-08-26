import { Text, View } from "@/lib/tw";

import { StyleSheet } from "react-native";

export function SectionTag({ children }: { children: string }) {
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

const styles = StyleSheet.create({
  tag: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
    elevation: 1,
    transform: [{ rotate: "-1deg" }],
  },
});
