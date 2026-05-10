import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function Lightbox({ ej, onClose, intensidad, T }) {
  const [tab, setTab] = useState("pasos");
  if (!ej) return null;
  const reps = intensidad === "Suave" ? ej.reps_suave
    : intensidad === "Fuerte" || intensidad === "Máxima" ? ej.reps_fuerte
    : ej.reps_media;

  return (
    <Modal visible={!!ej} transparent animationType="slide" onRequestClose={onClose}>
      <View style={s.overlay}>
        <View style={[s.sheet, { backgroundColor: T.card }]}>
          {/* Header */}
          <View style={[s.header, { backgroundColor: T.primary }]}>
            <View style={{ flex: 1 }}>
              <Text style={s.cod}>{ej.cod}</Text>
              <Text style={s.nombre}>{ej.nombre}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={s.close} activeOpacity={0.8}>
              <Text style={s.closeX}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Image */}
          {ej.img
            ? <Image source={{ uri: ej.img }} style={s.img} resizeMode="cover" />
            : <View style={[s.imgPlaceholder, { backgroundColor: T.panel }]}>
                <Text style={{ fontSize: 48 }}>🏃</Text>
              </View>}

          {/* Stats row */}
          <View style={[s.stats, { backgroundColor: T.panel }]}>
            <StatBox label="REPS" value={reps} T={T} />
            <StatBox label="SERIES" value={ej.series} T={T} />
            <StatBox label="REPOSO" value={ej.reposo} T={T} />
            <StatBox label="MÚSCULO" value={ej.musculo?.split("·")[0].trim()} T={T} />
          </View>

          {/* Tabs */}
          <View style={[s.tabs, { borderBottomColor: T.border }]}>
            {["pasos", "tips"].map(t => (
              <TouchableOpacity key={t} style={[s.tabBtn, tab === t && { borderBottomColor: T.secondary, borderBottomWidth: 2 }]}
                onPress={() => setTab(t)} activeOpacity={0.7}>
                <Text style={[s.tabTxt, { color: tab === t ? T.primary : T.textMut }]}>
                  {t === "pasos" ? "📋 PASOS" : "💡 TIPS"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView style={s.body} showsVerticalScrollIndicator={false}>
            {tab === "pasos"
              ? ej.pasos?.map((p, i) => (
                  <View key={i} style={s.paso}>
                    <View style={[s.numCircle, { backgroundColor: T.secondary }]}>
                      <Text style={s.numTxt}>{i + 1}</Text>
                    </View>
                    <Text style={[s.pasoTxt, { color: T.textSec }]}>{p}</Text>
                  </View>
                ))
              : <View style={[s.tipBox, { backgroundColor: T.secondaryLt }]}>
                  <Text style={[s.tipTxt, { color: T.text }]}>{ej.tips}</Text>
                </View>
            }
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function StatBox({ label, value, T }) {
  return (
    <View style={s.statBox}>
      <Text style={[s.statVal, { color: T.primary }]}>{value}</Text>
      <Text style={[s.statLbl, { color: T.textMut }]}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  overlay:      { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "flex-end" },
  sheet:        { borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: "90%", overflow: "hidden" },
  header:       { flexDirection: "row", padding: 16, alignItems: "flex-start" },
  cod:          { fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 1 },
  nombre:       { fontSize: 18, fontWeight: "700", color: "#fff", marginTop: 2 },
  close:        { width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },
  closeX:       { color: "#fff", fontSize: 22, fontWeight: "700", lineHeight: 24 },
  img:          { width: "100%", height: 180 },
  imgPlaceholder:{ height: 120, alignItems: "center", justifyContent: "center" },
  stats:        { flexDirection: "row", paddingVertical: 10 },
  statBox:      { flex: 1, alignItems: "center" },
  statVal:      { fontSize: 12, fontWeight: "700" },
  statLbl:      { fontSize: 9, marginTop: 2 },
  tabs:         { flexDirection: "row", borderBottomWidth: 1 },
  tabBtn:       { flex: 1, paddingVertical: 12, alignItems: "center", borderBottomWidth: 2, borderBottomColor: "transparent" },
  tabTxt:       { fontSize: 11, fontWeight: "700", letterSpacing: 1 },
  body:         { maxHeight: 240, padding: 16 },
  paso:         { flexDirection: "row", alignItems: "flex-start", marginBottom: 12, gap: 10 },
  numCircle:    { width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center", marginTop: 1 },
  numTxt:       { color: "#fff", fontSize: 12, fontWeight: "700" },
  pasoTxt:      { flex: 1, fontSize: 14, lineHeight: 20 },
  tipBox:       { borderRadius: 10, padding: 14 },
  tipTxt:       { fontSize: 14, lineHeight: 22 },
});
