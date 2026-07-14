import { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import Slider from "@react-native-community/slider";
import { useAudioPlayer } from "expo-audio";
import { Ionicons } from "@expo/vector-icons";
import { audioTracks } from "@/src/data/audioTracks";
import { useOrbitStore } from "@/src/store/useOrbitStore";
import { AppText } from "./ui/AppText";
import { colors } from "@/src/theme";

export function SessionAudio({
  trackId,
  active,
}: {
  trackId: string;
  active: boolean;
}) {
  const settings = useOrbitStore((state) => state.settings);
  const updateSettings = useOrbitStore((state) => state.updateSettings);
  const track = audioTracks.find((item) => item.id === trackId);
  const player = useAudioPlayer(track?.asset ?? null);
  const muted = settings.volume === 0;
  const [webPlaying, setWebPlaying] = useState(false);
  useEffect(() => {
    player.loop = true;
    player.volume = settings.volume;
    if (Platform.OS !== "web" && active && track?.asset) player.play();
    if (!active) {
      player.pause();
      setWebPlaying(false);
    }
    return () => player.pause();
  }, [active, player, settings.volume, track?.asset]);
  if (!track?.asset) return null;
  const toggleWebPlayback = () => {
    if (webPlaying) player.pause();
    else player.play();
    setWebPlaying(!webPlaying);
  };
  return (
    <View style={styles.row}>
      {Platform.OS === "web" ? (
        <Pressable
          onPress={toggleWebPlayback}
          accessibilityLabel={
            webPlaying ? "Pause study sound" : "Play study sound"
          }
        >
          <Ionicons
            name={webPlaying ? "pause-circle" : "play-circle"}
            color={colors.mint}
            size={25}
          />
        </Pressable>
      ) : null}
      <Pressable
        onPress={() => updateSettings({ volume: muted ? 0.45 : 0 })}
        accessibilityLabel={muted ? "Unmute study audio" : "Mute study audio"}
      >
        <Ionicons
          name={muted ? "volume-mute-outline" : "volume-medium-outline"}
          color={colors.mint}
          size={22}
        />
      </Pressable>
      <View style={styles.copy}>
        <AppText variant="small" color={colors.cream}>
          {track.name}
          {Platform.OS === "web" && !webPlaying ? " · tap play" : ""}
        </AppText>
        <Slider
          accessibilityLabel="Study audio volume"
          minimumValue={0}
          maximumValue={1}
          value={settings.volume}
          onValueChange={(volume) => updateSettings({ volume })}
          minimumTrackTintColor={colors.mint}
          maximumTrackTintColor={colors.faint}
          thumbTintColor={colors.cream}
          style={styles.slider}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12, width: "100%" },
  copy: { flex: 1 },
  slider: { height: 32, marginHorizontal: -4 },
});
