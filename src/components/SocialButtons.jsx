import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { WA_URL, IG_URL, WEB_URL } from "../constants/data";

export default function SocialButtons({ T, compact = false }) {
  const BTNS = [
    { label: "WhatsApp",  icon: "📱", color: "#25D366", url: WA_URL },
    { label: "Instagram", icon: "📸", color: "#E1306C", url: IG_URL },
    { label: "Web",       icon: "🌐", color: T.primary, url: WEB_URL },
  ];
  return (
    <View style={s.row}>
      {BTNS.map(b => (
        <TouchableOpacity key={b.label} onPress={() => Linking.openURL(b.url)}
          style={[s.btn, { backgroundColor: b.color }, compact && s.compact]} activeOpacity={0.8}>
          <Text style={s.icon}>{b.icon}</Text>
          <Text style={[s.lbl, compact && s.compactLbl]}>{b.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  row:       { flexDirection: "row", gap: 8 },
  btn:       { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5, paddingVertical: 11, borderRadius: 8 },
  compact:   { paddingVertical: 8 },
  icon:      { fontSize: 14 },
  lbl:       { color: "#fff", fontWeight: "600", fontSize: 13 },
  compactLbl:{ fontSize: 11 },
});
