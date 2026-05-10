import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { ATHLETES, todayISO, timeNow, getRecomendacion } from "../../constants/data";
import { INTENSIDAD_COLOR, DISC_COLORS, pagoLabel, pagoColor } from "../../constants/theme";
import DiscBadge from "../../components/DiscBadge";

const INTENSIDADES = ["Suave", "Media", "Fuerte", "Propio"];

export default function CampoScreen({ T }) {
  const [intensidad, setIntensidad] = useState("Media");
  const [sesiones, setSesiones] = useState({});
  const [sessionActive, setSessionActive] = useState(false);
  const [startTime] = useState(timeNow());

  const toggleAsistencia = (uid) => {
    setSesiones(s => ({ ...s, [uid]: !s[uid] }));
  };

  const presentes = Object.values(sesiones).filter(Boolean).length;

  return (
    <ScrollView style={[s.wrap, { backgroundColor: T.bg }]} contentContainerStyle={s.body}>
      {/* Session header */}
      <View style={[s.sessionCard, { backgroundColor: T.primary }]}>
        <View>
          <Text style={s.sessionTitle}>📍 Sesión de Campo</Text>
          <Text style={s.sessionDate}>{todayISO()} · {startTime}</Text>
        </View>
        <View style={[s.badge, { backgroundColor: sessionActive ? "#16A34A" : "#6B7280" }]}>
          <Text style={s.badgeTxt}>{sessionActive ? "ACTIVA" : "PREPARACIÓN"}</Text>
        </View>
      </View>

      {/* Intensity selector */}
      <View style={[s.sectionCard, { backgroundColor: T.card, borderColor: T.border }]}>
        <Text style={[s.sectionTitle, { color: T.text }]}>Intensidad del día</Text>
        <View style={s.chips}>
          {INTENSIDADES.map(i => {
            const col = INTENSIDAD_COLOR[i];
            return (
              <TouchableOpacity key={i}
                style={[s.chip, { borderColor: col.bg, backgroundColor: intensidad === i ? col.bg : "transparent" }]}
                onPress={() => setIntensidad(i)} activeOpacity={0.7}>
                <Text style={[s.chipTxt, { color: intensidad === i ? "#fff" : col.bg }]}>{i}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Athletes */}
      <View style={[s.sectionCard, { backgroundColor: T.card, borderColor: T.border }]}>
        <View style={s.rowBetween}>
          <Text style={[s.sectionTitle, { color: T.text }]}>Asistencia ({presentes}/{ATHLETES.length})</Text>
          <TouchableOpacity onPress={() => setSessionActive(true)} style={[s.startBtn, { backgroundColor: T.secondary }]} activeOpacity={0.8}>
            <Text style={s.startBtnTxt}>INICIAR</Text>
          </TouchableOpacity>
        </View>

        {ATHLETES.map(at => {
          const presente = !!sesiones[at.id];
          const rec = getRecomendacion(at);
          return (
            <TouchableOpacity key={at.id}
              style={[s.athleteRow, { borderBottomColor: T.border, backgroundColor: presente ? T.successLt || T.panel : "transparent" }]}
              onPress={() => toggleAsistencia(at.id)} activeOpacity={0.75}>
              <View style={[s.checkBox, {
                backgroundColor: presente ? T.success : "transparent",
                borderColor: presente ? T.success : T.border
              }]}>
                {presente && <Text style={s.checkMark}>✓</Text>}
              </View>
              <View style={s.athleteInfo}>
                <Text style={[s.athleteName, { color: T.text }]}>{at.nombre}</Text>
                <View style={s.metaRow}>
                  <DiscBadge disciplina={at.disciplina} />
                  <Text style={[s.metaTxt, { color: pagoColor(at.estado_pago, T) }]}>
                    {pagoLabel[at.estado_pago]}
                  </Text>
                </View>
              </View>
              <View style={s.stats}>
                <Text style={[s.stat, { color: T.textMut }]}>A {at.stats.asistencia}%</Text>
                <Text style={[s.stat, { color: T.textMut }]}>P {at.stats.progreso}%</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Recommendations */}
      <View style={[s.sectionCard, { backgroundColor: T.card, borderColor: T.border }]}>
        <Text style={[s.sectionTitle, { color: T.text }]}>Recomendaciones</Text>
        {ATHLETES.map(at => {
          const rec = getRecomendacion(at);
          return (
            <View key={at.id} style={[s.recRow, { borderLeftColor: T.secondary }]}>
              <Text style={[s.recName, { color: T.textSec }]}>{at.nombre}</Text>
              <Text style={[s.recTxt, { color: T.textMut }]}>{rec.txt}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap:         { flex: 1 },
  body:         { padding: 16, gap: 12, paddingBottom: 100 },
  sessionCard:  { borderRadius: 12, padding: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  sessionTitle: { fontSize: 16, fontWeight: "700", color: "#fff" },
  sessionDate:  { fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 4 },
  badge:        { borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4 },
  badgeTxt:     { color: "#fff", fontSize: 10, fontWeight: "700" },
  sectionCard:  { borderRadius: 12, borderWidth: 1, padding: 14 },
  sectionTitle: { fontSize: 14, fontWeight: "700", marginBottom: 12 },
  chips:        { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  chip:         { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1.5 },
  chipTxt:      { fontSize: 13, fontWeight: "600" },
  rowBetween:   { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  startBtn:     { borderRadius: 8, paddingHorizontal: 14, paddingVertical: 6 },
  startBtnTxt:  { color: "#fff", fontSize: 11, fontWeight: "700" },
  athleteRow:   { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, gap: 10 },
  checkBox:     { width: 22, height: 22, borderRadius: 5, borderWidth: 2, alignItems: "center", justifyContent: "center" },
  checkMark:    { color: "#fff", fontSize: 13, fontWeight: "700" },
  athleteInfo:  { flex: 1 },
  athleteName:  { fontSize: 13, fontWeight: "600" },
  metaRow:      { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 3 },
  metaTxt:      { fontSize: 10, fontWeight: "600" },
  stats:        { alignItems: "flex-end" },
  stat:         { fontSize: 11 },
  recRow:       { borderLeftWidth: 3, paddingLeft: 10, marginBottom: 10 },
  recName:      { fontSize: 12, fontWeight: "700" },
  recTxt:       { fontSize: 12, marginTop: 2, lineHeight: 17 },
});
