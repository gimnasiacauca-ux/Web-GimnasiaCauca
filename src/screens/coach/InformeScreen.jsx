import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as Print from "expo-print";
import { ATHLETES, PERF, ASISTENCIA } from "../../constants/data";
import { pagoLabel } from "../../constants/theme";
import PrintChartModal from "../../components/PrintChartModal";

function buildRadarHtml(at) {
  const keys = ["salto","tecnica","flex","fuerza","resist"];
  const lbl  = ["Salto","Técnica","Flex","Fuerza","Resist"];
  const last  = PERF[PERF.length - 1];
  const bars  = keys.map((k, i) => `
    <div style="margin:6px 0">
      <span style="display:inline-block;width:80px;font-size:12px">${lbl[i]}</span>
      <div style="display:inline-block;vertical-align:middle;width:${last[k] * 1.5}px;height:14px;background:#FF5F03;border-radius:3px"></div>
      <span style="font-size:12px;margin-left:6px">${last[k]}</span>
    </div>`).join("");
  return `<div><h3>Radar de Habilidades — ${at.nombre}</h3>${bars}</div>`;
}

function buildLineasHtml(at) {
  const rows = PERF.map(p => `<tr><td>${p.sem}</td><td>${p.salto}</td><td>${p.tecnica}</td><td>${p.flex}</td><td>${p.fuerza}</td><td>${p.resist}</td></tr>`).join("");
  return `<div><h3>Líneas (Series Temporales) — ${at.nombre}</h3>
    <table border="1" cellpadding="4" style="border-collapse:collapse;font-size:12px">
      <tr><th>Sem</th><th>Salto</th><th>Técnica</th><th>Flex</th><th>Fuerza</th><th>Resist</th></tr>${rows}
    </table></div>`;
}

function buildBarrasHtml(at) {
  const lastTwo = PERF.slice(-2);
  const keys = ["salto","tecnica","flex","fuerza","resist"];
  const lbl  = ["Salto","Técnica","Flex","Fuerza","Resist"];
  const rows = keys.map((k,i) => `
    <tr>
      <td>${lbl[i]}</td>
      <td><div style="width:${lastTwo[0][k]}px;height:12px;background:#1565C0;border-radius:2px"></div></td>
      <td><div style="width:${lastTwo[1][k]}px;height:12px;background:#FF5F03;border-radius:2px"></div></td>
    </tr>`).join("");
  return `<div><h3>Barras — ${at.nombre}</h3>
    <table border="1" cellpadding="6" style="border-collapse:collapse;font-size:12px">
      <tr><th>Métrica</th><th>${lastTwo[0].sem}</th><th>${lastTwo[1].sem}</th></tr>${rows}
    </table></div>`;
}

function buildBalasHtml(at) {
  const last = PERF[PERF.length - 1];
  const obj = 85;
  const keys = ["salto","tecnica","flex","fuerza","resist"];
  const lbl  = ["Salto","Técnica","Flex","Fuerza","Resist"];
  const rows = keys.map((k,i) => `
    <div style="margin:8px 0">
      <span style="font-size:12px;width:80px;display:inline-block">${lbl[i]}</span>
      <div style="display:inline-block;vertical-align:middle;position:relative;width:${obj * 1.5}px;height:16px;background:#e0e0e0;border-radius:3px">
        <div style="position:absolute;left:0;top:2px;width:${last[k] * 1.5}px;height:12px;background:#FF5F03;border-radius:3px"></div>
        <div style="position:absolute;left:${obj * 1.5 - 2}px;top:0;width:3px;height:16px;background:#333"></div>
      </div>
      <span style="font-size:11px;margin-left:6px">${last[k]} / ${obj}</span>
    </div>`).join("");
  return `<div><h3>Balas (Bullet Chart) — ${at.nombre}</h3>${rows}<p style="font-size:10px">Barra naranja = actual · Línea negra = objetivo (${obj})</p></div>`;
}

function buildHeatmapHtml(at) {
  const asist = ASISTENCIA[at.id]?.["2026-04"] || [];
  const map = {};
  asist.forEach(s => { map[s.d.split("-")[2]] = s.int; });
  const colors = { Suave:"#16A34A", Media:"#F5C400", Fuerte:"#DC2626", Propio:"#1565C0" };
  const cells = Array.from({length:30},(_,i)=>{
    const d = String(i+1).padStart(2,"0");
    const c = map[d] ? colors[map[d]] : "#e0e0e0";
    return `<td style="width:28px;height:28px;background:${c};border-radius:4px;text-align:center;font-size:10px">${i+1}</td>`;
  });
  const rows = [];
  for(let i=0;i<cells.length;i+=7) rows.push(`<tr>${cells.slice(i,i+7).join("")}</tr>`);
  return `<div><h3>Mapa de Calor — ${at.nombre}</h3>
    <table cellpadding="2" style="font-size:11px"><tr><td>🟩Suave</td><td>🟨Media</td><td>🟥Fuerte</td><td>🟦Propio</td></tr></table>
    <table cellpadding="2">${rows.join("")}</table></div>`;
}

