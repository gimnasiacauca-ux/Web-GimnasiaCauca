import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { EVENTOS } from "../../constants/data";
import DiscBadge from "../../components/DiscBadge";

export default function EventosScreen({ T }) {
  return (
    <ScrollView style={[s.wrap, { backgroundColor: T.bg }]} contentContainerStyle={s.body}>
      <Text style={[s.pageTitle, { color: T.text }]}>Eventos LCG</Text>
      <Text style={[s.sub, { color: T.textMut }]}>Próximas competencias y festivales</Text>

      {EVENTOS.map(ev => (
        <View key={ev.id} style={[s.card, { backgroundColor: T.card, borderColor: T.border }]}>
          <View style={[s.cardHeader, { backgroundColor: T.primary }]}>
            <Text style={s.evName}>{ev.nombre}</Text>
          </View>
          <View style={s.cardBody}>
            <View style={s.metaRow}>
              <Text style={[s.meta, { color: T.textSec }]}>📅 {ev.fecha}</Text>
              <View style={[s.diasChip, { backgroundColor: T.secondaryLt }]}>
                <Text style={[s.diasTxt, { color: T.secondary }]}>{ev.dias_faltantes} días</Text>
              </View>
            </View>
            <Text style={[s.meta, { color: T.textSec }]}>📍 {ev.lugar}</Text>
            <Text style={[s.desc, { color: T.textMut }]}>{ev.descripcion}</Text>
            <View style={s.discRow}>
              {ev.disciplinas.map(d => <DiscBadge key={d} disciplina={d} />)}
            </View>
            {ev.url_inscripcion && (
              <TouchableOpacity
                style={[s.inscBtn, { backgroundColor: T.secondary }]}
                onPress={() => Linking.openURL(ev.url_inscripcion)}
                activeOpacity={0.85}>
                <Text style={s.inscTxt}>INSCRIBIRSE →</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap:      { flex: 1 },
  body:      { padding: 16, gap: 14, paddingBottom: 100 },
  pageTitle: { fontSize: 20, fontWeight: "700" },
  sub:       { fontSize: 12, marginBottom: 8 },
  card:      { borderRadius: 14, borderWidth: 1, overflow: "hidden" },
  cardHeader:{ padding: 14 },
  evName:    { fontSize: 15, fontWeight: "700", color: "#fff" },
  cardBody:  { padding: 14, gap: 6 },
  metaRow:   { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  meta:      { fontSize: 13 },
  diasChip:  { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12 },
  diasTxt:   { fontSize: 12, fontWeight: "700" },
  desc:      { fontSize: 12, lineHeight: 18, marginTop: 2 },
  discRow:   { flexDirection: "row", gap: 6, marginTop: 4 },
  inscBtn:   { borderRadius: 8, paddingVertical: 10, alignItems: "center", marginTop: 4 },
  inscTxt:   { color: "#fff", fontWeight: "700", fontSize: 13 },
});
