import React from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const OPCIONES = [
  { id: "radar",  icon: "🕸️",  label: "Radar (Telaraña)",        desc: "Vista multidimensional de habilidades" },
  { id: "lineas", icon: "📈",  label: "Líneas (Series Temporales)", desc: "Evolución semana a semana" },
  { id: "barras", icon: "📊",  label: "Barras Agrupadas",          desc: "Comparación entre categorías" },
  { id: "balas",  icon: "🎯",  label: "Balas (Bullet Chart)",      desc: "Objetivo vs resultado actual" },
  { id: "heatmap",icon: "🟩",  label: "Mapa de Calor",             desc: "Intensidad por sesión/semana" },
];

export default function PrintChartModal({ visible, onClose, onSelect, T }) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={s.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity activeOpacity={1} style={[s.sheet, { backgroundColor: T.card }]} onPress={() => {}}>
          <View style={[s.handle, { backgroundColor: T.border }]} />
          <Text style={[s.title, { color: T.text }]}>Tipo de Gráfico</Text>
          <Text style={[s.sub, { color: T.textMut }]}>Elige cómo visualizar el informe antes de imprimir</Text>
          <ScrollView style={{ marginTop: 8 }} showsVerticalScrollIndicator={false}>
            {OPCIONES.map(op => (
              <TouchableOpacity key={op.id}
                style={[s.row, { borderColor: T.border }]}
                onPress={() => { onSelect(op.id); onClose(); }}
                activeOpacity={0.75}>
                <Text style={s.icon}>{op.icon}</Text>
                <View style={s.info}>
                  <Text style={[s.label, { color: T.text }]}>{op.label}</Text>
                  <Text style={[s.desc, { color: T.textMut }]}>{op.desc}</Text>
                </View>
                <Text style={[s.arrow, { color: T.textMut }]}>›</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={[s.cancel, { borderColor: T.border }]} onPress={onClose} activeOpacity={0.7}>
            <Text style={[s.cancelTxt, { color: T.textMut }]}>Cancelar</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay:   { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  sheet:     { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 36 },
  handle:    { width: 40, height: 4, borderRadius: 2, alignSelf: "center", marginBottom: 16 },
  title:     { fontSize: 18, fontWeight: "700", textAlign: "center" },
  sub:       { fontSize: 12, textAlign: "center", marginTop: 4, marginBottom: 4 },
  row:       { flexDirection: "row", alignItems: "center", paddingVertical: 14, borderBottomWidth: 1, gap: 12 },
  icon:      { fontSize: 26, width: 36, textAlign: "center" },
  info:      { flex: 1 },
  label:     { fontSize: 15, fontWeight: "600" },
  desc:      { fontSize: 12, marginTop: 2 },
  arrow:     { fontSize: 22 },
  cancel:    { marginTop: 16, borderWidth: 1, borderRadius: 10, paddingVertical: 12, alignItems: "center" },
  cancelTxt: { fontSize: 15, fontWeight: "600" },
});
