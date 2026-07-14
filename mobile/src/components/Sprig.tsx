import Svg, { Circle, Ellipse, G, Path, Rect } from "react-native-svg";
import { colors } from "@/src/theme";

export function Sprig({
  size = 150,
  state = "reading",
  accessory = false,
}: {
  size?: number;
  state?:
    "reading" | "writing" | "typing" | "gardening" | "celebrating" | "idle";
  accessory?: boolean;
}) {
  const armY = state === "celebrating" ? 53 : 77;
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      accessibilityLabel={`Sprig is ${state}`}
      role="img"
    >
      <Ellipse cx="80" cy="140" rx="47" ry="9" fill="#050714" opacity=".35" />
      <Path
        d="M65 37C52 25 58 10 67 5c2 12 10 18 17 24"
        fill={colors.mint}
        stroke="#416F5C"
        strokeWidth="3"
      />
      <Path
        d="M95 37c13-12 7-27-2-32-2 12-10 18-17 24"
        fill={colors.mint}
        stroke="#416F5C"
        strokeWidth="3"
      />
      <Ellipse
        cx="80"
        cy="86"
        rx="43"
        ry="47"
        fill="#7EB99B"
        stroke="#B7E3C9"
        strokeWidth="3"
      />
      <Ellipse cx="64" cy="73" rx="5" ry="7" fill={colors.ink} />
      <Ellipse cx="96" cy="73" rx="5" ry="7" fill={colors.ink} />
      <Circle cx="62.5" cy="71" r="1.7" fill="white" />
      <Circle cx="94.5" cy="71" r="1.7" fill="white" />
      <Path
        d="M72 88q8 7 16 0"
        fill="none"
        stroke="#345443"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <Path
        d="M80 98l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"
        fill={colors.gold}
        opacity=".9"
      />
      <Path
        d={`M42 74Q27 ${armY} 25 ${state === "celebrating" ? 42 : 92}`}
        fill="none"
        stroke="#7EB99B"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <Path
        d={`M118 74Q133 ${armY} 135 ${state === "celebrating" ? 42 : 92}`}
        fill="none"
        stroke="#7EB99B"
        strokeWidth="12"
        strokeLinecap="round"
      />
      {state === "reading" ? (
        <G>
          <Path d="M40 101q20-10 40 2v30q-20-12-40-2z" fill="#DFB9C5" />
          <Path d="M120 101q-20-10-40 2v30q20-12 40-2z" fill="#CBBEF3" />
          <Path d="M80 103v30" stroke={colors.cream} strokeWidth="2" />
        </G>
      ) : null}
      {state === "typing" ? (
        <G>
          <Rect x="39" y="106" width="82" height="30" rx="5" fill="#313957" />
          <Rect
            x="48"
            y="112"
            width="64"
            height="14"
            rx="2"
            fill="#7FB7D1"
            opacity=".35"
          />
        </G>
      ) : null}
      {state === "writing" ? (
        <G>
          <Path d="M46 105h72v30H46z" fill={colors.cream} />
          <Path d="M72 115h28M72 122h20" stroke="#8B8DA0" strokeWidth="2" />
          <Path d="M105 98l-20 25" stroke={colors.gold} strokeWidth="4" />
        </G>
      ) : null}
      {accessory ? (
        <G>
          <Path d="M110 98q18 4 18 24v19h-31v-26q0-17 13-17z" fill="#A8784B" />
          <Circle cx="111" cy="121" r="4" fill={colors.gold} />
        </G>
      ) : null}
    </Svg>
  );
}
