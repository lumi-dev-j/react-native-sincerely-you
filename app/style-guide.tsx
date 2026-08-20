import { Link, Pressable, ScrollView, Text, View } from "@/lib/tw";

import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";

type ColorSwatchProps = {
  className: string;
  name: string;
  hex: string;
};

function ColorSwatch({ className, name, hex }: ColorSwatchProps) {
  return (
    <View className="w-24 gap-2">
      <View
        className={`h-20 w-24 rounded-xl border border-border ${className}`}
      />
      <View>
        <Text className="text-body-sm text-ink">{name}</Text>
        <Text className="text-caption text-ink-muted">{hex}</Text>
      </View>
    </View>
  );
}

type TypeRowProps = {
  className: string;
  label: string;
  usage: string;
};

function TypeRow({ className, label, usage }: TypeRowProps) {
  return (
    <View className="gap-1 border-b border-border py-4">
      <Text className={`${className} text-ink`}>{label}</Text>
      <Text className="text-caption text-ink-muted">{usage}</Text>
    </View>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <Text className="text-body-sm text-burgundy" style={{ letterSpacing: 1 }}>
      {children.toUpperCase()}
    </Text>
  );
}

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAF6EF" }}>
      <ScrollView className="flex-1 bg-paper-light">
        <View className="gap-10 px-6 pb-16 pt-6">
          {/* Brand */}
          <View className="gap-3">
            <SectionLabel>Brand</SectionLabel>
            <Text className="text-h1 text-burgundy">Sincerely You</Text>
          </View>

          {/* Screens */}
          <View className="gap-3">
            <SectionLabel>Screens</SectionLabel>
            <Link href="/onboarding" asChild>
              <Pressable className="flex-row items-center justify-between rounded-2xl bg-burgundy px-6 py-4">
                <Text className="text-body-lg text-paper-light">
                  Onboarding
                </Text>
                <Feather
                  name="arrow-right"
                  size={18}
                  color={colors.paperLight}
                />
              </Pressable>
            </Link>
            <Link
              href={{
                pathname: "/story/[episodeId]",
                params: { episodeId: "too-good-to-be-true" },
              }}
              asChild
            >
              <Pressable className="flex-row items-center justify-between rounded-2xl bg-burgundy px-6 py-4">
                <Text className="text-body-lg text-paper-light">
                  Episode Context
                </Text>
                <Feather
                  name="arrow-right"
                  size={18}
                  color={colors.paperLight}
                />
              </Pressable>
            </Link>
          </View>

          {/* Colors */}
          <View className="gap-6">
            <SectionLabel>Colors</SectionLabel>

            <View className="gap-3">
              <Text className="text-caption text-ink-muted">PRIMARY</Text>
              <View className="flex-row gap-4">
                <ColorSwatch
                  className="bg-burgundy"
                  name="Burgundy"
                  hex="#7D3540"
                />
                <ColorSwatch
                  className="bg-burgundy-dark"
                  name="Burgundy Dark"
                  hex="#59252D"
                />
                <ColorSwatch
                  className="bg-rose-dust"
                  name="Rose Dust"
                  hex="#C79A9B"
                />
              </View>
            </View>

            <View className="gap-3">
              <Text className="text-caption text-ink-muted">NEUTRALS</Text>
              <View className="flex-row flex-wrap gap-4">
                <ColorSwatch className="bg-ink" name="Ink" hex="#24201E" />
                <ColorSwatch
                  className="bg-ink-muted"
                  name="Ink Muted"
                  hex="#6F6862"
                />
                <ColorSwatch className="bg-paper" name="Paper" hex="#F4EDE2" />
                <ColorSwatch
                  className="bg-paper-light"
                  name="Paper Light"
                  hex="#FAF6EF"
                />
                <ColorSwatch
                  className="bg-border"
                  name="Border"
                  hex="#DDD3C7"
                />
              </View>
            </View>

            <View className="gap-3">
              <Text className="text-caption text-ink-muted">
                ACCENT (CATEGORY)
              </Text>
              <View className="flex-row gap-4">
                <ColorSwatch className="bg-sage" name="Sage" hex="#858574" />
                <ColorSwatch
                  className="bg-slate"
                  name="Slate"
                  hex="#817C82"
                />
              </View>
            </View>
          </View>

          {/* Typography */}
          <View className="gap-1">
            <SectionLabel>Typography</SectionLabel>
            <TypeRow
              className="text-h1"
              label="H1"
              usage="Page / Screen Title · 36/40 · Regular · DM Serif Display"
            />
            <TypeRow
              className="text-h2"
              label="H2"
              usage="Section Title · 28/34 · Regular · DM Serif Display"
            />
            <TypeRow
              className="text-h3"
              label="H3"
              usage="Card / Module Title · 22/28 · Regular · DM Serif Display"
            />
            <TypeRow
              className="text-h4"
              label="H4"
              usage="Subheading · 18/24 · Medium · Inter"
            />
            <TypeRow
              className="text-body-lg"
              label="Body Large"
              usage="Important content · 17/25 · Regular · Inter"
            />
            <TypeRow
              className="text-body-md"
              label="Body Medium"
              usage="Body text · 15/22 · Regular · Inter"
            />
            <TypeRow
              className="text-body-sm"
              label="Body Small"
              usage="Supporting text · 13/19 · Regular · Inter"
            />
            <TypeRow
              className="text-caption"
              label="Caption"
              usage="Labels, meta text · 11/16 · Regular · Inter"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
