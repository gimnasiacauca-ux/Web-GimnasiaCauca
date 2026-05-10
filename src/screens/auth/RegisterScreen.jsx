import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, Switch, Alert
} from "react-native";
import BackButton from "../../components/BackButton";
import { CLUBES } from "../../constants/data";
import { DISC_COLORS } from "../../constants/theme";
import { saveRegistro } from "../../services/auth";

const T = {
  bg: "#EDEADE", card: "#FFFFFF", border: "#D8D4C3",
  text: "#111827", textSec: "#374151", textMut: "#6B7280",
  primary: "#072C2C", secondary: "#FF5F03", secondaryLt: "#FFE9DC",
  danger: "#DC2626", panel: "#F7F5EC",
};

const TIPOS_DOC = ["RC", "TI", "CC"];
const GENEROS = ["F", "M", "No binario"];
const SANGRE = ["O+","O-","A+","A-","B+","B-","AB+","AB-"];
const DISCIPLINAS = Object.keys(DISC_COLORS);

function Field({ label, children }) {
  return (
    <View style={f.field}>
      <Text style={[f.label, { color: T.textMut }]}>{label}</Text>
      {children}
    </View>
  );
}

function Input({ value, onChange, placeholder, keyboardType, multiline }) {
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor={T.textMut}
      keyboardType={keyboardType}
      multiline={multiline}
      style={[f.input, { color: T.text, borderColor: T.border, backgroundColor: T.card }]}
    />
  );
}

