import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useOrbitStore } from "@/src/store/useOrbitStore";
import { colors } from "@/src/theme";

export default function Index() {
  const hydrated = useOrbitStore((state) => state.hydrated);
  const onboarded = useOrbitStore((state) => state.profile.onboarded);
  if (!hydrated)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.ink,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color={colors.mint} />
      </View>
    );
  return <Redirect href={onboarded ? "/(tabs)/home" : "/onboarding"} />;
}
