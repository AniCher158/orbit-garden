import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Screen } from "@/src/components/ui/Screen";
import { AppText } from "@/src/components/ui/AppText";
import { AppButton } from "@/src/components/ui/AppButton";
import { Card } from "@/src/components/ui/Card";
import { studyMethods } from "@/src/data/studyMethods";
import { colors } from "@/src/theme";

export default function MethodsScreen() {
  return (
    <Screen>
      <AppText variant="muted">
        Methods are options to try—not guarantees or rules that work for
        everyone.
      </AppText>
      <View style={styles.list}>
        {studyMethods.map((method) => (
          <Card key={method.id} style={styles.card}>
            <AppText variant="eyebrow">
              {method.minutes.join(" / ")} minutes
            </AppText>
            <AppText variant="h2">{method.name}</AppText>
            <AppText>{method.explanation}</AppText>
            <View style={styles.line}>
              <AppText variant="small" color={colors.mint}>
                Often useful for
              </AppText>
              <AppText variant="small">{method.bestFor}</AppText>
            </View>
            <View style={styles.line}>
              <AppText variant="small" color={colors.gold}>
                Try something else when
              </AppText>
              <AppText variant="small">{method.notIdealFor}</AppText>
            </View>
            <View style={styles.steps}>
              {method.steps.map((step, index) => (
                <View key={step} style={styles.step}>
                  <View style={styles.number}>
                    <AppText variant="small" color={colors.ink}>
                      {index + 1}
                    </AppText>
                  </View>
                  <AppText variant="small" style={styles.flex}>
                    {step}
                  </AppText>
                </View>
              ))}
            </View>
            <AppText variant="small">Example: {method.example}</AppText>
            <AppText variant="small" color={colors.pink}>
              Common mistake: {method.commonMistake}
            </AppText>
            <AppButton
              variant="secondary"
              onPress={() =>
                router.push({
                  pathname: "/study/setup",
                  params: { methodId: method.id },
                })
              }
            >
              Start this method
            </AppButton>
          </Card>
        ))}
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  list: { gap: 14, marginTop: 18 },
  card: { gap: 10 },
  line: { gap: 2 },
  steps: { gap: 7 },
  step: { flexDirection: "row", gap: 9, alignItems: "center" },
  number: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.mint,
    alignItems: "center",
    justifyContent: "center",
  },
  flex: { flex: 1 },
});
