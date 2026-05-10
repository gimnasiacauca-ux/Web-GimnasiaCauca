import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function FasePlan({ fase, items, unlocked, checks, onToggle, intensidad, T }) {
  const [open, setOpen] = useState(false);
  const done = items.filter((_, i) => checks[i]).length;
  const total = items.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <View style={[s.wrap, { borderColor: T.border }]}>
      <TouchableOpacity
        style={[s.header, { backgroundColor: unlocked ? T.panel : T.bg }]}
        onPress={() => unlocked && setOpen(o => !o)}
        activeOpacity={unlocked ? 0.7 : 1}>
        <View style={s.left}>
          <Text style={s.icon}>{unlocked ? (open ? "📂" : "📁") : "🔒"}</Text>
          <View>
            <Text style={[s.nombre, { color: unlocked ? T.text : T.textMut }]}>{fase}</Text>
            <Text style={[s.prog, { color: T.textMut }]}>{done}/{total} · {pct}%</Text>
          </View>
        </View>
        <View style={[s.bar, { backgroundColor: T.border }]}>
          <View style={[s.barFill, { width: `${pct}%`, backgroundColor: T.secondary }]} />
        </View>
      </TouchableOpacity>

      {open && unlocked && (
        <View style={[s.body, { backgroundColor: T.card }]}>
          {items.map((item, i) => (
            <TouchableOpacity key={i}
              style={[s.item, { borderBottomColor: T.border }]}
              onPress={() => onToggle(i)}
              activeOpacity={0.7}>
              <View style={[s.check, {
                backgroundColor: checks[i] ? T.secondary : "transparent",
                borderColor: checks[i] ? T.secondary : T.border,
              }]}>
                {checks[i] && <Text style={s.checkMark}>✓</Text>}
              </View>
              <Text style={[s.itemTxt, { color: T.textSec }, checks[i] && s.done]}>{item}</Text>
              {intensidad && (
                <View style={[s.intBadge, { backgroundColor: T.panel }]}>
                  <Text style={[s.intTxt, { color: T.textMut }]}>{intensidad}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  wrap:   { borderWidth: 1, borderRadius: 10, marginBottom: 8, overflow: "hidden" },
  header: { flexDirection: "row", alignItems: "center", padding: 12, gap: 10 },
  left:   { flex: 1, flexDirection: "row", alignItems: "center", gap: 8 },
  icon:   { fontSize: 18 },
  nombre: { fontSize: 14, fontWeight: "700" },
  prog:   { fontSize: 11, marginTop: 2 },
  bar:    { width: 60, height: 5, borderRadius: 3, overflow: "hidden" },
  barFill:{ height: 5, borderRadius: 3 },
  body:   { paddingHorizontal: 12 },
  item:   { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, gap: 10 },
  check:  { width: 20, height: 20, borderRadius: 4, borderWidth: 2, alignItems: "center", justifyContent: "center" },
  checkMark:{ color: "#fff", fontSize: 12, fontWeight: "700" },
  itemTxt:{ flex: 1, fontSize: 13 },
  done:   { textDecorationLine: "line-through", opacity: 0.5 },
  intBadge:{ paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  intTxt: { fontSize: 9, fontWeight: "600" },
});
