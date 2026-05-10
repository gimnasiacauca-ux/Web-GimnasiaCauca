import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { CLUBES, PATROCINADORES } from "../../constants/data";

const COMO_UNIRSE = [
  {
    id: "colegios",
    icon: "🏫",
    titulo: "Colegios e Instituciones de Educación Media",
    contenido: "Las instituciones educativas pueden incluir disciplinas urbanas como Parkour, Calistenia y Porrismo en sus programas de educación física. La LCG ofrece apoyo técnico, material didáctico y acompañamiento de entrenadores certificados. Contáctanos para establecer un convenio y acceder a clases gratuitas para tus estudiantes.",
  },
  {
    id: "clubes",
    icon: "🏋️",
    titulo: "Clubes Deportivos",
    contenido: "Para afiliarte como club a la Liga Caucana de Gimnasia necesitas: personería jurídica vigente, mínimo 10 atletas activos, entrenador con certificación técnica, y comprometerte con la participación en 2 eventos anuales. El proceso incluye solicitud formal, visita de verificación y registro ante Coldeportes. Beneficios: acceso a competencias, seguros deportivos, capacitaciones y representación ante organismos nacionales.",
  },
  {
    id: "universidades",
    icon: "🎓",
    titulo: "Instituciones de Educación Superior",
    contenido: "Las universidades y politécnicos pueden establecer alianzas con la LCG para: creación de semilleros deportivos universitarios, práctica profesional en áreas de entrenamiento y gestión deportiva, investigación aplicada en ciencias del deporte, y organización conjunta de eventos académico-deportivos. Popayán cuenta con una comunidad activa lista para colaborar.",
  },
];

function Accordion({ item, T }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={[s.accordion, { borderColor: T.border }]}>
      <TouchableOpacity style={[s.accHeader, { backgroundColor: open ? T.secondaryLt : T.card }]}
        onPress={() => setOpen(o => !o)} activeOpacity={0.7}>
        <Text style={s.accIcon}>{item.icon}</Text>
        <Text style={[s.accTitle, { color: T.text }]}>{item.titulo}</Text>
        <Text style={[s.accChevron, { color: T.textMut }]}>{open ? "▾" : "▸"}</Text>
      </TouchableOpacity>
      {open && (
        <View style={[s.accBody, { backgroundColor: T.panel }]}>
          <Text style={[s.accContent, { color: T.textSec }]}>{item.contenido}</Text>
          <TouchableOpacity style={[s.contactBtn, { borderColor: T.secondary }]}
            onPress={() => Linking.openURL("https://wa.me/573128068821?text=Hola%2C+quiero+info+para+unirme+a+la+LCG")}
            activeOpacity={0.8}>
            <Text style={[s.contactTxt, { color: T.secondary }]}>💬 Contactar a la Liga</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default function RedLigaScreen({ T }) {
  return (
    <ScrollView style={[s.wrap, { backgroundColor: T.bg }]} contentContainerStyle={s.body}>
      <Text style={[s.pageTitle, { color: T.text }]}>Red Liga</Text>

      {/* Clubs */}
      <Text style={[s.sectionTitle, { color: T.text }]}>🏟 Clubes Deportivos Afiliados</Text>
      {CLUBES.map(c => (
        <View key={c.id} style={[s.clubCard, { backgroundColor: T.card, borderColor: T.border, borderLeftColor: c.color }]}>
          <View style={[s.clubAvatar, { backgroundColor: c.color }]}>
            <Text style={s.clubInitial}>{c.nombre.charAt(0)}</Text>
          </View>
          <View style={s.clubInfo}>
            <Text style={[s.clubName, { color: T.text }]}>{c.nombre}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(`https://instagram.com/${c.redes.replace("@","")}`)} activeOpacity={0.8}>
              <Text style={[s.clubRedes, { color: T.blue }]}>{c.redes}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${c.contacto}`)} activeOpacity={0.8}>
              <Text style={[s.clubContacto, { color: T.textMut }]}>📞 {c.contacto}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Sponsors */}
      <Text style={[s.sectionTitle, { color: T.text }]}>🤝 Patrocinadores</Text>
      <View style={s.sponsorGrid}>
        {PATROCINADORES.map((p, i) => (
          <TouchableOpacity key={i}
            style={[s.sponsorCard, { backgroundColor: T.card, borderColor: T.border }]}
            onPress={() => Linking.openURL(p.url)} activeOpacity={0.8}>
            <View style={[s.sponsorDot, { backgroundColor: p.color }]} />
            <Text style={[s.sponsorName, { color: T.text }]}>{p.nombre}</Text>
            <Text style={[s.sponsorLink, { color: T.textMut }]}>Ver más ›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* How to join */}
      <Text style={[s.sectionTitle, { color: T.text }]}>❓ ¿Cómo ser parte de la Liga Caucana?</Text>
      {COMO_UNIRSE.map(item => (
        <Accordion key={item.id} item={item} T={T} />
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap:         { flex: 1 },
  body:         { padding: 16, paddingBottom: 100, gap: 10 },
  pageTitle:    { fontSize: 20, fontWeight: "700", marginBottom: 4 },
  sectionTitle: { fontSize: 15, fontWeight: "700", marginTop: 8 },
  clubCard:     { flexDirection: "row", alignItems: "center", borderRadius: 12, borderWidth: 1, borderLeftWidth: 4, padding: 14, gap: 12 },
  clubAvatar:   { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  clubInitial:  { color: "#fff", fontSize: 20, fontWeight: "700" },
  clubInfo:     { flex: 1, gap: 3 },
  clubName:     { fontSize: 15, fontWeight: "700" },
  clubRedes:    { fontSize: 12 },
  clubContacto: { fontSize: 12 },
  sponsorGrid:  { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  sponsorCard:  { width: "47%", borderRadius: 12, borderWidth: 1, padding: 12, alignItems: "center", gap: 6 },
  sponsorDot:   { width: 16, height: 16, borderRadius: 8 },
  sponsorName:  { fontSize: 13, fontWeight: "600", textAlign: "center" },
  sponsorLink:  { fontSize: 11 },
  accordion:    { borderWidth: 1, borderRadius: 12, overflow: "hidden", marginBottom: 4 },
  accHeader:    { flexDirection: "row", alignItems: "center", padding: 14, gap: 10 },
  accIcon:      { fontSize: 20 },
  accTitle:     { flex: 1, fontSize: 14, fontWeight: "600" },
  accChevron:   { fontSize: 16 },
  accBody:      { padding: 14 },
  accContent:   { fontSize: 13, lineHeight: 20, marginBottom: 12 },
  contactBtn:   { borderRadius: 8, borderWidth: 1, paddingVertical: 8, alignItems: "center" },
  contactTxt:   { fontSize: 13, fontWeight: "700" },
});
