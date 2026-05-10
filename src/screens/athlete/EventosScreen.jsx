import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { EVENTOS } from "../../constants/data";
import DiscBadge from "../../components/DiscBadge";

export default function EventosScreen({ user, T }) {
  const misIds = user?.eventos || [];

  return (
    <ScrollView style={[s.wrap, { backgroundColor: T.bg }]} contentContainerStyle={s.body}>
      <Text style={[s.pageTitle, { color: T.text }]}>Eventos</Text>

      {EVENTOS.map(ev => {
        const inscrito = misIds.includes(ev.id);
        return (
          <View key={ev.id} style={[s.card, { backgroundColor: T.card, borderColor: T.border }]}>
            <View style={[s.cardHeader, { backgroundColor: T.primary }]}>
              <Text style={s.evName}>{ev.nombre}</Text>
              {inscrito && (
                <View style={[s.badge, { backgroundColor: "#16A34A" }]}>
                  <Text style={s.badgeTxt}>INSCRITO</Text>
                </View>
              )}
            </View>
            <View style={s.body2}>
              <View style={s.metaRow}>
                <Text style={[s.meta, { color: T.textSec }]}>📅 {ev.fecha}</Text>
                <Text style={[s.diasBadge, { backgroundColor: T.secondaryLt, color: T.secondary }]}>
                  {ev.dias_faltantes} días
                </Text>
              </View>
              <Text style={[s.meta, { color: T.textSec }]}>📍 {ev.lugar}</Text>
              <Text style={[s.desc, { color: T.textMut }]}>{ev.descripcion}</Text>
              <View style={s.discRow}>
                {ev.disciplinas.map(d => <DiscBadge key={d} disciplina={d} />)}
              </View>
              {ev.url_inscripcion && (
                <TouchableOpacity style={[s.inscBtn, { backgroundColor: T.secondary }]}
                  onPress={() => Linking.openURL(ev.url_inscripcion)} activeOpacity={0.85}>
                  <Text style={s.inscTxt}>{inscrito ? "VER DETALLES →" : "INSCRIBIRSE →"}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap:       { flex: 1 },
  body:       { padding: 16, gap: 14, paddingBottom: 100 },
  pageTitle:  { fontSize: 20, fontWeight: "700", marginBottom: 4 },
  card:       { borderRadius: 14, borderWidth: 1, overflow: "hidden" },
  cardHeader: { padding: 14 },
  evName:     { fontSize: 15, fontWeight: "700", color: "#fff" },
  badge:      { alignSelf: "flex-start", marginTop: 6, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  badgeTxt:   { color: "#fff", fontSize: 10, fontWeight: "700" },
  body2:      { padding: 14, gap: 6 },
  metaRow:    { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  meta:       { fontSize: 13 },
  diasBadge:  { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12, fontSize: 12, fontWeight: "700" },
  desc:       { fontSize: 12, lineHeight: 18, marginTop: 4 },
  discRow:    { flexDirection: "row", gap: 6, marginTop: 6 },
  inscBtn:    { borderRadius: 8, paddingVertical: 10, alignItems: "center", marginTop: 8 },
  inscTxt:    { color: "#fff", fontWeight: "700", fontSize: 13 },
});
