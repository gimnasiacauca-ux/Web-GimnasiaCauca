import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from "react-native";
import LogoLCG from "../../components/LogoLCG";
import SocialButtons from "../../components/SocialButtons";

const { width } = Dimensions.get("window");

const ROLES = [
  { id: "entrenador", icon: "🏋️", label: "ENTRENADOR", desc: "Acceso al panel técnico y seguimiento de atletas" },
  { id: "atleta",     icon: "🤸", label: "ATLETA INSCRITO", desc: "Tu progreso, entrenamiento y carnet deportivo" },
  { id: "publico",    icon: "🌐", label: "EXPLORAR",        desc: "Ejercicios, clases, eventos y red de clubes" },
];

export default function LandingScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <View style={s.hero}>
        <View style={s.logoWrap}>
          <LogoLCG size={60} />
        </View>
        <Text style={s.appName}>APP GIMNASIA CAUCA</Text>
        <Text style={s.liga}>LIGA CAUCANA DE GIMNASIA</Text>
        <Text style={s.ciudad}>Popayán · Cauca · Colombia</Text>
      </View>

      {/* Role cards */}
      <View style={s.cards}>
        {ROLES.map(r => (
          <TouchableOpacity key={r.id}
            style={[s.card, r.id === "publico" && s.cardPublico]}
            onPress={() => navigation.navigate("Login", { role: r.id })}
            activeOpacity={0.8}>
            <Text style={s.cardIcon}>{r.icon}</Text>
            <Text style={s.cardLabel}>{r.label}</Text>
            <Text style={s.cardDesc}>{r.desc}</Text>
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

      <SocialButtons />

      <Text style={s.version}>v1.0.0 · LCG AppK</Text>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container:    { flexGrow: 1, alignItems: "center", backgroundColor: "#072C2C", paddingBottom: 40 },
  hero:         { alignItems: "center", paddingTop: 60, paddingBottom: 32 },
  logoWrap:     { backgroundColor: "#fff", borderRadius: 16, padding: 8, marginBottom: 16 },
  appName:      { fontSize: 20, fontWeight: "700", color: "#fff", letterSpacing: 1.5 },
  liga:         { fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 2, marginTop: 4 },
  ciudad:       { fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 2 },
  cards:        { width: "100%", paddingHorizontal: 20, gap: 12 },
  card:         { backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 14, padding: 18, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", flexDirection: "row", alignItems: "center", gap: 14 },
  cardPublico:  { borderColor: "rgba(255,255,255,0.06)", opacity: 0.85 },
  cardIcon:     { fontSize: 32 },
  cardLabel:    { fontSize: 14, fontWeight: "700", color: "#fff", flex: 1 },
  cardDesc:     { display: "none" },
  registerBtn:  { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 20, backgroundColor: "#FF5F03", borderRadius: 12, paddingHorizontal: 24, paddingVertical: 14 },
  registerIcon: { fontSize: 16 },
  registerTxt:  { color: "#fff", fontWeight: "700", fontSize: 13, letterSpacing: 1 },
  version:      { marginTop: 24, fontSize: 9, color: "rgba(255,255,255,0.3)" },
});
