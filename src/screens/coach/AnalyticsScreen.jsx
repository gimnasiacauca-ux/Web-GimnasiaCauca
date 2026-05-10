import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { ATHLETES, PERF, ASISTENCIA } from "../../constants/data";
import { DISC_COLORS, pagoLabel, pagoColor } from "../../constants/theme";
import DiscBadge from "../../components/DiscBadge";
import Calendario from "../../components/Calendario";
import GraficaNiveles from "../../components/GraficaNiveles";

export default function AnalyticsScreen({ T }) {
  const [selAthlete, setSelAthlete] = useState(ATHLETES[0]);
  const [tab, setTab] = useState("general");

  const asistenciaAtleta = ASISTENCIA[selAthlete?.id] || {};

  return (
    <ScrollView style={[s.wrap, { backgroundColor: T.bg }]} contentContainerStyle={s.body}>
      {/* Athlete selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.selector}>
        {ATHLETES.map(at => (
          <TouchableOpacity key={at.id}
            style={[s.selBtn, {
              backgroundColor: selAthlete?.id === at.id ? T.secondary : T.card,
              borderColor: selAthlete?.id === at.id ? T.secondary : T.border
            }]}
            onPress={() => setSelAthlete(at)} activeOpacity={0.8}>
            <Text style={[s.selTxt, { color: selAthlete?.id === at.id ? "#fff" : T.text }]}>{at.nombre}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selAthlete && (
        <>
          {/* Profile card */}
          <View style={[s.profileCard, { backgroundColor: T.card, borderColor: T.border }]}>
            <View style={[s.avatarCircle, { backgroundColor: T.secondary }]}>
              <Text style={s.avatarTxt}>{selAthlete.nombre.charAt(0)}</Text>
            </View>
            <View style={s.profileInfo}>
              <Text style={[s.profileName, { color: T.text }]}>{selAthlete.nombre}</Text>
              <View style={{ flexDirection: "row", gap: 8, marginTop: 4 }}>
                <DiscBadge disciplina={selAthlete.disciplina} />
                <Text style={[s.pago, { color: pagoColor(selAthlete.estado_pago, T) }]}>
                  {pagoLabel[selAthlete.estado_pago]}
                </Text>
              </View>
              <Text style={[s.meta, { color: T.textMut }]}>{selAthlete.categoria} · Nivel {selAthlete.nivel} · {selAthlete.club}</Text>
            </View>
          </View>

          {/* Stats */}
          <View style={[s.statsRow, { backgroundColor: T.card, borderColor: T.border }]}>
            {[
              { label: "Asistencia", val: `${selAthlete.stats.asistencia}%`, color: T.success },
              { label: "Progreso",   val: `${selAthlete.stats.progreso}%`,   color: T.secondary },
              { label: "Cumpl.",     val: `${selAthlete.stats.cumplimiento}%`,color: T.blue },
            ].map(st => (
              <View key={st.label} style={s.statItem}>
                <Text style={[s.statVal, { color: st.color }]}>{st.val}</Text>
                <Text style={[s.statLbl, { color: T.textMut }]}>{st.label}</Text>
              </View>
            ))}
          </View>

          {/* Tabs */}
          <View style={[s.tabs, { borderBottomColor: T.border, backgroundColor: T.card }]}>
            {[["general","📊 General"], ["calendario","📅 Calendario"]].map(([id, lbl]) => (
              <TouchableOpacity key={id}
                style={[s.tab, tab === id && { borderBottomColor: T.secondary, borderBottomWidth: 2 }]}
                onPress={() => setTab(id)} activeOpacity={0.7}>
                <Text style={[s.tabTxt, { color: tab === id ? T.primary : T.textMut }]}>{lbl}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {tab === "general" && (
            <View style={[s.sectionCard, { backgroundColor: T.card, borderColor: T.border }]}>
              <Text style={[s.cardTitle, { color: T.text }]}>Niveles de rendimiento</Text>
              <GraficaNiveles T={T} />
            </View>
          )}

          {tab === "calendario" && (
            <View style={[s.sectionCard, { backgroundColor: T.card, borderColor: T.border }]}>
              <Text style={[s.cardTitle, { color: T.text }]}>Asistencia</Text>
              <Calendario asistencia={asistenciaAtleta} T={T} />
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap:        { flex: 1 },
  body:        { padding: 16, gap: 12, paddingBottom: 100 },
  selector:    { marginBottom: 4 },
  selBtn:      { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, marginRight: 8 },
  selTxt:      { fontSize: 13, fontWeight: "600" },
  profileCard: { borderRadius: 12, borderWidth: 1, padding: 14, flexDirection: "row", gap: 12 },
  avatarCircle:{ width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" },
  avatarTxt:   { color: "#fff", fontSize: 20, fontWeight: "700" },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 16, fontWeight: "700" },
  pago:        { fontSize: 11, fontWeight: "700" },
  meta:        { fontSize: 12, marginTop: 4 },
  statsRow:    { borderRadius: 12, borderWidth: 1, flexDirection: "row", padding: 14 },
  statItem:    { flex: 1, alignItems: "center" },
  statVal:     { fontSize: 20, fontWeight: "700" },
  statLbl:     { fontSize: 10, marginTop: 2 },
  tabs:        { flexDirection: "row", borderBottomWidth: 1 },
  tab:         { flex: 1, paddingVertical: 12, alignItems: "center", borderBottomWidth: 2, borderBottomColor: "transparent" },
  tabTxt:      { fontSize: 12, fontWeight: "700" },
  sectionCard: { borderRadius: 12, borderWidth: 1, padding: 14 },
  cardTitle:   { fontSize: 14, fontWeight: "700", marginBottom: 12 },
});