function ChipGroup({ options, value, onChange }) {
  return (
    <View style={f.chips}>
      {options.map(o => (
        <TouchableOpacity key={o}
          style={[f.chip, value === o && { backgroundColor: T.secondary, borderColor: T.secondary }]}
          onPress={() => onChange(o)} activeOpacity={0.7}>
          <Text style={[f.chipTxt, { color: value === o ? "#fff" : T.text }]}>{o}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function Section({ title }) {
  return <Text style={[f.section, { color: T.primary, borderBottomColor: T.border }]}>{title}</Text>;
}

export default function RegisterScreen({ navigation, onRegister }) {
  const [form, setForm] = useState({
    nombres: "", apellidos: "", tipo_doc: "CC", num_doc: "",
    fecha_nac: "", genero: "F", ciudad_nac: "", depto_nac: "",
    direccion: "", barrio: "", telefono: "", correo: "",
    club: "", disciplina: "", entrenador: "", experiencia: "",
    eps: "", sangre: "O+", alergias: "", contacto_emg: "",
    nombre_emg: "", acudiente: "", doc_acudiente: "", parentesco: "",
    tel_acudiente: "", correo_acudiente: "",
    habeas: false,
  });
  const [saving, setSaving] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const isMenor = () => {
    if (!form.fecha_nac) return false;
    const [y, m, d] = form.fecha_nac.split("-").map(Number);
    const edad = new Date().getFullYear() - y;
    return edad < 18;
  };

  const handleGuardar = async () => {
    if (!form.nombres || !form.apellidos || !form.num_doc || !form.telefono) {
      Alert.alert("Campos requeridos", "Completa los campos obligatorios marcados.");
      return;
    }
    if (!form.habeas) {
      Alert.alert("Habeas Data", "Debes autorizar el tratamiento de datos personales para continuar.");
      return;
    }
    setSaving(true);
    await saveRegistro(form);
    setSaving(false);
    Alert.alert("¡Registro exitoso!", "Tu solicitud ha sido enviada a la Liga Caucana de Gimnasia.", [
      { text: "Continuar", onPress: () => { onRegister?.(); navigation.goBack(); } }
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: T.bg }}>
      <View style={[f.header, { backgroundColor: T.primary }]}>
        <BackButton onPress={() => navigation.goBack()} T={T} />
        <Text style={f.headerTitle}>Registro en la Liga</Text>
      </View>

      <ScrollView contentContainerStyle={f.body} showsVerticalScrollIndicator={false}>

        <Section title="📋 Información Personal" />
        <Field label="Nombres *"><Input value={form.nombres} onChange={v => set("nombres", v)} placeholder="Nombres completos" /></Field>
        <Field label="Apellidos *"><Input value={form.apellidos} onChange={v => set("apellidos", v)} placeholder="Apellidos completos" /></Field>
        <Field label="Tipo de documento">
          <ChipGroup options={TIPOS_DOC} value={form.tipo_doc} onChange={v => set("tipo_doc", v)} />
        </Field>
        <Field label="Número de documento *"><Input value={form.num_doc} onChange={v => set("num_doc", v)} placeholder="Número" keyboardType="numeric" /></Field>
        <Field label="Fecha de nacimiento (AAAA-MM-DD)"><Input value={form.fecha_nac} onChange={v => set("fecha_nac", v)} placeholder="2005-06-15" /></Field>
        <Field label="Género"><ChipGroup options={GENEROS} value={form.genero} onChange={v => set("genero", v)} /></Field>
        <Field label="Ciudad de nacimiento"><Input value={form.ciudad_nac} onChange={v => set("ciudad_nac", v)} placeholder="Ciudad" /></Field>
        <Field label="Departamento de nacimiento"><Input value={form.depto_nac} onChange={v => set("depto_nac", v)} placeholder="Departamento" /></Field>

        <Section title="📞 Información de Contacto" />
        <Field label="Dirección"><Input value={form.direccion} onChange={v => set("direccion", v)} placeholder="Calle, número, apartamento" /></Field>
        <Field label="Barrio / Comuna"><Input value={form.barrio} onChange={v => set("barrio", v)} placeholder="Barrio" /></Field>
        <Field label="Teléfono *"><Input value={form.telefono} onChange={v => set("telefono", v)} placeholder="+57 300 000 0000" keyboardType="phone-pad" /></Field>
        <Field label="Correo electrónico"><Input value={form.correo} onChange={v => set("correo", v)} placeholder="correo@ejemplo.com" keyboardType="email-address" /></Field>

        <Section title="🏃 Información Socio-Deportiva" />
        <Field label="Club">
          <View style={f.chips}>
            {CLUBES.map(c => (
              <TouchableOpacity key={c.id}
                style={[f.chip, form.club === c.id && { backgroundColor: T.secondary, borderColor: T.secondary }]}
                onPress={() => set("club", c.id)} activeOpacity={0.7}>
                <Text style={[f.chipTxt, { color: form.club === c.id ? "#fff" : T.text }]}>{c.nombre}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Field>
        <Field label="Disciplina">
          <View style={f.chips}>
            {DISCIPLINAS.map(d => {
              const dc = DISC_COLORS[d];
              return (
                <TouchableOpacity key={d}
                  style={[f.chip, form.disciplina === d && { backgroundColor: dc.bg, borderColor: dc.bg }]}
                  onPress={() => set("disciplina", d)} activeOpacity={0.7}>
                  <Text style={[f.chipTxt, { color: form.disciplina === d ? dc.text : T.text }]}>{dc.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Field>
        <Field label="Entrenador actual"><Input value={form.entrenador} onChange={v => set("entrenador", v)} placeholder="Nombre del entrenador" /></Field>
        <Field label="Años de experiencia"><Input value={form.experiencia} onChange={v => set("experiencia", v)} placeholder="0" keyboardType="numeric" /></Field>

        <Section title="🏥 Salud y Emergencias" />
        <Field label="EPS / Régimen"><Input value={form.eps} onChange={v => set("eps", v)} placeholder="Ej: Sura / Contributivo" /></Field>
        <Field label="Tipo de sangre"><ChipGroup options={SANGRE} value={form.sangre} onChange={v => set("sangre", v)} /></Field>
        <Field label="Alergias / condiciones médicas"><Input value={form.alergias} onChange={v => set("alergias", v)} placeholder="Ninguna, penicilina…" multiline /></Field>
        <Field label="Nombre contacto de emergencia"><Input value={form.nombre_emg} onChange={v => set("nombre_emg", v)} placeholder="Nombre" /></Field>
        <Field label="Teléfono de emergencia *"><Input value={form.contacto_emg} onChange={v => set("contacto_emg", v)} placeholder="+57 300 000 0000" keyboardType="phone-pad" /></Field>

        {isMenor() && (
          <>
            <Section title="👨‍👩‍👧 Acudiente" />
            <Field label="Nombre del acudiente"><Input value={form.acudiente} onChange={v => set("acudiente", v)} placeholder="Nombre completo" /></Field>
            <Field label="Documento del acudiente"><Input value={form.doc_acudiente} onChange={v => set("doc_acudiente", v)} placeholder="Número de documento" /></Field>
            <Field label="Parentesco"><Input value={form.parentesco} onChange={v => set("parentesco", v)} placeholder="Padre / Madre / Tutor" /></Field>
            <Field label="Teléfono acudiente"><Input value={form.tel_acudiente} onChange={v => set("tel_acudiente", v)} placeholder="+57 300 000 0000" keyboardType="phone-pad" /></Field>
            <Field label="Correo acudiente"><Input value={form.correo_acudiente} onChange={v => set("correo_acudiente", v)} placeholder="correo@ejemplo.com" keyboardType="email-address" /></Field>
          </>
        )}

        {/* Habeas Data */}
        <View style={[f.habeas, { backgroundColor: T.card, borderColor: T.border }]}>
          <Switch value={form.habeas} onValueChange={v => set("habeas", v)}
            trackColor={{ false: T.border, true: T.secondary }}
            thumbColor={form.habeas ? "#fff" : "#ccc"} />
          <Text style={[f.habeasTxt, { color: T.textSec }]}>
            Autorizo el tratamiento de mis datos personales conforme a la{" "}
            <Text style={{ fontWeight: "700" }}>Ley 1581 de 2012 (Habeas Data)</Text>
            {" "}y las políticas de privacidad de la Liga Caucana de Gimnasia.
          </Text>
        </View>

        <TouchableOpacity
          style={[f.saveBtn, { backgroundColor: saving ? T.textMut : T.secondary }]}
          onPress={handleGuardar}
          disabled={saving}
          activeOpacity={0.85}>
          <Text style={f.saveTxt}>{saving ? "Guardando..." : "ENVIAR REGISTRO"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const f = StyleSheet.create({
  header:     { flexDirection: "row", alignItems: "center", padding: 12, gap: 10, paddingTop: 50 },
  headerTitle:{ fontSize: 16, fontWeight: "700", color: "#fff", flex: 1 },
  body:       { padding: 20, paddingBottom: 60 },
  section:    { fontSize: 13, fontWeight: "700", letterSpacing: 1, paddingBottom: 8, borderBottomWidth: 1, marginBottom: 14, marginTop: 20 },
  field:      { marginBottom: 14 },
  label:      { fontSize: 11, fontWeight: "600", marginBottom: 5, letterSpacing: 0.5 },
  input:      { borderWidth: 1, borderRadius: 8, padding: 10, fontSize: 14 },
  chips:      { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip:       { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: "#D8D4C3" },
  chipTxt:    { fontSize: 13 },
  habeas:     { flexDirection: "row", alignItems: "flex-start", gap: 10, padding: 14, borderRadius: 10, borderWidth: 1, marginTop: 20 },
  habeasTxt:  { flex: 1, fontSize: 12, lineHeight: 18 },
  saveBtn:    { marginTop: 24, borderRadius: 12, paddingVertical: 16, alignItems: "center" },
  saveTxt:    { color: "#fff", fontWeight: "700", fontSize: 15, letterSpacing: 1 },
});
