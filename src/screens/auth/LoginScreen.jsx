import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { USERS } from "../../constants/data";
import PinInput from "../../components/PinInput";
import BackButton from "../../components/BackButton";
import { login } from "../../services/auth";

const LIGHT = {
  bg: "#EDEADE", card: "#FFFFFF", border: "#D8D4C3",
  text: "#111827", textSec: "#374151", textMut: "#6B7280",
  primary: "#072C2C", secondary: "#FF5F03", secondaryLt: "#FFE9DC",
  danger: "#DC2626", panel: "#F7F5EC",
};

export default function LoginScreen({ route, navigation, onLogin }) {
  const { role } = route.params || {};
  const T = LIGHT;

  const [step, setStep] = useState(role === "publico" ? "done" : "user");
  const [selectedUser, setSelectedUser] = useState(null);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const filteredUsers = USERS.filter(u => u.role === (role === "entrenador" ? "entrenador" : "atleta"));

  const handleSelectUser = (u) => {
    setSelectedUser(u);
    setPin("");
    setError("");
    setStep("pin");
  };

  const handleDigit = (d) => {
    if (pin.length < 4) {
      const newPin = pin + d;
      setPin(newPin);
      if (newPin.length === 4) validatePin(newPin);
    }
  };

  const handleDelete = () => {
    setPin(p => p.slice(0, -1));
    setError("");
  };

  const validatePin = async (p) => {
    if (p === selectedUser.pin) {
      await login(selectedUser);
      onLogin(selectedUser);
    } else {
      setPin("");
      setError("PIN incorrecto. Intenta de nuevo.");
    }
  };

  if (role === "publico") {
    onLogin({ role: "publico", nombre: "Visitante", id: "PUB" });
    return null;
  }

  return (
    <View style={[s.wrap, { backgroundColor: T.bg }]}>
      <View style={[s.header, { backgroundColor: T.primary }]}>
        <BackButton onPress={() => step === "pin" ? setStep("user") : navigation.goBack()} T={T} />
        <Text style={s.headerTitle}>
          {step === "user"
            ? (role === "entrenador" ? "Seleccionar Entrenador" : "Seleccionar Atleta")
            : "Ingresar PIN"}
        </Text>
      </View>

      <ScrollView contentContainerStyle={s.body} showsVerticalScrollIndicator={false}>
        {step === "user" && (
          <>
            <Text style={[s.hint, { color: T.textMut }]}>Selecciona tu usuario para continuar</Text>
            {filteredUsers.map(u => (
              <TouchableOpacity key={u.id}
                style={[s.userCard, { backgroundColor: T.card, borderColor: T.border }]}
                onPress={() => handleSelectUser(u)}
                activeOpacity={0.8}>
                <View style={[s.avatar, { backgroundColor: T.secondary }]}>
                  <Text style={s.avatarTxt}>{u.nombre.charAt(0)}</Text>
                </View>
                <View style={s.userInfo}>
                  <Text style={[s.userName, { color: T.text }]}>{u.nombre}</Text>
                  {u.cargo && <Text style={[s.userSub, { color: T.textMut }]}>{u.cargo}</Text>}
                  {u.club && <Text style={[s.userSub, { color: T.textMut }]}>{u.club} · {u.disciplina}</Text>}
                </View>
                <Text style={[s.chevron, { color: T.textMut }]}>›</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[s.registerLink, { borderColor: T.border }]}
              onPress={() => navigation.navigate("Register")}
              activeOpacity={0.8}>
              <Text style={s.registerIcon}>📝</Text>
              <Text style={[s.registerTxt, { color: T.secondary }]}>REGÍSTRATE COMO {role === "entrenador" ? "ENTRENADOR" : "ATLETA"}</Text>
            </TouchableOpacity>
          </>
        )}

        {step === "pin" && selectedUser && (
          <>
            <View style={[s.userBadge, { backgroundColor: T.card, borderColor: T.border }]}>
              <View style={[s.avatar, { backgroundColor: T.secondary }]}>
                <Text style={s.avatarTxt}>{selectedUser.nombre.charAt(0)}</Text>
              </View>
              <Text style={[s.userName, { color: T.text }]}>{selectedUser.nombre}</Text>
            </View>
            <Text style={[s.pinHint, { color: T.textMut }]}>Ingresa tu PIN de 4 dígitos</Text>
            <PinInput pin={pin} onDigit={handleDigit} onDelete={handleDelete} error={error} T={T} />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  wrap:       { flex: 1 },
  header:     { flexDirection: "row", alignItems: "center", padding: 12, gap: 10, paddingTop: 50 },
  headerTitle:{ fontSize: 16, fontWeight: "700", color: "#fff", flex: 1 },
  body:       { padding: 20, paddingBottom: 40 },
  hint:       { fontSize: 13, marginBottom: 16, textAlign: "center" },
  userCard:   { flexDirection: "row", alignItems: "center", padding: 14, borderRadius: 12, borderWidth: 1, marginBottom: 10, gap: 12 },
  avatar:     { width: 42, height: 42, borderRadius: 21, alignItems: "center", justifyContent: "center" },
  avatarTxt:  { color: "#fff", fontWeight: "700", fontSize: 18 },
  userInfo:   { flex: 1 },
  userName:   { fontSize: 15, fontWeight: "600" },
  userSub:    { fontSize: 12, marginTop: 2 },
  chevron:    { fontSize: 22 },
  registerLink:{ flexDirection: "row", alignItems: "center", gap: 8, padding: 14, borderRadius: 12, borderWidth: 1, borderStyle: "dashed", justifyContent: "center", marginTop: 8 },
  registerIcon:{ fontSize: 16 },
  registerTxt: { fontSize: 13, fontWeight: "700" },
  userBadge:  { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, borderRadius: 12, borderWidth: 1, marginBottom: 20, alignSelf: "center" },
  pinHint:    { fontSize: 13, textAlign: "center", marginBottom: 20 },
});
