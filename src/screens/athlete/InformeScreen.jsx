import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as Print from "expo-print";
import { PERF, ASISTENCIA } from "../../constants/data";
import { pagoLabel } from "../../constants/theme";
import PrintChartModal from "../../components/PrintChartModal";
import Calendario from "../../components/Calendario";
import GraficaNiveles from "../../components/GraficaNiveles";

export default function InformeScreen({ user, T }) {
  const [tab, setTab] = useState("progreso");
  const [showPrintModal, setShowPrintModal] = useState(false);
  if (!user) return null;

  const asistencia = ASISTENCIA[user.id] || {};
  const totalSesiones = Object.values(asistencia).reduce((a, arr) => a + arr.length, 0);

  const imprimir = async (tipo) => {
    const last = PERF[PERF.length - 1];
    const keys = ["salto","tecnica","flex","fuerza","resist"];
    const lbl  = ["Salto","Técnica","Flex","Fuerza","Resist"];
    const bars  = keys.map((k,i)=>`<tr><td>${lbl[i]}</td><td>
      <div style="width:${last[k]*1.5}px;height:12px;background:#FF5F03;border-radius:3px;display:inline-block"></div>
      </td><td>${last[k]}</td></tr>`).join("");
    const html = `<html><head><meta charset="utf-8">
      <style>body{font-family:Arial,sans-serif;padding:20px}h1{color:#072C2C}table{border-collapse:collapse;width:100%}td,th{padding:6px;border:1px solid #ddd}</style>
      </head><body>
      <h1>Mi Informe — ${user.displayNombre || user.nombre}</h1>
      <p><b>Disciplina:</b> ${user.disciplina} · <b>Club:</b> ${user.club} · <b>Nivel:</b> ${user.nivel}</p>
      <p><b>Asistencia:</b> ${user.stats.asistencia}% · <b>Progreso:</b> ${user.stats.progreso}% · <b>Sesiones:</b> ${totalSesiones}</p>
      <h2>Rendimiento</h2>
      <table><tr><th>Métrica</th><th>Barra</th><th>Valor</th></tr>${bars}</table>
      <p style="font-size:10px;color:#999;margin-top:30px">App Gimnasia Cauca · ${new Date().toLocaleDateString("es-CO")}</p>
      </body></html>`;
    try { await Print.printAsync({ html }); }
    catch (e) { Alert.alert("Error", "No se pudo imprimir."); }
  };

  return (
    <View style={[s.wrap, { backgroundColor: T.bg }]}>
      {/* Tabs */}
      <View style={[s.tabs, { backgroundColor: T.card, borderBottomColor: T.border }]}>
        {[["progreso","📊 Progreso"],["calendario","📅 Asistencia"]].map(([id,lbl]) => (
          <TouchableOpacity key={id}
            style={[s.tab, tab === id && { borderBottomColor: T.secondary, borderBottomWidth: 2 }]}
            onPress={() => setTab(id)} activeOpacity={0.7}>
            <Text style={[s.tabTxt, { color: tab === id ? T.primary : T.textMut }]}>{lbl}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={s.body}>
        {/* Stats strip */}
        <View style={[s.statsRow, { backgroundColor: T.card, borderColor: T.border }]}>
          {[
            { l: "Asistencia", v: `${user.stats.asistencia}%`, c: T.success },
            { l: "Progreso",   v: `${user.stats.progreso}%`,   c: T.secondary },
            { l: "Cumpl.",     v: `${user.stats.cumplimiento}%`,c: T.blue },
            { l: "Sesiones",   v: String(totalSesiones),        c: T.text },
          ].map(st => (
            <View key={st.l} style={s.statItem}>
              <Text style={[s.statVal, { color: st.c }]}>{st.v}</Text>
              <Text style={[s.statLbl, { color: T.textMut }]}>{st.l}</Text>
            </View>
          ))}
        </View>

        {tab === "progreso" && (
          <View style={[s.card, { backgroundColor: T.card, borderColor: T.border }]}>
            <Text style={[s.cardTitle, { color: T.text }]}>Niveles de habilidad</Text>
            <GraficaNiveles T={T} />
          </View>
        )}

        {tab === "calendario" && (
          <View style={[s.card, { backgroundColor: T.card, borderColor: T.border }]}>
            <Text style={[s.cardTitle, { color: T.text }]}>Asistencia mensual</Text>
            <Calendario asistencia={asistencia} T={T} />
          </View>
        )}

        <TouchableOpacity
          style={[s.printBtn, { backgroundColor: T.primary }]}
          onPress={() => setShowPrintModal(true)} activeOpacity={0.85}>
          <Text style={s.printIcon}>🖨️</Text>
          <Text style={s.printTxt}>IMPRIMIR MI INFORME</Text>
        </TouchableOpacity>
      </ScrollView>

      <PrintChartModal visible={showPrintModal} onClose={() => setShowPrintModal(false)} onSelect={imprimir} T={T} />
    </View>
  );
}

const s = StyleSheet.create({
  wrap:      { flex: 1 },
  tabs:      { flexDirection: "row", borderBottomWidth: 1 },
  tab:       { flex: 1, paddingVertical: 12, alignItems: "center", borderBottomWidth: 2, borderBottomColor: "transparent" },
  tabTxt:    { fontSize: 12, fontWeight: "700" },
  body:      { padding: 16, gap: 12, paddingBottom: 100 },
  statsRow:  { borderRadius: 12, borderWidth: 1, flexDirection: "row", padding: 12 },
  statItem:  { flex: 1, alignItems: "center" },
  statVal:   { fontSize: 18, fontWeight: "700" },
  statLbl:   { fontSize: 9, marginTop: 2 },
  card:      { borderRadius: 12, borderWidth: 1, padding: 14 },
  cardTitle: { fontSize: 14, fontWeight: "700", marginBottom: 12 },
  printBtn:  { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 10, paddingVertical: 14 },
  printIcon: { fontSize: 18 },
  printTxt:  { color: "#fff", fontWeight: "700", fontSize: 14, letterSpacing: 1 },
});
