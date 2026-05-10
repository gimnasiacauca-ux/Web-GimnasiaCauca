import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { PERF, EVENTOS, getRecomendacion } from "../../constants/data";
import { DISC_COLORS, pagoLabel, pagoColor } from "../../constants/theme";
import DiscBadge from "../../components/DiscBadge";
import GraficaNiveles from "../../components/GraficaNiveles";

export default function DashboardScreen({ user, T }) {
  if (!user) return null;
  const rec = getRecomendacion(user);
  const misEventos = EVENTOS.filter(e => user.eventos?.includes(e.id));
  const last = PERF[PERF.length - 1];

  return (
    <ScrollView style={[s.wrap, { backgroundColor: T.bg }]} contentContainerStyle={s.body}>
      {/* Welcome */}
      <View style={[s.welcome, { backgroundColor: T.primary }]}>
        <View>
          <Text style={s.welHi}>Hola, {(user.displayNombre || user.nombre).split(" ")[0]} 👋</Text>
          <Text style={s.welSub}>{user.categoria} · {user.club}</Text>
        </View>
        <DiscBadge disciplina={user.disciplina} />
      </View>

      {/* Pago alert */}
      {user.estado_pago !== "activo" && (
        <View style={[s.alert, { backgroundColor: user.estado_pago === "mora" ? T.dangerLt : T.warnLt, borderColor: user.estado_pago === "mora" ? T.danger : T.warn }]}>
          <Text style={[s.alertTxt, { color: user.estado_pago === "mora" ? T.danger : T.warn }]}>
            ⚠️ Pago: {pagoLabel[user.estado_pago]} — Contacta a tu entrenador.
          </Text>
        </View>
      )}

      {/* Stats */}
      <View style={[s.statsCard, { backgroundColor: T.card, borderColor: T.border }]}>
        <Text style={[s.cardTitle, { color: T.text }]}>Mi rendimiento</Text>
        <View style={s.statsRow}>
          {[
            { l: "Asistencia", v: `${user.stats.asistencia}%`, c: T.success },
            { l: "Progreso",   v: `${user.stats.progreso}%`,   c: T.secondary },
            { l: "Cumpl.",     v: `${user.stats.cumplimiento}%`,c: T.blue },
          ].map(st => (
            <View key={st.l} style={s.statItem}>
              <Text style={[s.statVal, { color: st.c }]}>{st.v}</Text>
              <Text style={[s.statLbl, { color: T.textMut }]}>{st.l}</Text>
            </View>
          ))}
        </View>
        <GraficaNiveles T={T} />
      </View>

      {/* Recommendation */}
      <View style={[s.recCard, {
        backgroundColor: T.card, borderColor: T.border,
        borderLeftColor: rec.tipo === "felicitacion" ? T.success : rec.tipo === "atencion" ? T.danger : T.warn,
      }]}>
        <Text style={[s.recTitle, { color: T.text }]}>
          {rec.tipo === "felicitacion" ? "🏆" : rec.tipo === "atencion" ? "⚠️" : "📌"} Recomendación
        </Text>
        <Text style={[s.recTxt, { color: T.textSec }]}>{rec.txt}</Text>
      </View>

      {/* Upcoming events */}
      {misEventos.length > 0 && (
        <View style={[s.card, { backgroundColor: T.card, borderColor: T.border }]}>
          <Text style={[s.cardTitle, { color: T.text }]}>Mis eventos</Text>
          {misEventos.map(ev => (
            <View key={ev.id} style={[s.evRow, { borderLeftColor: T.secondary }]}>
              <Text style={[s.evName, { color: T.text }]}>{ev.nombre}</Text>
              <Text style={[s.evMeta, { color: T.textMut }]}>📅 {ev.fecha} · 📍 {ev.lugar}</Text>
              <Text style={[s.evDias, { color: T.secondary }]}>{ev.dias_faltantes} días</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap:      { flex: 1 },
  body:      { padding: 16, gap: 12, paddingBottom: 100 },
  welcome:   { borderRadius: 12, padding: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  welHi:     { fontSize: 18, fontWeight: "700", color: "#fff" },
  welSub:    { fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 4 },
  alert:     { borderRadius: 10, padding: 12, borderWidth: 1 },
  alertTxt:  { fontSize: 13, fontWeight: "600" },
  statsCard: { borderRadius: 12, borderWidth: 1, padding: 16 },
  cardTitle: { fontSize: 15, fontWeight: "700", marginBottom: 12 },
  statsRow:  { flexDirection: "row", marginBottom: 16 },
  statItem:  { flex: 1, alignItems: "center" },
  statVal:   { fontSize: 22, fontWeight: "700" },
  statLbl:   { fontSize: 10, marginTop: 2 },
  recCard:   { borderRadius: 12, borderWidth: 1, borderLeftWidth: 4, padding: 14 },
  recTitle:  { fontSize: 14, fontWeight: "700", marginBottom: 6 },
  recTxt:    { fontSize: 13, lineHeight: 19 },
  card:      { borderRadius: 12, borderWidth: 1, padding: 14 },
  evRow:     { borderLeftWidth: 3, paddingLeft: 10, marginBottom: 10 },
  evName:    { fontSize: 14, fontWeight: "600" },
  evMeta:    { fontSize: 12, marginTop: 2 },
  evDias:    { fontSize: 12, fontWeight: "700", marginTop: 4 },
});
