import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { INTENSIDAD_COLOR } from "../constants/theme";

const DIAS = ["L", "M", "X", "J", "V", "S", "D"];
const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

export default function Calendario({ asistencia, T }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const key = `${year}-${String(month + 1).padStart(2, "0")}`;
  const sesiones = asistencia?.[key] || [];
  const sesMap = {};
  sesiones.forEach(s => { sesMap[s.d] = s.int; });

  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  return (
    <View style={[s.wrap, { backgroundColor: T.card, borderColor: T.border }]}>
      {/* Nav */}
      <View style={s.nav}>
        <TouchableOpacity onPress={prevMonth} style={s.navBtn} activeOpacity={0.7}>
          <Text style={[s.navArrow, { color: T.text }]}>‹</Text>
        </TouchableOpacity>
        <Text style={[s.mes, { color: T.text }]}>{MESES[month]} {year}</Text>
        <TouchableOpacity onPress={nextMonth} style={s.navBtn} activeOpacity={0.7}>
          <Text style={[s.navArrow, { color: T.text }]}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Day headers */}
      <View style={s.row}>
        {DIAS.map(d => (
          <Text key={d} style={[s.dayHdr, { color: T.textMut }]}>{d}</Text>
        ))}
      </View>

      {/* Cells */}
      <View style={s.grid}>
        {cells.map((d, i) => {
          if (!d) return <View key={`e${i}`} style={s.cell} />;
          const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
          const int = sesMap[iso];
          const color = int ? INTENSIDAD_COLOR[int]?.bg : null;
          const isToday = iso === new Date().toISOString().split("T")[0];
          return (
            <View key={iso} style={[
              s.cell,
              color && { backgroundColor: color },
              isToday && !color && { borderWidth: 2, borderColor: T.secondary },
              { borderRadius: 6 }
            ]}>
              <Text style={[s.dayNum, { color: color ? "#fff" : T.text, fontWeight: isToday ? "700" : "400" }]}>
                {d}
              </Text>
              {int && <Text style={s.intDot}>{int[0]}</Text>}
            </View>
          );
        })}
      </View>

      {/* Legend */}
      <View style={s.legend}>
        {Object.entries(INTENSIDAD_COLOR).map(([k, v]) => (
          <View key={k} style={s.legendItem}>
            <View style={[s.legendDot, { backgroundColor: v.bg }]} />
            <Text style={[s.legendLbl, { color: T.textMut }]}>{v.lbl}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap:       { borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 12 },
  nav:        { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  navBtn:     { padding: 6 },
  navArrow:   { fontSize: 22, fontWeight: "700" },
  mes:        { fontSize: 14, fontWeight: "700" },
  row:        { flexDirection: "row", marginBottom: 4 },
  dayHdr:     { flex: 1, textAlign: "center", fontSize: 11, fontWeight: "600" },
  grid:       { flexDirection: "row", flexWrap: "wrap" },
  cell:       { width: "14.28%", aspectRatio: 1, alignItems: "center", justifyContent: "center", marginVertical: 2 },
  dayNum:     { fontSize: 12 },
  intDot:     { fontSize: 7, color: "rgba(255,255,255,0.85)", marginTop: 1 },
  legend:     { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10, justifyContent: "center" },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  legendDot:  { width: 10, height: 10, borderRadius: 5 },
  legendLbl:  { fontSize: 10 },
});
