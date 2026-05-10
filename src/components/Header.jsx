import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LogoLCG from "./LogoLCG";

export default function Header({ user, onMenu, onLogout, onMiCuenta, T }) {
  const initial = (user?.displayNombre || user?.nombre || "?").charAt(0).toUpperCase();
  return (
    <View style={[s.wrap, { backgroundColor: T.primary }]}>
      <View style={[s.logoBox, { backgroundColor: "#fff" }]}>
        <LogoLCG size={26} />
      </View>
      <View style={s.titles}>
        <Text style={s.title}>APP GIMNASIA CAUCA</Text>
        <Text style={s.sub}>LIGA CAUCANA DE GIMNASIA · POPAYÁN · CAUCA</Text>
      </View>
      <View style={s.actions}>
        <TouchableOpacity onPress={onMiCuenta} style={[s.avatar, { backgroundColor: "#FF5F03" }]} activeOpacity={0.8}>
          <Text style={s.avatarTxt}>{initial}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLogout} style={s.exitBtn} activeOpacity={0.8}>
          <Text style={s.exitIcon}>🚪</Text>
          <Text style={s.exitTxt}>SALIR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onMenu} style={s.menuBtn} activeOpacity={0.8}>
          {[0,1,2].map(i => <View key={i} style={s.bar} />)}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap:     { flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 8, gap: 8 },
  logoBox:  { borderRadius: 6, padding: 2 },
  titles:   { flex: 1 },
  title:    { fontSize: 13, fontWeight: "700", color: "#fff", letterSpacing: 0.5 },
  sub:      { fontSize: 7, color: "rgba(255,255,255,0.75)", letterSpacing: 1, marginTop: 2 },
  actions:  { flexDirection: "row", alignItems: "center", gap: 4 },
  avatar:   { width: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  avatarTxt:{ color: "#fff", fontWeight: "700", fontSize: 13 },
  exitBtn:  { flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: "rgba(220,38,38,0.95)", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 5 },
  exitIcon: { fontSize: 12 },
  exitTxt:  { fontSize: 9, fontWeight: "700", color: "#fff" },
  menuBtn:  { backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 6, padding: 6, gap: 3 },
  bar:      { width: 16, height: 2, backgroundColor: "#fff", borderRadius: 1 },
});
