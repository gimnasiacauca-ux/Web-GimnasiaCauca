import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Linking } from "react-native";
import { PATROCINADORES } from "../constants/data";

export default function Banner({ T }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % PATROCINADORES.length), 3000);
    return () => clearInterval(t);
  }, []);

  const pat = PATROCINADORES[idx];

  return (
    <TouchableOpacity onPress={() => Linking.openURL(pat.url)}
      style={[s.wrap, { backgroundColor: T.card, borderTopColor: T.border }]} activeOpacity={0.9}>
      {pat.imagen
        ? <Image source={{ uri: pat.imagen }} style={s.img} resizeMode="contain" />
        : (
          <View style={s.textWrap}>
            <Text style={[s.label, { color: T.textMut }]}>PATROCINA</Text>
            <Text style={[s.nombre, { color: pat.color }]}>{pat.nombre}</Text>
            <Text style={[s.sub, { color: T.textMut }]}>Toca para visitar</Text>
          </View>
        )}
      <View style={s.dots}>
        {PATROCINADORES.map((_, i) => (
          <View key={i} style={[s.dot, { backgroundColor: i === idx ? pat.color : T.border }]} />
        ))}
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  wrap:    { position: "absolute", bottom: 0, left: 0, right: 0, height: 90, alignItems: "center", justifyContent: "center", borderTopWidth: 1, zIndex: 97 },
  img:     { width: "90%", height: 70 },
  textWrap:{ alignItems: "center" },
  label:   { fontSize: 8, letterSpacing: 2, fontWeight: "600", marginBottom: 4 },
  nombre:  { fontSize: 20, fontWeight: "700" },
  sub:     { fontSize: 9, marginTop: 2 },
  dots:    { position: "absolute", bottom: 6, flexDirection: "row", gap: 4 },
  dot:     { width: 5, height: 5, borderRadius: 3 },
});
