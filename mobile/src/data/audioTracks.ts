import type { AudioTrack } from "@/src/types";

export const audioTracks: AudioTrack[] = [
  {
    id: "none",
    name: "No Audio",
    description: "Quiet mode",
    license: "No audio",
  },
  {
    id: "rainy-library",
    name: "Rainy Library",
    description: "Soft filtered rain-like texture",
    asset: require("@/assets/audio/rainy-library.m4a"),
    license:
      "Original procedural audio generated for Orbit Garden, MIT License",
  },
  {
    id: "quiet-observatory",
    name: "Quiet Observatory",
    description: "Low, gentle harmonic hum",
    asset: require("@/assets/audio/quiet-observatory.m4a"),
    license:
      "Original procedural audio generated for Orbit Garden, MIT License",
  },
  {
    id: "brown-noise",
    name: "Brown Noise",
    description: "Warm low-frequency noise",
    asset: require("@/assets/audio/brown-noise.m4a"),
    license:
      "Original procedural audio generated for Orbit Garden, MIT License",
  },
];
