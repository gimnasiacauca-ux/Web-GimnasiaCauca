import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { EJERCICIOS, CAL_ITEMS, EST_ITEMS, getReps } from "../../constants/data";
import { INTENSIDAD_COLOR } from "../../constants/theme";
import FasePlan from "../../components/FasePlan";
import Lightbox from "../../components/Lightbox";

const INTENSIDADES = ["Suave", "Media", "Fuerte"];
const CATEGORIAS = Object.keys(EJERCICIOS);

export default function EntrenamientoScreen({ T }) {
  const [intensidad, setIntensidad] = useState("Media");
  const [selectedEj, setSelectedEj] = useState(null);
  const [catTab, setCatTab] = useState(CATEGORIAS[0]);

  const [calChecks, setCalChecks] = useState(CAL_ITEMS.map(() => false));
  const [tecChecks, setTecChecks] = useState([]);
  const [estChecks, setEstChecks] = useState(EST_ITEMS.map(() => false));

  const ejercicios = EJERCICIOS[catTab] || [];

  const calDone = calChecks.every(Boolean);
  const tecDone = tecChecks.length > 0 && tecChecks.every(Boolean);

  // Re-initialise tec checks whenever category or exercise list length changes
  useEffect(() => {
    setTecChecks(Array(ejercicios.length).fill(false));
  }, [catTab, ejercicios.length]);

  const toggleCal = (i) => setCalChecks(c => c.map((v, idx) => idx === i ? !v : v));
  const toggleTec = (i) => setTecChecks(c => c.map((v, idx) => idx === i ? !v : v));
  const toggleEst = (i) => setEstChecks(c => c.map((v, idx) => idx === i ? !v : v));

  return (
    <View style={[s.wrap, { backgroundColor: T.bg }]}>
      <ScrollView contentContainerStyle={s.body}>
        {/* Intensity */}
        <View style={[s.card, { backgroundColor: T.card, borderColor: T.border }]}>
          <Text style={[s.cardTitle, { color: T.text }]}>Intensidad de sesión</Text>
          <View style={s.chips}>
            {INTENSIDADES.map(int => {
              const col = INTENSIDAD_COLOR[int];
              return (
                <TouchableOpacity key={int}
                  style={[s.chip, { borderColor: col.bg, backgroundColor: intensidad === int ? col.bg : "transparent" }]}
                  onPress={() => setIntensidad(int)} activeOpacity={0.7}>
                  <Text style={[s.chipTxt, { color: intensidad === int ? "#fff" : col.bg }]}>{int}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Calentamiento */}
        <FasePlan fase="🔥 Calentamiento" items={CAL_ITEMS} unlocked={true}
          checks={calChecks} onToggle={toggleCal} T={T} />

        {/* Técnica */}
        <View style={[s.card, { backgroundColor: T.card, borderColor: T.border }]}>
          <Text style={[s.cardTitle, { color: T.text }]}>🤸 Técnica</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
            {CATEGORIAS.map(c => (
              <TouchableOpacity key={c}
                style={[s.catBtn, { borderColor: catTab === c ? T.secondary : T.border, backgroundColor: catTab === c ? T.secondaryLt : "transparent" }]}
                onPress={() => setCatTab(c)} activeOpacity={0.7}>
                <Text style={[s.catTxt, { color: catTab === c ? T.secondary : T.textSec }]}>{c}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {!calDone && (
            <View style={[s.locked, { backgroundColor: T.panel }]}>
              <Text style={[s.lockedTxt, { color: T.textMut }]}>🔒 Completa el calentamiento primero</Text>
            </View>
          )}

          {calDone && ejercicios.map((ej, i) => (
            <TouchableOpacity key={ej.cod}
              style={[s.ejRow, { borderBottomColor: T.border }]}
              onPress={() => setSelectedEj(ej)}
              activeOpacity={0.8}>
              <TouchableOpacity
                style={[s.ejCheck, {
                  backgroundColor: tecChecks[i] ? T.secondary : "transparent",
                  borderColor: tecChecks[i] ? T.secondary : T.border
                }]}
                onPress={(e) => { e.stopPropagation?.(); toggleTec(i); }}
                activeOpacity={0.7}>
                {tecChecks[i] && <Text style={s.checkMark}>✓</Text>}
              </TouchableOpacity>
              <View style={s.ejInfo}>
                <Text style={[s.ejNombre, { color: T.text }]}>{ej.nombre}</Text>
                <Text style={[s.ejMeta, { color: T.textMut }]}>{getReps(ej, intensidad)} · {ej.series}</Text>
              </View>
              <Text style={[s.ejArrow, { color: T.textMut }]}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Estiramiento — unlocks only after both previous phases done */}
        <FasePlan fase="🧘 Estiramiento" items={EST_ITEMS} unlocked={calDone && tecDone}
          checks={estChecks} onToggle={toggleEst} T={T} />
      </ScrollView>

      <Lightbox ej={selectedEj} onClose={() => setSelectedEj(null)} intensidad={intensidad} T={T} />
    </View>
  );
}

const s = StyleSheet.create({
  wrap:      { flex: 1 },
  body:      { padding: 16, gap: 10, paddingBottom: 100 },
  card:      { borderRadius: 12, borderWidth: 1, padding: 14 },
  cardTitle: { fontSize: 14, fontWeight: "700", marginBottom: 12 },
  chips:     { flexDirection: "row", gap: 8 },
  chip:      { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20, borderWidth: 1.5 },
  chipTxt:   { fontSize: 13, fontWeight: "600" },
  catBtn:    { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1, marginRight: 8 },
  catTxt:    { fontSize: 12 },
  locked:    { borderRadius: 8, padding: 14, alignItems: "center" },
  lockedTxt: { fontSize: 13 },
  ejRow:     { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, gap: 10 },
  ejCheck:   { width: 22, height: 22, borderRadius: 5, borderWidth: 2, alignItems: "center", justifyContent: "center" },
  checkMark: { color: "#fff", fontSize: 13, fontWeight: "700" },
  ejInfo:    { flex: 1 },
  ejNombre:  { fontSize: 13, fontWeight: "600" },
  ejMeta:    { fontSize: 11, marginTop: 2 },
  ejArrow:   { fontSize: 22 },
});
