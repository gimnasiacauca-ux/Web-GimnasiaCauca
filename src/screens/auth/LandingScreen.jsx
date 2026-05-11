import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from "react-native";
import LogoLCG from "../../components/LogoLCG";
import SocialButtons from "../../components/SocialButtons";

const { width } = Dimensions.get("window");

const ROLES = [
  { id: "entrenador", icon: "🏋️", label: "ENTRENADOR",       desc: "Panel técnico · Atletas · Informes",       color: "#072C2C" },
  { id: "atleta",     icon: "🤸", label: "ATLETA INSCRITO",   desc: "Mi progreso · Carnet QR · Entrenamiento",  color: "#1565C0" },
  { id: "publico",    icon: "🌐", label: "EXPLORAR",          desc: "Ejercicios · Clases · Eventos · Red Liga",  color: "#4a4a4a" },
];

export default function LandingScreen({ navigation }) {
  return (
    <ScrollView
      contentContainerStyle={s.container}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#072C2C" }}>

      {/* Hero */}
      <View style={s.hero}>
        <View style={s.logoWrap}>
          <LogoLCG size={54} />
        </View>
        <Text style={s.appName}>APP GIMNASIA CAUCA</Text>
        <Text style={s.liga}>LIGA CAUCANA DE GIMNASIA</Text>
        <Text style={s.ciudad}>Popayán · Cauca · Colombia</Text>
      </View>

      {/* Role cards */}
      <View style={s.cards}>
        {ROLES.map(r => (
          <TouchableOpacity key={r.id}
            style={[s.card, { borderColor: r.color + "55" }]}
            onPress={() => navigation.navigate("Login", { role: r.id })}
            activeOpacity={0.8}>
            <View style={[s.iconCircle, { backgroundColor: r.color }]}>
              <Text style={s.cardIcon}>{r.icon}</Text>
            </View>
            <View style={s.cardText}>
              <Text style={s.cardLabel}>{r.label}</Text>
              <Text style={s.cardDesc}>{r.desc}</Text>
            </View>
            <Text style={s.cardArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Register CTA */}
      <TouchableOpacity style={s.registerBtn}
        onPress={() => navigation.navigate("Register")}
        activeOpacity={0.85}>
        <Text style={s.registerIcon}>📝</Text>
        <Text style={s.registerTxt}>REGÍSTRATE EN LA LIGA</Text>
      </TouchableOpacity>

      <View style={s.socialWrap}>
        <SocialButtons />
      </View>

      <Text style={s.version}>v1.0.0 · LCG AppK</Text>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container:   { flexGrow: 1, alignItems: "center", paddingBottom: 40 },
  hero:        { alignItems: "center", paddingTop: 56, paddingBottom: 28, paddingHorizontal: 20 },
  logoWrap:    { backgroundColor: "#fff", borderRadius: 18, padding: 10, marginBottom: 16,
                 shadowColor: "#FF5F03", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 8 },
  appName:     { fontSize: 22, fontWeight: "700", color: "#fff", letterSpacing: 1.5, textAlign: "center" },
  liga:        { fontSize: 11, color: "rgba(255,255,255,0.65)", letterSpacing: 2, marginTop: 4 },
  ciudad:      { fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 3 },
  cards:       { width: "100%", paddingHorizontal: 20, gap: 10 },
  card:        { flexDirection: "row", alignItems: "center", padding: 16, borderRadius: 14,
                 backgroundColor: "rgba(255,255,255,0.07)", borderWidth: 1, gap: 12 },
  iconCircle:  { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" },
  cardIcon:    { fontSize: 24 },
  cardText:    { flex: 1 },
  cardLabel:   { fontSize: 14, fontWeight: "700", color: "#fff" },
  cardDesc:    { fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 3 },
  cardArrow:   { fontSize: 24, color: "rgba(255,255,255,0.4)" },
  registerBtn: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 20,
                 backgroundColor: "#FF5F03", borderRadius: 12, paddingHorizontal: 28, paddingVertical: 14,
                 shadowColor: "#FF5F03", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 6 },
  registerIcon:{ fontSize: 16 },
  registerTxt: { color: "#fff", fontWeight: "700", fontSize: 13, letterSpacing: 1 },
  socialWrap:  { marginTop: 24 },
  version:     { marginTop: 20, fontSize: 9, color: "rgba(255,255,255,0.25)" },
});
