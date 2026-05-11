import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { DISC_COLORS, pagoLabel, pagoColor } from "../../constants/theme";
import DiscBadge from "../../components/DiscBadge";

export default function CarnetScreen({ user, T }) {
  if (!user) return null;
  const qrData = JSON.stringify({ id: user.id, nombre: user.nombre, club: user.club, disciplina: user.disciplina, nro: user.nro_registro });

  return (
    <ScrollView style={[s.wrap, { backgroundColor: T.bg }]} contentContainerStyle={s.body}>
      <Text style={[s.pageTitle, { color: T.text }]}>Carnet Deportivo</Text>

      {/* Carnet card */}
      <View style={[s.carnet, { backgroundColor: T.primary }]}>
        {/* Header strip */}
        <View style={[s.strip, { backgroundColor: "#FF5F03" }]}>
          <Text style={s.stripTxt}>LIGA CAUCANA DE GIMNASIA</Text>
          <Text style={s.stripSub}>CARNET DEPORTIVO OFICIAL</Text>
        </View>

        {/* Main content */}
        <View style={s.content}>
          {/* Avatar */}
          <View style={s.avatarWrap}>
            {user.foto
              ? <Image source={{ uri: user.foto }} style={s.avatarImg} />
              : <View style={[s.avatarFallback, { backgroundColor: "#FF5F03" }]}>
                  <Text style={s.avatarInitial}>{(user.displayNombre || user.nombre).charAt(0)}</Text>
                </View>
            }
          </View>

          {/* Info */}
          <View style={s.info}>
            <Text style={s.name}>{user.displayNombre || user.nombre}</Text>
            <DiscBadge disciplina={user.disciplina} />
            <Text style={s.meta}>{user.categoria}</Text>
            <Text style={s.meta}>{user.club}</Text>
            <View style={[s.nivBadge, { backgroundColor: "rgba(255,255,255,0.15)" }]}>
              <Text style={s.nivTxt}>Nivel {user.nivel}</Text>
            </View>
            <View style={[s.pagoBadge, { backgroundColor: user.estado_pago === "activo" ? "#16A34A" : "#DC2626" }]}>
              <Text style={s.pagoTxt}>● {pagoLabel[user.estado_pago]}</Text>
            </View>
          </View>

          {/* QR */}
          <View style={s.qrWrap}>
            <View style={s.qrBox}>
              <QRCode value={qrData} size={90} color="#072C2C" backgroundColor="#fff" />
            </View>
            <Text style={s.nro}>#{user.nro_registro}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={s.footer}>
          <Text style={s.footerTxt}>Popayán · Cauca · Colombia</Text>
          <Text style={s.footerTxt}>www.gimnasiacauca.com</Text>
        </View>
      </View>

      {/* Emergency info */}
      <View style={[s.emergCard, { backgroundColor: T.card, borderColor: T.border }]}>
        <Text style={[s.emergTitle, { color: T.text }]}>Información de Emergencia</Text>
        <InfoRow label="Tipo de sangre" value={user.tipo_sangre} T={T} />
        <InfoRow label="Contacto emergencia" value={user.contacto_emg} T={T} />
        <InfoRow label="Registro N°" value={user.nro_registro} T={T} />
      </View>

      <Text style={[s.note, { color: T.textMut }]}>
        Este carnet es válido con el código QR verificable. Porta siempre una copia digital o impresa.
      </Text>
    </ScrollView>
  );
}

function InfoRow({ label, value, T }) {
  return (
    <View style={s.infoRow}>
      <Text style={[s.infoLabel, { color: T.textMut }]}>{label}</Text>
      <Text style={[s.infoVal, { color: T.text }]}>{value}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  wrap:          { flex: 1 },
  body:          { padding: 16, paddingBottom: 100, alignItems: "center" },
  pageTitle:     { fontSize: 20, fontWeight: "700", marginBottom: 16, alignSelf: "flex-start" },
  carnet:        { width: "100%", maxWidth: 360, borderRadius: 16, overflow: "hidden", marginBottom: 16 },
  strip:         { paddingVertical: 10, paddingHorizontal: 16, alignItems: "center" },
  stripTxt:      { color: "#fff", fontWeight: "700", fontSize: 11, letterSpacing: 1.5 },
  stripSub:      { color: "rgba(255,255,255,0.8)", fontSize: 9, marginTop: 2 },
  content:       { flexDirection: "row", padding: 16, gap: 12, alignItems: "flex-start" },
  avatarWrap:    {},
  avatarImg:     { width: 64, height: 64, borderRadius: 32 },
  avatarFallback:{ width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center" },
  avatarInitial: { color: "#fff", fontSize: 28, fontWeight: "700" },
  info:          { flex: 1, gap: 4 },
  name:          { fontSize: 15, fontWeight: "700", color: "#fff" },
  meta:          { fontSize: 11, color: "rgba(255,255,255,0.75)" },
  nivBadge:      { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, marginTop: 4 },
  nivTxt:        { color: "#fff", fontSize: 10, fontWeight: "600" },
  pagoBadge:     { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, marginTop: 4 },
  pagoTxt:       { color: "#fff", fontSize: 10, fontWeight: "700" },
  qrWrap:        { alignItems: "center", gap: 4 },
  qrBox:         { backgroundColor: "#fff", padding: 6, borderRadius: 8 },
  nro:           { color: "rgba(255,255,255,0.7)", fontSize: 9 },
  footer:        { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.1)", padding: 10, flexDirection: "row", justifyContent: "space-between" },
  footerTxt:     { color: "rgba(255,255,255,0.6)", fontSize: 9 },
  emergCard:     { width: "100%", maxWidth: 360, borderRadius: 12, borderWidth: 1, padding: 14, marginBottom: 12 },
  emergTitle:    { fontSize: 14, fontWeight: "700", marginBottom: 10 },
  infoRow:       { flexDirection: "row", paddingVertical: 6, borderTopWidth: 1, borderTopColor: "rgba(0,0,0,0.05)" },
  infoLabel:     { width: 130, fontSize: 12 },
  infoVal:       { flex: 1, fontSize: 12, fontWeight: "600" },
  note:          { fontSize: 11, textAlign: "center", maxWidth: 320, lineHeight: 16, marginTop: 4 },
});
