import { useState } from "react";
import { Alert, Share, StyleSheet, Switch, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "@/src/components/ui/Screen";
import { AppText } from "@/src/components/ui/AppText";
import { AppButton } from "@/src/components/ui/AppButton";
import { Field } from "@/src/components/ui/Field";
import { Card } from "@/src/components/ui/Card";
import { audioTracks } from "@/src/data/audioTracks";
import { useOrbitStore } from "@/src/store/useOrbitStore";
import { colors } from "@/src/theme";

function SettingRow({
  title,
  copy,
  value,
  onValueChange,
}: {
  title: string;
  copy: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.setting}>
      <View style={styles.flex}>
        <AppText variant="h3">{title}</AppText>
        <AppText variant="small">{copy}</AppText>
      </View>
      <Switch
        accessibilityLabel={title}
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.faint, true: colors.moss }}
        thumbColor={value ? colors.mint : colors.cream}
      />
    </View>
  );
}
export default function SettingsScreen() {
  const {
    profile,
    settings,
    updateSettings,
    exportData,
    importData,
    clearAllData,
  } = useOrbitStore();
  const [importText, setImportText] = useState("");
  const [showImport, setShowImport] = useState(false);
  const doImport = () => {
    const ok = importData(importText);
    Alert.alert(
      ok ? "Garden imported" : "Could not import",
      ok
        ? "Your local data was restored."
        : "That text is not a valid Orbit Garden export. Nothing was changed.",
    );
    if (ok) setShowImport(false);
  };
  return (
    <Screen>
      <Card style={styles.profile}>
        <View style={styles.avatar}>
          <AppText variant="h2" color={colors.ink}>
            {(profile.nickname || "S").slice(0, 1).toUpperCase()}
          </AppText>
        </View>
        <View style={styles.flex}>
          <AppText variant="h2">
            {profile.nickname || "Student gardener"}
          </AppText>
          <AppText variant="small">
            Grade {profile.grade} · {profile.preferredMinutes}-minute preferred
            sessions
          </AppText>
        </View>
      </Card>
      <View style={styles.section}>
        <AppText variant="h2">Accessibility</AppText>
        <Card style={styles.rows}>
          <SettingRow
            title="Reduced motion"
            copy="Stops nonessential movement and celebration effects."
            value={settings.reducedMotion}
            onValueChange={(reducedMotion) => updateSettings({ reducedMotion })}
          />
          <SettingRow
            title="High contrast"
            copy="Strengthens borders and text contrast."
            value={settings.highContrast}
            onValueChange={(highContrast) => updateSettings({ highContrast })}
          />
          <SettingRow
            title="Haptics"
            copy="Gentle vibration for timer transitions on supported devices."
            value={settings.haptics}
            onValueChange={(haptics) => updateSettings({ haptics })}
          />
        </Card>
      </View>
      <View style={styles.section}>
        <AppText variant="h2">Audio credits</AppText>
        <Card style={styles.audio}>
          {audioTracks
            .filter((track) => track.asset)
            .map((track) => (
              <View key={track.id}>
                <AppText variant="h3">{track.name}</AppText>
                <AppText variant="small">{track.license}</AppText>
              </View>
            ))}
          <AppText variant="small">
            All three loops were generated specifically for this project. No
            popular or copyrighted music is included.
          </AppText>
        </Card>
      </View>
      <View style={styles.section}>
        <AppText variant="h2">Privacy & local data</AppText>
        <Card style={styles.privacy}>
          <Ionicons
            name="shield-checkmark-outline"
            color={colors.mint}
            size={25}
          />
          <View style={styles.flex}>
            <AppText variant="h3">
              Your school life stays on this device
            </AppText>
            <AppText variant="small">
              Orbit Garden uses versioned local storage. It has no account,
              analytics, cloud database, or school login. External resources
              open separately, and the app never asks for College Board
              credentials.
            </AppText>
          </View>
        </Card>
        <View style={styles.actions}>
          <AppButton
            variant="secondary"
            onPress={() =>
              Share.share({
                title: "Orbit Garden data export",
                message: exportData(),
              })
            }
          >
            Export my data
          </AppButton>
          <AppButton
            variant="secondary"
            onPress={() => setShowImport(!showImport)}
          >
            Import an export
          </AppButton>
          {showImport ? (
            <Card style={styles.import}>
              <Field
                label="Paste exported JSON"
                value={importText}
                onChangeText={setImportText}
                multiline
                placeholder="Paste an Orbit Garden data export here"
              />
              <AppButton disabled={!importText.trim()} onPress={doImport}>
                Validate and import
              </AppButton>
            </Card>
          ) : null}
          <AppButton
            variant="danger"
            onPress={() =>
              Alert.alert(
                "Clear every local record?",
                "This removes courses, assignments, sessions, reviews, rewards, and settings from this device. It cannot be undone.",
                [
                  { text: "Keep my garden", style: "cancel" },
                  {
                    text: "Clear all data",
                    style: "destructive",
                    onPress: async () => {
                      await clearAllData();
                      router.replace("/onboarding");
                    },
                  },
                ],
              )
            }
          >
            Clear all local data
          </AppButton>
        </View>
      </View>
      <View style={styles.section}>
        <AppText variant="h2">About</AppText>
        <AppText variant="small">
          Orbit Garden is a student project for Hack Club Sunbeam and Stardance.
          It does not guarantee grades, test scores, or learning outcomes.
          Resource pricing and availability can change.
        </AppText>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  profile: { flexDirection: "row", gap: 12, alignItems: "center" },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.mint,
    alignItems: "center",
    justifyContent: "center",
  },
  flex: { flex: 1, gap: 3 },
  section: { marginTop: 26, gap: 11 },
  rows: { paddingVertical: 5 },
  setting: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  audio: { gap: 12 },
  privacy: { flexDirection: "row", gap: 12 },
  actions: { gap: 9 },
  import: { gap: 10 },
});
