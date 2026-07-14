import { Alert, Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "@/src/components/ui/Screen";
import { AppText } from "@/src/components/ui/AppText";
import { AppButton } from "@/src/components/ui/AppButton";
import { Card } from "@/src/components/ui/Card";
import { GardenScene } from "@/src/components/GardenScene";
import { shopItems } from "@/src/data/shopItems";
import { useOrbitStore } from "@/src/store/useOrbitStore";
import { colors, radius } from "@/src/theme";

export default function GardenTab() {
  const { garden, buyReward, equipReward } = useOrbitStore();
  const levelNames = [
    "Empty Orbit",
    "First Sprout",
    "Scholar’s Garden",
    "Blooming Observatory",
    "Cosmic Study Sanctuary",
  ];
  return (
    <Screen>
      <View style={styles.header}>
        <View>
          <AppText variant="eyebrow">Sprig’s sanctuary</AppText>
          <AppText variant="h1">{levelNames[garden.level - 1]}</AppText>
        </View>
        <View style={styles.dust}>
          <Ionicons name="sparkles" color={colors.gold} size={16} />
          <AppText variant="h3">{garden.stardust}</AppText>
        </View>
      </View>
      <GardenScene garden={garden} />
      <View style={styles.progress}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${Math.min(100, (garden.stardust / [70, 180, 350, 600, 600][garden.level - 1]) * 100)}%`,
            },
          ]}
        />
      </View>
      <AppText variant="small" style={styles.progressLabel}>
        Garden level {garden.level} · study rewards never expire
      </AppText>
      <View style={styles.section}>
        <AppText variant="h2">Inventory</AppText>
        {garden.inventory.length ? (
          <View style={styles.grid}>
            {garden.inventory.map((entry) => {
              const item = shopItems.find(
                (reward) => reward.id === entry.rewardId,
              )!;
              return (
                <Pressable
                  key={entry.rewardId}
                  onPress={() => equipReward(item.id, item.slot)}
                  style={styles.tile}
                >
                  <View
                    style={[
                      styles.itemArt,
                      { backgroundColor: `${item.color}25` },
                    ]}
                  >
                    <Ionicons
                      name={
                        entry.equipped ? "checkmark-circle" : "leaf-outline"
                      }
                      size={26}
                      color={item.color}
                    />
                  </View>
                  <AppText variant="small" style={styles.itemName}>
                    {item.name}
                  </AppText>
                  <AppText
                    variant="small"
                    color={entry.equipped ? colors.mint : colors.faint}
                  >
                    {entry.equipped ? "Equipped" : "Tap to equip"}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        ) : (
          <Card>
            <AppText variant="muted">
              Complete a study session to discover your first garden item.
            </AppText>
          </Card>
        )}
      </View>
      <View style={styles.section}>
        <AppText variant="h2">Stardust shop</AppText>
        <AppText variant="small">
          No real money. Items are earned only through genuine study time.
        </AppText>
        <View style={styles.shop}>
          {shopItems
            .filter(
              (item) =>
                !garden.inventory.some((owned) => owned.rewardId === item.id),
            )
            .map((item) => (
              <Card key={item.id} style={styles.shopRow}>
                <View
                  style={[
                    styles.shopIcon,
                    { backgroundColor: `${item.color}20` },
                  ]}
                >
                  <Ionicons
                    name="sparkles-outline"
                    color={item.color}
                    size={22}
                  />
                </View>
                <View style={styles.flex}>
                  <AppText variant="h3">{item.name}</AppText>
                  <AppText variant="small">{item.description}</AppText>
                  <AppText variant="small" color={colors.gold}>
                    {item.cost} Stardust · Level {item.level}
                  </AppText>
                </View>
                <AppButton
                  variant="secondary"
                  disabled={
                    garden.stardust < item.cost || garden.level < item.level
                  }
                  onPress={() =>
                    Alert.alert(
                      "Bring this home?",
                      `${item.name} costs ${item.cost} Stardust.`,
                      [
                        { text: "Not yet", style: "cancel" },
                        {
                          text: "Purchase",
                          onPress: () => buyReward(item.id, item.cost),
                        },
                      ],
                    )
                  }
                >
                  Buy
                </AppButton>
              </Card>
            ))}
        </View>
      </View>
      <AppButton variant="ghost" onPress={() => router.push("/journal")}>
        Open study journal
      </AppButton>
    </Screen>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  dust: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    backgroundColor: "rgba(243,200,117,.1)",
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  progress: {
    height: 6,
    backgroundColor: "rgba(255,255,255,.06)",
    borderRadius: 6,
    overflow: "hidden",
    marginTop: 16,
  },
  progressFill: { height: "100%", backgroundColor: colors.mint },
  progressLabel: { textAlign: "center", marginTop: 8 },
  section: { marginTop: 28, gap: 12 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  tile: { width: "31%", minWidth: 96, gap: 5 },
  itemArt: {
    height: 78,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemName: { color: colors.cream, fontWeight: "700" },
  shop: { gap: 10 },
  shopRow: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14 },
  shopIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  flex: { flex: 1, gap: 3 },
});
