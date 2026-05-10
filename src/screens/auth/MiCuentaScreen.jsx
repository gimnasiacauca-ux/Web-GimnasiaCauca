import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  Image, StyleSheet, Alert
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import BackButton from "../../components/BackButton";
import { getProfile, saveProfile } from "../../services/auth";

export default function MiCuentaScreen({ navigation, user, onSave, T }) {
  const [displayNombre, setDisplayNombre] = useState(user?.displayNombre || user?.nombre || "");
  const [foto, setFoto] = useState(user?.foto || null);
  const [sugerencias, setSugerencias] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setSugerencias(generarSugerencias(user));
    getProfile(user?.id).then(p => {
      if (p?.displayNombre) setDisplayNombre(p.displayNombre);
      if (p?.foto) setFoto(p.foto);
    });
  }, [user]);

  const elegirFoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso necesario", "Se necesita acceso a la galería.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, aspect: [1, 1], quality: 0.7,
    });
    if (!result.canceled) setFoto(result.assets[0].uri);
  };

  const handleGuardar = async () => {
    setSaving(true);
    await saveProfile(user?.id, { displayNombre, foto });
    setSaving(false);
    onSave?.({ ...user, displayNombre, foto });
    Alert.alert("Guardado", "Tu perfil ha sido actualizado.");
  };

  const inicial = (displayNombre || "?").charAt(0).toUpperCase();

  return (
    <View style={[s.wrap, { backgroundColor: T.bg }]}>
      <View style={[s.header, { backgroundColor: T.primary }]}>
        <BackButton onPress={() => navigation.goBack()} T={T} />
        <Text style={s.headerTitle}>Mi Cuenta</Text>
      </View>

      <ScrollView contentContainerStyle={s.body} showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={s.avatarSection}>
          <TouchableOpacity onPress={elegirFoto} style={s.avatarWrap} activeOpacity={0.8}>
            {foto
              ? <Image source={{ uri: foto }} style={s.avatarImg} />
              : <View style={[s.avatarFallback, { backgroundColor: T.secondary }]}>
                  <Text style={s.avatarInitial}>{inicial}</Text>
                </View>
            }
            <View style={[s.cameraBtn, { backgroundColor: T.primary }]}>
              <Text style={s.cameraIcon}>📷</Text>
            </View>
          </TouchableOpacity>
          <Text style={[s.avatarHint, { color: T.textMut }]}>Toca para cambiar foto</Text>
        </View>

        {/* Display name */}
        <View style={[s.card, { backgroundColor: T.card, borderColor: T.border }]}>
          <Text style={[s.fieldLabel, { color: T.textMut }]}>NOMBRE PARA MOSTRAR</Text>
          <TextInput
            value={displayNombre}
            onChangeText={setDisplayNombre}
            style={[s.input, { color: T.text, borderColor: T.border }]}
            placeholder="Cómo quieres que te llamen"
            placeholderTextColor={T.textMut}
          />

          {/* Suggestions */}
          <Text style={[s.sugTitle, { color: T.textMut }]}>SUGERENCIAS</Text>
          <View style={s.chips}>
            {sugerencias.map(sug => (
              <TouchableOpacity key={sug}
                style={[s.chip, { borderColor: T.border, backgroundColor: displayNombre === sug ? T.secondary : T.panel }]}
                onPress={() => setDisplayNombre(sug)} activeOpacity={0.7}>
                <Text style={[s.chipTxt, { color: displayNombre === sug ? "#fff" : T.text }]}>{sug}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* User info */}
        {user && (
          <View style={[s.card, { backgroundColor: T.card, borderColor: T.border }]}>
            <Text style={[s.fieldLabel, { color: T.textMut }]}>INFORMACIÓN DE CUENTA</Text>
            <InfoRow label="ID" value={user.id} T={T} />
            <InfoRow label="Rol" value={user.role === "entrenador" ? "Entrenador" : "Atleta"} T={T} />
            {user.cargo && <InfoRow label="Cargo" value={user.cargo} T={T} />}
            {user.club && <InfoRow label="Club" value={user.club} T={T} />}
            {user.disciplina && <InfoRow label="Disciplina" value={user.disciplina} T={T} />}
          </View>
        )}

        <TouchableOpacity
          style={[s.saveBtn, { backgroundColor: saving ? T.textMut : T.secondary }]}
          onPress={handleGuardar} disabled={saving} activeOpacity={0.85}>
          <Text style={s.saveTxt}>{saving ? "Guardando..." : "GUARDAR CAMBIOS"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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

function generarSugerencias(user) {
  if (!user?.nombre) return [];
  const parts = user.nombre.trim().split(/\s+/);
  const first = parts[0] || "User";
  const last = parts[parts.length - 1] || "LCG";
  const disc = user.disciplina || "LCG";
  const year = new Date().getFullYear().toString().slice(2);
  const rnd = Math.floor(Math.random() * 90 + 10);
  return [
    `${first}LCG${year}`,
    `${first}Atleta`,
    `${first.slice(0,2)}_Cauca`,
    `${last}_${disc}`,
    `${first.slice(0,1)}${last.slice(0,1)}_LCG${rnd}`,
  ];
}

const s = StyleSheet.create({
  wrap:           { flex: 1 },
  header:         { flexDirection: "row", alignItems: "center", padding: 12, gap: 10, paddingTop: 50 },
  headerTitle:    { fontSize: 16, fontWeight: "700", color: "#fff", flex: 1 },
  body:           { padding: 20, paddingBottom: 60, alignItems: "center" },
  avatarSection:  { alignItems: "center", marginBottom: 24 },
  avatarWrap:     { position: "relative", marginBottom: 8 },
  avatarImg:      { width: 100, height: 100, borderRadius: 50 },
  avatarFallback: { width: 100, height: 100, borderRadius: 50, alignItems: "center", justifyContent: "center" },
  avatarInitial:  { color: "#fff", fontSize: 42, fontWeight: "700" },
  cameraBtn:      { position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  cameraIcon:     { fontSize: 14 },
  avatarHint:     { fontSize: 12 },
  card:           { width: "100%", borderRadius: 12, borderWidth: 1, padding: 16, marginBottom: 16 },
  fieldLabel:     { fontSize: 10, fontWeight: "700", letterSpacing: 1.5, marginBottom: 8 },
  input:          { borderWidth: 1, borderRadius: 8, padding: 10, fontSize: 15, marginBottom: 12 },
  sugTitle:       { fontSize: 10, fontWeight: "600", letterSpacing: 1, marginBottom: 8 },
  chips:          { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip:           { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  chipTxt:        { fontSize: 13 },
  infoRow:        { flexDirection: "row", paddingVertical: 6, borderTopWidth: 1, borderTopColor: "rgba(0,0,0,0.05)" },
  infoLabel:      { width: 90, fontSize: 12 },
  infoVal:        { flex: 1, fontSize: 12, fontWeight: "600" },
  saveBtn:        { width: "100%", borderRadius: 12, paddingVertical: 16, alignItems: "center" },
  saveTxt:        { color: "#fff", fontWeight: "700", fontSize: 15, letterSpacing: 1 },
});
