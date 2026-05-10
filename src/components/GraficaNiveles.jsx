import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { PERF } from "../constants/data";

const W = Dimensions.get("window").width;

export default function GraficaNiveles({ T }) {
  const labels = PERF.map(p => p.sem);
  const keys = ["salto", "tecnica", "flex", "fuerza", "resist"];
  const colors = ["#FF5F03", "#F5C400", "#2E7D32", "#1565C0", "#7B1FA2"];
  const nombres = ["Salto", "Técnica", "Flexibilidad", "Fuerza", "Resistencia"];

  return (
    <View>
      <BarChart
        data={{
          labels,
          datasets: [{ data: PERF.map(p => p.tecnica) }],
        }}
        width={Math.min(W - 32, 400)}
        height={180}
        fromZero
        chartConfig={{
          backgroundGradientFrom: T.card,
          backgroundGradientTo: T.card,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 95, 3, ${opacity})`,
          labelColor: () => T.textMut,
          propsForBackgroundLines: { stroke: T.border },
        }}
        style={{ borderRadius: 10 }}
      />
      <Text style={[s.subtitle, { color: T.textMut }]}>Técnica por semana (escala 0-100)</Text>

      {/* Mini bars for all metrics */}
      <View style={{ marginTop: 12 }}>
        {keys.map((k, ki) => {
          const last = PERF[PERF.length - 1][k];
          return (
            <View key={k} style={s.metricRow}>
              <Text style={[s.metricName, { color: T.textSec }]}>{nombres[ki]}</Text>
              <View style={[s.barBg, { backgroundColor: T.border }]}>
                <View style={[s.barVal, { width: `${last}%`, backgroundColor: colors[ki] }]} />
              </View>
              <Text style={[s.metricVal, { color: T.text }]}>{last}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  subtitle:   { fontSize: 11, textAlign: "center", marginTop: 4 },
  metricRow:  { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  metricName: { width: 90, fontSize: 12 },
  barBg:      { flex: 1, height: 8, borderRadius: 4, overflow: "hidden" },
  barVal:     { height: 8, borderRadius: 4 },
  metricVal:  { width: 28, fontSize: 12, fontWeight: "700", textAlign: "right" },
});
