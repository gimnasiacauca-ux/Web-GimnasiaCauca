import React from "react";
import { View } from "react-native";
import Svg, { Rect, Defs, LinearGradient, Stop, Polygon } from "react-native-svg";

export default function LogoLCG({ size = 40 }) {
  const id = `lcg${size}`;
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 500 500">
        <Rect width="500" height="500" fill="#FFFFFF" rx="60" />
        <Defs>
          <LinearGradient id={id} x1="80" y1="50" x2="420" y2="460" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#A4C200" />
            <Stop offset="100%" stopColor="#E2C000" />
          </LinearGradient>
        </Defs>
        <Polygon fill={`url(#${id})`} points="65,420 65,370 195,370 195,190 140,190 245,55 245,135 255,135 255,55 360,55 245,190 300,190 300,370 245,370 245,420" />
        <Polygon fill={`url(#${id})`} points="195,210 195,280 435,280 435,210" />
        <Polygon fill={`url(#${id})`} points="300,300 300,370 355,370 355,445 410,445 355,300" />
      </Svg>
    </View>
  );
}
