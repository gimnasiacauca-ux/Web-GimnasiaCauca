import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { CLASES } from "../../constants/data";

const DISCIPLINAS = ["Todas", ...new Set(CLASES.map(c => c.disciplina))];
const NIVELES = ["Todos", ...new Set(CLASES.map(c => c.nivel))];

export default function ClasesScreen({ T }) {
  const [filtDisc, setFiltDisc] = useState("Todas");
  const [filtNivel, setFiltNivel] = useState("Todos");

  const filtered = CLASES.filter(c =>
    (filtDisc === "Todas" || c.disciplina === filtDisc) &&
    (filtNivel === "Todos" || c.nivel === filtNivel)
  );

  return (
    <ScrollView style={[s.wrap, { backgroundColor: T.bg }]} contentContainerStyle={s.body}>
      <Text style={[s.pageTitle, { color: T.text }]}>Clases</Text>

      {/* Discipline filter */}
      <Text style={[s.filterLabel, { color: T.textMut }]}>DISCIPLINA</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
        {DISCIPLINAS.map(d => (
          <TouchableOpacity key={d}
            style={[s.chip, { borderColor: T.border, backgroundColor: filtDisc === d ? T.primary : T.card }]}
            onPress={() => setFiltDisc(d)} activeOpacity={0.7}>
            <Text style={[s.chipTxt, { color: filtDisc === d ? "#fff" : T.text }]}>{d}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Level filter */}
      <Text style={[s.filterLabel, { color: T.textMut }]}>NIVEL</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
        {NIVELES.map(n => (
          <TouchableOpacity key={n}
            style={[s.chip, { borderColor: T.border, backgroundColor: filtNivel === n ? T.secondary : T.card }]}
            onPress={() => setFiltNivel(n)} activeOpacity={0.7}>
            <Text style={[s.chipTxt, { color: filtNivel === n ? "#fff" : T.text }]}>{n}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Classes */}
      {filtered.map((c, i) => (
        <View key={i} style={[s.card, { backgroundColor: T.card, borderColor: T.border, borderLeftColor: c.color }]}>
          <View style={s.cardTop}>
            <View>
              <Text style={[s.discName, { color: T.text }]}>{c.disciplina}</Text>
              <View style={[s.nivelBadge, { backgroundColor: c.color + "22" }]}>
                <Text style={[s.nivelTxt, { color: c.color }]}>{c.nivel}</Text>
              </View>
            </View>
            <View style={s.cupos}>
              <Text style={[s.cuposNum, { color: T.text }]}>{c.cupos}</Text>
              <Text style={[s.cuposLbl, { color: T.textMut }]}>cupos</Text>
            </View>
          </View>
          <View style={s.metaBlock}>
            <Text style={[s.metaLine, { color: T.textSec }]}>🗓 {c.horario}</Text>
            <Text style={[s.metaLine, { color: T.textSec }]}>⏰ {c.hora}</Text>
            <Text style={[s.metaLine, { color: T.textSec }]}>📍 {c.lugar}</Text>
            <Text style={[s.metaLine, { color: T.textSec }]}>👤 {c.instructor}</Text>
          </View>
          <TouchableOpacity style={[s.contactBtn, { borderColor: T.secondary }]}
            onPress={() => Linking.openURL(`tel:${c.contacto}`)} activeOpacity={0.8}>
            <Text style={[s.contactTxt, { color: T.secondary }]}>📞 Contactar</Text>
          </TouchableOpacity>
        </View>
      ))}

      {filtered.length === 0 && (
        <View style={[s.empty, { backgroundColor: T.card, borderColor: T.border }]}>
          <Text style={{ fontSize: 40 }}>🔍</Text>
          <Text style={[s.emptyTxt, { color: T.textMut }]}>Sin clases para este filtro</Text>
        </View>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap:        { flex: 1 },
  body:        { padding: 16, paddingBottom: 100 },
  pageTitle:   { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  filterLabel: { fontSize: 10, fontWeight: "700", letterSpacing: 1.5, marginBottom: 6 },
  chip:        { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1, marginRight: 8 },
  chipTxt:     { fontSize: 12 },
  card:        { borderRadius: 12, borderWidth: 1, borderLeftWidth: 4, padding: 14, marginBottom: 12 },
  cardTop:     { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 },
  discName:    { fontSize: 16, fontWeight: "700" },
  nivelBadge:  { alignSelf: "flex-start", borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2, marginTop: 4 },
  nivelTxt:    { fontSize: 11, fontWeight: "600" },
  cupos:       { alignItems: "center" },
  cuposNum:    { fontSize: 22, fontWeight: "700" },
  cuposLbl:    { fontSize: 10 },
  metaBlock:   { gap: 4, marginBottom: 10 },
  metaLine:    { fontSize: 13 },
  contactBtn:  { borderRadius: 8, borderWidth: 1, paddingVertical: 8, alignItems: "center" },
  contactTxt:  { fontSize: 13, fontWeight: "700" },
  empty:       { borderRadius: 12, borderWidth: 1, padding: 32, alignItems: "center", gap: 8 },
  emptyTxt:    { fontSize: 14 },
});
