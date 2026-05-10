import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { EVENTOS } from "../../constants/data";
import LogoLCG from "../../components/LogoLCG";
import SocialButtons from "../../components/SocialButtons";
import DiscBadge from "../../components/DiscBadge";

export default function InicioScreen({ T }) {
  return (
    <ScrollView style={[s.wrap, { backgroundColor: T.bg }]} contentContainerStyle={s.body}>
      {/* Hero */}
      <View style={[s.hero, { backgroundColor: T.primary }]}>
        <View style={s.logoBox}>
          <LogoLCG size={44} />
        </View>
        <Text style={s.heroTitle}>Liga Caucana de Gimnasia</Text>
        <Text style={s.heroSub}>Popayán · Cauca · Colombia</Text>
        <Text style={s.heroDesc}>
          Formando atletas de disciplinas urbanas: Parkour, Porrismo, BrakeDance, Calistenia y Gimnasia.
        </Text>
        <SocialButtons />
      </View>

      {/* Disciplines */}
      <Text style={[s.sectionTitle, { color: T.text }]}>Disciplinas</Text>
      <View style={s.discGrid}>
        {[
          { cod: "PKR", icon: "🏃", desc: "Parkour" },
          { cod: "POR", icon: "🎀", desc: "Porrismo" },
          { cod: "BRK", icon: "💃", desc: "BrakeDance" },
          { cod: "CAL", icon: "🏋️", desc: "Calistenia" },
          { cod: "GIM", icon: "🤸", desc: "Gimnasia" },
        ].map(d => (
          <View key={d.cod} style={[s.discCard, { backgroundColor: T.card, borderColor: T.border }]}>
            <Text style={s.discIcon}>{d.icon}</Text>
            <DiscBadge disciplina={d.cod} />
          </View>
        ))}
      </View>

      {/* Upcoming events */}
      <Text style={[s.sectionTitle, { color: T.text }]}>Próximos eventos</Text>
      {EVENTOS.map(ev => (
        <View key={ev.id} style={[s.evCard, { backgroundColor: T.card, borderColor: T.border, borderLeftColor: T.secondary }]}>
          <Text style={[s.evName, { color: T.text }]}>{ev.nombre}</Text>
          <Text style={[s.evMeta, { color: T.textMut }]}>📅 {ev.fecha} · 📍 {ev.lugar}</Text>
          <Text style={[s.evDias, { color: T.secondary }]}>{ev.dias_faltantes} días para el evento</Text>
        </View>
      ))}

      <Text style={[s.footer, { color: T.textMut }]}>
        ¿Quieres ser parte? Regístrate en la app o contáctanos.
      </Text>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap:         { flex: 1 },
  body:         { paddingBottom: 100 },
  hero:         { padding: 24, alignItems: "center", gap: 8, paddingBottom: 28 },
  logoBox:      { backgroundColor: "#fff", borderRadius: 14, padding: 8, marginBottom: 8 },
  heroTitle:    { fontSize: 18, fontWeight: "700", color: "#fff", textAlign: "center" },
  heroSub:      { fontSize: 11, color: "rgba(255,255,255,0.7)" },
  heroDesc:     { fontSize: 13, color: "rgba(255,255,255,0.85)", textAlign: "center", lineHeight: 20, marginTop: 6 },
  sectionTitle: { fontSize: 15, fontWeight: "700", marginTop: 20, marginHorizontal: 16, marginBottom: 10 },
  discGrid:     { flexDirection: "row", flexWrap: "wrap", gap: 10, paddingHorizontal: 16 },
  discCard:     { width: "30%", borderRadius: 12, borderWidth: 1, padding: 12, alignItems: "center", gap: 8 },
  discIcon:     { fontSize: 28 },
  evCard:       { marginHorizontal: 16, marginBottom: 10, borderRadius: 10, borderWidth: 1, borderLeftWidth: 4, padding: 14 },
  evName:       { fontSize: 14, fontWeight: "700" },
  evMeta:       { fontSize: 12, marginTop: 4 },
  evDias:       { fontSize: 12, fontWeight: "700", marginTop: 4 },
  footer:       { textAlign: "center", padding: 20, fontSize: 12, lineHeight: 18 },
});
