import { StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Screen } from "@/src/components/ui/Screen";
import { AppText } from "@/src/components/ui/AppText";
import { AppButton } from "@/src/components/ui/AppButton";
import { GardenScene } from "@/src/components/GardenScene";
import { demoData } from "@/src/data/demoData";
import { shopItems } from "@/src/data/shopItems";
import { useOrbitStore } from "@/src/store/useOrbitStore";

export default function PlaceRewardScreen() {
  const params = useLocalSearchParams<{ demo?: string; rewardId?: string }>();
  const isDemo = params.demo === "true";
  const garden = useOrbitStore((state) => state.garden);
  const equip = useOrbitStore((state) => state.equipReward);
  const clear = useOrbitStore((state) => state.clearPendingReward);
  const rewardId = isDemo ? params.rewardId : garden.pendingRewardId;
  const reward = shopItems.find((item) => item.id === rewardId);
  const previewGarden =
    isDemo && reward
      ? {
          ...demoData.garden!,
          equipped: { ...demoData.garden!.equipped, [reward.slot]: reward.id },
        }
      : garden;
  const place = () => {
    if (reward && !isDemo) {
      equip(reward.id, reward.slot);
      clear();
    }
    router.replace(isDemo ? "/demo" : "/(tabs)/garden");
  };
  return (
    <Screen contentStyle={styles.center}>
      <GardenScene garden={previewGarden} demo={isDemo} />
      <AppText variant="eyebrow">
        {isDemo ? "Demo preview" : "New garden item"}
      </AppText>
      <AppText variant="h1">{reward?.name ?? "A garden surprise"}</AppText>
      <AppText variant="muted" style={styles.text}>
        {reward?.description ?? "Your item is ready for the garden."}
      </AppText>
      <AppButton onPress={place}>
        {isDemo
          ? "Return to demo planet"
          : `Place in ${reward?.slot ?? "garden"}`}
      </AppButton>
      <AppButton
        variant="ghost"
        onPress={() => router.replace(isDemo ? "/demo" : "/(tabs)/home")}
      >
        {isDemo ? "Exit demo" : "Place later"}
      </AppButton>
    </Screen>
  );
}
const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center", gap: 14 },
  text: { textAlign: "center", maxWidth: 430 },
});
