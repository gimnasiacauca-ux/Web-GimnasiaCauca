import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function PinInput({ pin, onDigit, onDelete, error, T }) {
  const keys = [1,2,3,4,5,6,7,8,9,"",0,"⌫"];
  return (
    <View style={s.wrap}>
      {/* 4 dots */}
      <View style={s.dots}>
        {[0,1,2,3].map(i => (
          <View key={i} style={[s.dot, { backgroundColor: i < pin.length ? T.secondary : T.border }]} />
        ))}
      </View>
      {error ? <Text style={[s.err, { color: T.danger }]}>{error}</Text> : null}
      {/* Keypad */}
      <View style={s.grid}>
        {keys.map((k, i) => (
          <TouchableOpacity key={i}
            onPress={() => k === "⌫" ? onDelete() : k !== "" && onDigit(String(k))}
            style={[s.key, { backgroundColor: T.card, borderColor: T.border }, k === "" && s.hidden]}
            activeOpacity={0.7} disabled={k === ""}>
            <Text style={[s.keyTxt, { color: T.text }]}>{k}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap:   { alignItems: "center", width: "100%" },
  dots:   { flexDirection: "row", gap: 14, marginBottom: 24 },
  dot:    { width: 14, height: 14, borderRadius: 7 },
  err:    { fontSize: 13, marginBottom: 12 },
  grid:   { display: "flex", flexDirection: "row", flexWrap: "wrap", width: 240, gap: 10 },
  key:    { width: 70, height: 56, borderRadius: 8, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  keyTxt: { fontSize: 22, fontWeight: "700" },
  hidden: { opacity: 0 },
});
