import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { EJERCICIOS, getReps } from "../../constants/data";
import { INTENSIDAD_COLOR } from "../../constants/theme";
import Lightbox from "../../components/Lightbox";

const CATEGORIAS = Object.keys(EJERCICIOS);
const INTENSIDADES = ["Suave", "Media", "Fuerte"];

export default function EntrenamientoInvitadoScreen({ T }) {
  const [catTab, setCatTab] = useState(CATEGORIAS[0]);
  const [intensidad, setIntensidad] = useState("Media");
  const [selectedEj, setSelectedEj] = useState(null);

  const ejercicios = EJERCICIOS[catTab] || [];

  return (
    <View style={[s.wrap, { backgroundColor: T.bg }]}>
      <ScrollView contentContainerStyle={s.body}>
        <Text style={[s.pageTitle, { color: T.text }]}>Ejercicios</Text>

        {/* Intensity */}
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

        {/* Category tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.tabs}>
          {CATEGORIAS.map(c => (
            <TouchableOpacity key={c}
              style={[s.tab, catTab === c && { borderBottomColor: T.secondary, borderBottomWidth: 2 }]}
              onPress={() => setCatTab(c)} activeOpacity={0.7}>
              <Text style={[s.tabTxt, { color: catTab === c ? T.text : T.textMut }]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Exercise list */}
        {ejercicios.map(ej => (
          <TouchableOpacity key={ej.cod}
            style={[s.ejCard, { backgroundColor: T.card, borderColor: T.border }]}
            onPress={() => setSelectedEj(ej)} activeOpacity={0.8}>
            <View style={s.ejLeft}>
              <Text style={[s.ejCod, { color: T.textMut }]}>{ej.cod}</Text>
              <Text style={[s.ejNombre, { color: T.text }]}>{ej.nombre}</Text>
              <Text style={[s.ejReps, { color: T.secondary }]}>{getReps(ej, intensidad)} · {ej.series}</Text>
            </View>
            <Text style={[s.arrow, { color: T.textMut }]}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Lightbox ej={selectedEj} onClose={() => setSelectedEj(null)} intensidad={intensidad} T={T} />
    </View>
  );
}

const s = StyleSheet.create({
  wrap:      { flex: 1 },
  body:      { padding: 16, gap: 10, paddingBottom: 100 },
  pageTitle: { fontSize: 20, fontWeight: "700", marginBottom: 4 },
  chips:     { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  chip:      { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20, borderWidth: 1.5 },
  chipTxt:   { fontSize: 13, fontWeight: "600" },
  tabs:      { marginVertical: 4 },
  tab:       { paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 2, borderBottomColor: "transparent", marginRight: 4 },
  tabTxt:    { fontSize: 13, fontWeight: "600" },
  ejCard:    { flexDirection: "row", alignItems: "center", borderRadius: 12, borderWidth: 1, padding: 14 },
  ejLeft:    { flex: 1 },
  ejCod:     { fontSize: 10, letterSpacing: 1, marginBottom: 2 },
  ejNombre:  { fontSize: 15, fontWeight: "700" },
  ejReps:    { fontSize: 12, marginTop: 4, fontWeight: "600" },
  arrow:     { fontSize: 24 },
});
