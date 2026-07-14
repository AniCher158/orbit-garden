import { useMemo, useState } from "react";
import { Linking, Pressable, StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "@/src/components/ui/Screen";
import { AppText } from "@/src/components/ui/AppText";
import { Field } from "@/src/components/ui/Field";
import { Pill } from "@/src/components/ui/Pill";
import { Card } from "@/src/components/ui/Card";
import { filterResources, resourceFreshnessNotice } from "@/src/data/resources";
import { useOrbitStore } from "@/src/store/useOrbitStore";
import type { PricingModel } from "@/src/types";
import { colors, radius } from "@/src/theme";

export default function ResourcesScreen() {
  const params = useLocalSearchParams<{ course?: string }>();
  const [query, setQuery] = useState("");
  const [pricing, setPricing] = useState<PricingModel | "">("");
  const bookmarks = useOrbitStore((state) => state.bookmarks);
  const addBookmark = useOrbitStore((state) => state.addBookmark);
  const matches = useMemo(
    () => filterResources(query, params.course, pricing),
    [query, params.course, pricing],
  );
  return (
    <Screen>
      <AppText variant="muted">
        A link directory—not scraped content. External sites open in your normal
        browser.
      </AppText>
      {params.course ? (
        <View style={styles.context}>
          <Ionicons name="funnel" color={colors.mint} size={16} />
          <AppText variant="small">Mapped for {params.course}</AppText>
        </View>
      ) : null}
      <Field
        label="Search resources"
        value={query}
        onChangeText={setQuery}
        placeholder="Writing, AP practice, coding docs..."
      />
      <View style={styles.filters}>
        {(
          ["", "Official", "Free", "Freemium", "Paid", "School access"] as const
        ).map((item) => (
          <Pill
            key={item || "all"}
            label={item || "All"}
            selected={pricing === item}
            onPress={() => setPricing(item)}
          />
        ))}
      </View>
      <View style={styles.results}>
        {matches.map((resource) => {
          const saved = bookmarks.some(
            (item) => item.resourceId === resource.id,
          );
          const reason = resource.official
            ? "Suggested first because it is an official source."
            : resource.type.includes("Sim")
              ? "Suggested when visualizing supported science concepts."
              : `Suggested for ${resource.bestFor.toLowerCase()}.`;
          return (
            <Card key={resource.id} style={styles.card}>
              <View style={styles.cardHead}>
                <View
                  style={[
                    styles.logo,
                    {
                      backgroundColor: resource.official
                        ? "rgba(143,215,181,.12)"
                        : "rgba(157,145,232,.12)",
                    },
                  ]}
                >
                  <Ionicons
                    name={
                      resource.official
                        ? "shield-checkmark-outline"
                        : "library-outline"
                    }
                    color={resource.official ? colors.mint : colors.violet}
                    size={22}
                  />
                </View>
                <View style={styles.flex}>
                  <AppText variant="h2">{resource.name}</AppText>
                  <AppText variant="small">{resource.provider.name}</AppText>
                </View>
                <Pressable
                  accessibilityLabel={
                    saved
                      ? `Remove ${resource.name} bookmark`
                      : `Bookmark ${resource.name}`
                  }
                  onPress={() => addBookmark(resource.id)}
                  hitSlop={10}
                >
                  <Ionicons
                    name={saved ? "bookmark" : "bookmark-outline"}
                    color={saved ? colors.gold : colors.faint}
                    size={22}
                  />
                </Pressable>
              </View>
              <View style={styles.badges}>
                <View
                  style={[styles.badge, resource.official && styles.official]}
                >
                  <AppText
                    variant="small"
                    color={resource.official ? colors.mint : colors.cream}
                  >
                    {resource.pricingModel}
                  </AppText>
                </View>
                <View style={styles.badge}>
                  <AppText variant="small">
                    {resource.accountRequired
                      ? "Account required"
                      : "No account required"}
                  </AppText>
                </View>
              </View>
              <AppText>{resource.bestFor}</AppText>
              <AppText variant="small" color={colors.gold}>
                {reason}
              </AppText>
              <AppText variant="small">Limit: {resource.limitations}</AppText>
              <Pressable
                accessibilityRole="link"
                onPress={() => Linking.openURL(resource.url)}
                style={styles.open}
              >
                <AppText
                  variant="small"
                  color={colors.mint}
                  style={styles.openText}
                >
                  Open external resource
                </AppText>
                <Ionicons name="open-outline" color={colors.mint} size={16} />
              </Pressable>
            </Card>
          );
        })}
      </View>
      <Card style={styles.notice}>
        <Ionicons
          name="information-circle-outline"
          color={colors.blue}
          size={21}
        />
        <View style={styles.flex}>
          <AppText variant="h3">Pricing and availability</AppText>
          <AppText variant="small">
            {resourceFreshnessNotice} Metadata last manually checked on entries:
            July 13, 2026.
          </AppText>
        </View>
      </Card>
    </Screen>
  );
}
const styles = StyleSheet.create({
  context: { flexDirection: "row", gap: 7, marginVertical: 12 },
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 16,
  },
  results: { gap: 12 },
  card: { gap: 11 },
  cardHead: { flexDirection: "row", alignItems: "center", gap: 12 },
  logo: {
    width: 45,
    height: 45,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  flex: { flex: 1, gap: 2 },
  badges: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  badge: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  official: {
    borderColor: "rgba(143,215,181,.3)",
    backgroundColor: "rgba(143,215,181,.06)",
  },
  open: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 42,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
  },
  openText: { fontWeight: "700" },
  notice: { marginTop: 18, flexDirection: "row", gap: 11 },
});
