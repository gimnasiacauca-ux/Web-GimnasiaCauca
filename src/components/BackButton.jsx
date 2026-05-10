import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function BackButton({ onPress, label = "← Volver" }) {
  return (
    <TouchableOpacity onPress={onPress} style={s.btn} activeOpacity={0.8}>
      <Text style={s.txt}>{label}</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  btn: {
    alignSelf: "flex-start",
    backgroundColor: "#FF5F03",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#FF5F03",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 4,
  },
  txt: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
});
