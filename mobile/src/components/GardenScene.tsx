import { StyleSheet, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient as SvgGradient,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from "react-native-svg";
import { Sprig } from "./Sprig";
import type { GardenState } from "@/src/types";
import { colors, radius } from "@/src/theme";

export function GardenScene({
  garden,
  compact = false,
  demo = false,
}: {
  garden: GardenState;
  compact?: boolean;
  demo?: boolean;
}) {
  const equipped = garden.equipped;
  return (
    <View
      style={[styles.wrap, compact && styles.compact]}
      accessible
      accessibilityLabel={`Sprig's garden, level ${garden.level}${demo ? ", demo data" : ""}`}
    >
      <Svg
        style={StyleSheet.absoluteFill}
        viewBox="0 0 400 260"
        preserveAspectRatio="xMidYMid slice"
      >
        <Defs>
          <RadialGradient id="sky">
            <Stop offset="0" stopColor="#293058" />
            <Stop offset="1" stopColor="#0B0F26" />
          </RadialGradient>
          <SvgGradient id="planet" x1="0" y1="0" x2="1" y2="1">
            <Stop stopColor="#8DAF8B" />
            <Stop offset="1" stopColor="#405D52" />
          </SvgGradient>
        </Defs>
        <Rect width="400" height="260" fill="url(#sky)" />
        {Array.from({ length: 22 }, (_, i) => (
          <Circle
            key={i}
            cx={(i * 71) % 395}
            cy={(i * 43) % 155}
            r={i % 4 === 0 ? 1.6 : 0.9}
            fill="white"
            opacity={0.2 + (i % 3) * 0.15}
          />
        ))}
        {equipped.skyEffect ? (
          <G>
            {Array.from({ length: 5 }, (_, i) => (
              <Path
                key={i}
                d={`M${40 + i * 75} ${20 + i * 8}l30 18`}
                stroke={colors.cream}
                strokeWidth="2"
                opacity=".45"
              />
            ))}
          </G>
        ) : null}
        <Ellipse cx="200" cy="252" rx="235" ry="105" fill="url(#planet)" />
        <Path
          d="M0 226q80-40 160-3t160 0q40-17 80-3v45H0z"
          fill="#62836B"
          opacity=".55"
        />
        {equipped.largeStructure ? (
          <G>
            <Path d="M280 190a40 40 0 0180 0" fill="#76839A" />
            <Rect x="280" y="190" width="80" height="45" fill="#505A70" />
            <Path d="M318 150l25-24" stroke={colors.cream} strokeWidth="5" />
            <Circle cx="347" cy="122" r="12" fill="#9CC5D7" />
          </G>
        ) : null}
        {equipped.bookshelf ? (
          <G>
            <Rect x="40" y="157" width="72" height="74" rx="5" fill="#775A47" />
            <Path d="M48 178h56M48 202h56" stroke="#B78967" strokeWidth="4" />
            {[54, 65, 79, 91].map((x, i) => (
              <Rect
                key={x}
                x={x}
                y="162"
                width="7"
                height="15"
                fill={[colors.pink, colors.gold, colors.violet, colors.mint][i]}
              />
            ))}
          </G>
        ) : null}
        {equipped.desk ? (
          <G>
            <Rect
              x="137"
              y="196"
              width="105"
              height="10"
              rx="4"
              fill="#89674E"
            />
            <Rect x="148" y="205" width="8" height="30" fill="#6A4F3D" />
            <Rect x="224" y="205" width="8" height="30" fill="#6A4F3D" />
          </G>
        ) : null}
        {equipped.lamp ? (
          <G>
            <Path d="M229 196v-35" stroke="#D9B667" strokeWidth="4" />
            <Path d="M214 162h30l-7-16h-16z" fill={colors.gold} />
            <Circle cx="229" cy="163" r="22" fill={colors.gold} opacity=".1" />
          </G>
        ) : null}
        {equipped.leftPlant ? (
          <G>
            <Path d="M132 226v-38" stroke="#315843" strokeWidth="4" />
            <Ellipse
              cx="122"
              cy="193"
              rx="10"
              ry="19"
              fill={colors.mint}
              transform="rotate(-36 122 193)"
            />
            <Ellipse
              cx="141"
              cy="181"
              rx="9"
              ry="18"
              fill="#6EC6A1"
              transform="rotate(32 141 181)"
            />
            <Path d="M118 225h28l-4 16h-20z" fill="#9C7160" />
          </G>
        ) : null}
        {equipped.rightPlant ? (
          <G>
            <Path d="M260 231v-35" stroke="#315843" strokeWidth="4" />
            <Circle cx="252" cy="194" r="11" fill={colors.pink} />
            <Circle cx="268" cy="190" r="10" fill="#E4B4C2" />
            <Circle cx="260" cy="180" r="9" fill={colors.gold} />
          </G>
        ) : null}
      </Svg>
      <View style={[styles.sprig, compact && styles.sprigCompact]}>
        <Sprig
          size={compact ? 115 : 145}
          state="reading"
          accessory={Boolean(equipped.sprigAccessory)}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: {
    height: 260,
    borderRadius: radius.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  compact: { height: 205 },
  sprig: { position: "absolute", bottom: 3, left: "50%", marginLeft: -72 },
  sprigCompact: { marginLeft: -56, bottom: 0 },
});
