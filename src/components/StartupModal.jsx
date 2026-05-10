import React from "react";
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { EVENTOS } from "../constants/data";

const { width } = Dimensions.get("window");

export default function StartupModal({ visible, onClose }) {
  const ev = EVENTOS[0];
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={s.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity activeOpacity={1} style={s.card} onPress={() => {}}>
          {/* X button */}
          <TouchableOpacity onPress={onClose} style={s.close} activeOpacity={0.8}>
            <Text style={s.closeX}>×</Text>
          </TouchableOpacity>
          {/* Event image / placeholder */}
          {ev.imagen
            ? <Image source={{ uri: ev.imagen }} style={s.img} resizeMode="cover" />
            : (
              <View style={s.imgPlaceholder}>
                <Text style={s.trophy}>🏆</Text>
              </View>
            )}
          {/* Content */}
          <View style={s.body}>
            <Text style={s.tag}>PRÓXIMO EVENTO</Text>
            <Text style={s.title}>{ev.nombre}</Text>
            <Text style={s.meta}>📅 {ev.fecha}  ·  {ev.dias_faltantes} días</Text>
            <Text style={s.place}>📍 {ev.lugar}</Text>
            <TouchableOpacity onPress={onClose} style={s.cta} activeOpacity={0.85}>
              <Text style={s.ctaTxt}>CONTINUAR EN LA APP →</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay:       { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", alignItems: "center", justifyContent: "center", padding: 20 },
  card:          { backgroundColor: "#FF5F03", borderRadius: 16, width: "100%", maxWidth: 400, overflow: "hidden" },
  close:         { position: "absolute", top: 12, right: 12, zIndex: 10, width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.2)", borderWidth: 2, borderColor: "#fff", alignItems: "center", justifyContent: "center" },
  closeX:        { color: "#fff", fontSize: 20, fontWeight: "700", lineHeight: 22 },
  img:           { width: "100%", height: 200 },
  imgPlaceholder:{ height: 180, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.15)" },
  trophy:        { fontSize: 64 },
  body:          { padding: 20 },
  tag:           { fontSize: 10, color: "rgba(255,255,255,0.8)", letterSpacing: 2, fontWeight: "600", marginBottom: 6 },
  title:         { fontSize: 20, fontWeight: "700", color: "#fff", marginBottom: 8 },
  meta:          { fontSize: 12, color: "rgba(255,255,255,0.9)", marginBottom: 4 },
  place:         { fontSize: 12, color: "rgba(255,255,255,0.85)", marginBottom: 16 },
  cta:           { backgroundColor: "#fff", borderRadius: 8, paddingVertical: 12, alignItems: "center" },
  ctaTxt:        { color: "#FF5F03", fontWeight: "700", fontSize: 14 },
});