const BUILDERS = {
  radar: buildRadarHtml,
  lineas: buildLineasHtml,
  barras: buildBarrasHtml,
  balas: buildBalasHtml,
  heatmap: buildHeatmapHtml,
};

export default function InformeScreen({ T }) {
  const [selAthlete, setSelAthlete] = useState(ATHLETES[0]);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const imprimir = async (tipo) => {
    const at = selAthlete;
    const chartHtml = (BUILDERS[tipo] || buildLineasHtml)(at);
    const asistKeys = Object.keys(ASISTENCIA[at.id] || {});
    const totalSesiones = asistKeys.reduce((acc, k) => acc + (ASISTENCIA[at.id][k]?.length || 0), 0);
    const html = `
      <html><head><meta charset="utf-8">
      <style>body{font-family:Arial,sans-serif;padding:20px;color:#111}
        h1{color:#072C2C;border-bottom:3px solid #FF5F03;padding-bottom:8px}
        h2{color:#072C2C;margin-top:24px}
        table{border-collapse:collapse;width:100%;margin:12px 0}
        th{background:#072C2C;color:#fff;padding:6px}
        td{padding:6px;border:1px solid #ddd}
        .badge{display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700}
      </style></head><body>
      <h1>Informe Técnico — Liga Caucana de Gimnasia</h1>
      <p><b>Atleta:</b> ${at.nombre} · <b>Disciplina:</b> ${at.disciplina} · <b>Club:</b> ${at.club}</p>
      <p><b>Categoría:</b> ${at.categoria} · <b>Nivel:</b> ${at.nivel} · <b>Estado:</b> ${pagoLabel[at.estado_pago]}</p>
      <h2>Estadísticas</h2>
      <table><tr><th>Asistencia</th><th>Progreso</th><th>Cumplimiento</th><th>Sesiones</th></tr>
        <tr><td>${at.stats.asistencia}%</td><td>${at.stats.progreso}%</td><td>${at.stats.cumplimiento}%</td><td>${totalSesiones}</td></tr>
      </table>
      <h2>Rendimiento</h2>
      ${chartHtml}
      <p style="font-size:10px;color:#999;margin-top:30px">Generado por App Gimnasia Cauca · ${new Date().toLocaleDateString("es-CO")}</p>
      </body></html>`;
    try {
      await Print.printAsync({ html });
    } catch (e) {
      Alert.alert("Error", "No se pudo imprimir el informe.");
    }
  };

  return (
    <View style={[s.wrap, { backgroundColor: T.bg }]}>
      <ScrollView contentContainerStyle={s.body}>
        <Text style={[s.pageTitle, { color: T.text }]}>Informes Técnicos</Text>

        {/* Athlete selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
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
          <View style={[s.card, { backgroundColor: T.card, borderColor: T.border }]}>
            <Text style={[s.cardTitle, { color: T.text }]}>{selAthlete.nombre}</Text>
            <Text style={[s.cardSub, { color: T.textMut }]}>{selAthlete.disciplina} · {selAthlete.club} · {selAthlete.categoria}</Text>
            <View style={s.statsRow}>
              {[
                { l: "Asistencia", v: `${selAthlete.stats.asistencia}%` },
                { l: "Progreso",   v: `${selAthlete.stats.progreso}%` },
                { l: "Cumpl.",     v: `${selAthlete.stats.cumplimiento}%` },
              ].map(st => (
                <View key={st.l} style={s.statItem}>
                  <Text style={[s.statVal, { color: T.secondary }]}>{st.v}</Text>
                  <Text style={[s.statLbl, { color: T.textMut }]}>{st.l}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={[s.printBtn, { backgroundColor: T.primary }]}
              onPress={() => setShowPrintModal(true)}
              activeOpacity={0.85}>
              <Text style={s.printIcon}>🖨️</Text>
              <Text style={s.printTxt}>IMPRIMIR INFORME</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <PrintChartModal
        visible={showPrintModal}
        onClose={() => setShowPrintModal(false)}
        onSelect={(tipo) => imprimir(tipo)}
        T={T}
      />
    </View>
  );
}

const s = StyleSheet.create({
  wrap:      { flex: 1 },
  body:      { padding: 16, paddingBottom: 100 },
  pageTitle: { fontSize: 20, fontWeight: "700", marginBottom: 16 },
  selBtn:    { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, marginRight: 8 },
  selTxt:    { fontSize: 13, fontWeight: "600" },
  card:      { borderRadius: 12, borderWidth: 1, padding: 16 },
  cardTitle: { fontSize: 16, fontWeight: "700" },
  cardSub:   { fontSize: 12, marginTop: 4, marginBottom: 12 },
  statsRow:  { flexDirection: "row", marginBottom: 16 },
  statItem:  { flex: 1, alignItems: "center" },
  statVal:   { fontSize: 20, fontWeight: "700" },
  statLbl:   { fontSize: 10, marginTop: 2 },
  printBtn:  { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 10, paddingVertical: 14 },
  printIcon: { fontSize: 18 },
  printTxt:  { color: "#fff", fontWeight: "700", fontSize: 14, letterSpacing: 1 },
});
