import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DISC_COLORS } from "../constants/theme";

export default function DiscBadge({ code, small = false }) {
  const d = DISC_COLORS[code] || { label: code, bg: "#888", text: "#fff" };
  return (
    <View style={[s.badge, { backgroundColor: d.bg }, small && s.small]}>
      <Text style={[s.txt, { color: d.text }, small && s.smallTxt]}>{d.label.toUpperCase()}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  badge: { paddingHorizontal: 9, paddingVertical: 3, borderRadius: 4 },
  txt:   { fontSize: 10, fontWeight: "700", letterSpacing: 0.5 },
  small: { paddingHorizontal: 6, paddingVertical: 2 },
  smallTxt: { fontSize: 8 },
});
