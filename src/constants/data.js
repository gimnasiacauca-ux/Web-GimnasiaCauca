export const USERS = [
  { id: "U001", pin: "1234", role: "entrenador", nombre: "Felipe Montenegro",
    cargo: "Director Técnico", club: "LCG", disciplina: "PKR",
    tipo_sangre: "O+", contacto_emg: "+57 300 123 4567",
    stats: { asistencia: 92, programacion: 88, progreso: 85 } },
  { id: "U002", pin: "2222", role: "entrenador", nombre: "Coord. Técnica",
    cargo: "Entrenador Parkour", club: "Ville Blanche", disciplina: "PKR",
    tipo_sangre: "A+", contacto_emg: "+57 300 987 6543",
    stats: { asistencia: 78, programacion: 82, progreso: 75 } },
  { id: "U003", pin: "3333", role: "atleta", nombre: "ALT-001",
    categoria: "Junior (14-17)", nivel: 3, club: "Ville Blanche", disciplina: "PKR",
    estado_pago: "activo", nro_registro: "000003",
    tipo_sangre: "O+", contacto_emg: "+57 311 222 3344",
    stats: { asistencia: 88, progreso: 76, cumplimiento: 80 },
    eventos: ["E001", "E002"] },
  { id: "U004", pin: "4444", role: "atleta", nombre: "GIM-002",
    categoria: "Juvenil", nivel: 2, club: "Onca", disciplina: "GIM",
    estado_pago: "pendiente", nro_registro: "000004",
    tipo_sangre: "B+", contacto_emg: "+57 310 555 6677",
    stats: { asistencia: 65, progreso: 60, cumplimiento: 58 },
    eventos: ["E001"] },
  { id: "U005", pin: "5555", role: "atleta", nombre: "PKR-003",
    categoria: "AC4 (12-13)", nivel: 1, club: "Phantom", disciplina: "PKR",
    estado_pago: "mora", nro_registro: "000005",
    tipo_sangre: "A-", contacto_emg: "+57 315 888 9900",
    stats: { asistencia: 40, progreso: 42, cumplimiento: 35 },
    eventos: [] },
];

export const ATHLETES = USERS.filter(u => u.role === "atleta");

export const EVENTOS = [
  { id: "E001", nombre: "Copa Caucana de Parkour 2026", fecha: "2026-06-15",
    lugar: "Coliseo El Tunal, Popayán", dias_faltantes: 57, disciplinas: ["PKR"],
    descripcion: "Primer evento clasificatorio del año para el circuito departamental.",
    imagen: "", url_inscripcion: "https://www.gimnasiacauca.com/eventos/E001" },
  { id: "E002", nombre: "Festival Urbano LCG — Cauca", fecha: "2026-08-20",
    lugar: "Plaza Central, Popayán", dias_faltantes: 123, disciplinas: ["PKR", "BRK", "CAL"],
    descripcion: "Festival multidisciplinar de deportes urbanos del Cauca.",
    imagen: "", url_inscripcion: "https://www.gimnasiacauca.com/eventos/E002" },
];

export const CLUBES = [
  { id: "C01", nombre: "Ville Blanche", redes: "@villeblanche",
    contacto: "+57 312 806 8821", color: "#A8C200", logo: "", carnet_bg: "#A8C200" },
  { id: "C02", nombre: "Onca", redes: "@onca_metnat",
    contacto: "+57 312 806 8821", color: "#E2C000", logo: "", carnet_bg: "#E2C000" },
  { id: "C03", nombre: "Phantom", redes: "@clubphantompk",
    contacto: "+57 312 806 8821", color: "#1565C0", logo: "", carnet_bg: "#1565C0" },
  { id: "C04", nombre: "Mundo Paralelo", redes: "@mundoparalelosw",
    contacto: "+57 312 806 8821", color: "#6A1B9A", logo: "", carnet_bg: "#6A1B9A" },
];

export const PATROCINADORES = [
  { nombre: "DUNT Popayán",       color: "#A8C200", imagen: "", url: "https://www.instagram.com/dunt_popayan/" },
  { nombre: "Elemental Cosmética",color: "#E91E8C", imagen: "", url: "https://www.instagram.com/elemental.cosmetica/" },
  { nombre: "Edificar SAS",       color: "#1565C0", imagen: "", url: "https://www.instagram.com/edificar_sas/" },
  { nombre: "Parkour Popayán",    color: "#2E7D32", imagen: "", url: "https://www.instagram.com/parkour.popayan/" },
];

export const CLASES = [
  { disciplina: "Parkour",   nivel: "Principiante", horario: "Lun · Mié · Vie", dias: [1,3,5], hora: "7:00am – 9:00am",   lugar: "Parque La Pola",  instructor: "Coord. Técnica LCG", contacto: "+57 312 806 8821", cupos: 15, color: "#A8C200" },
  { disciplina: "Parkour",   nivel: "Intermedio",   horario: "Mar · Jue · Sáb", dias: [2,4,6], hora: "4:00pm – 6:00pm",   lugar: "Coliseo Menor",   instructor: "Coord. Técnica LCG", contacto: "+57 312 806 8821", cupos: 12, color: "#E2C000" },
  { disciplina: "Parkour",   nivel: "Avanzado",     horario: "Sábados",         dias: [6],     hora: "9:00am – 12:00m",   lugar: "Escenario DUNT",  instructor: "Felipe Montenegro",  contacto: "+57 312 806 8821", cupos:  8, color: "#2E7D32" },
  { disciplina: "Gimnasia",  nivel: "Principiante", horario: "Lun · Mié · Vie", dias: [1,3,5], hora: "2:00pm – 4:00pm",   lugar: "Coliseo Menor",   instructor: "Coord. Técnica LCG", contacto: "+57 312 806 8821", cupos: 20, color: "#A8C200" },
  { disciplina: "Calistenia",nivel: "Adulto",       horario: "Lun · Mié · Vie", dias: [1,3,5], hora: "6:00am – 7:30am",   lugar: "Parque La Pola",  instructor: "Coord. Técnica LCG", contacto: "+57 312 806 8821", cupos: 20, color: "#1565C0" },
];

export const EJERCICIOS = {
  Recepciones: [
    { cod: "RB-1", nombre: "RECEPCIÓN BÁSICA",
      reps_suave: "6 rep", reps_media: "10 rep", reps_fuerte: "15 rep",
      series: "5 series", reposo: "30 seg", musculo: "Cuádriceps · Gemelos", nivel: "Inicial",
      pasos: ["De pie en borde o plataforma baja.", "Salta — talones elevados, antepié toca primero.", "Rodillas semiflexionadas absorben el impacto.", "Mantén posición 2 segundos."],
      tips: "Altura máx = 1 vez tu talla. Nunca dejes caer los talones de golpe.",
      img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=70", video: "" },
    { cod: "RE-3", nombre: "RODADA (ROLL)",
      reps_suave: "8 rep c/lado", reps_media: "15 rep c/lado", reps_fuerte: "20 rep c/lado",
      series: "2 series", reposo: "45 seg", musculo: "Omóplato · Core", nivel: "Intermedio",
      pasos: ["Inclínate — mano delantera toca el suelo.", "La cabeza NUNCA toca el suelo.", "Rueda sobre omóplato en diagonal.", "La velocidad te pone de pie."],
      tips: "Practicar primero en colchoneta. El roll es diagonal, no hacia atrás.",
      img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=70", video: "" },
  ],
  Movimientos: [
    { cod: "MoB-1", nombre: "MONKEY VAULT",
      reps_suave: "10 rep", reps_media: "18 rep", reps_fuerte: "25 rep",
      series: "5 series", reposo: "60 seg", musculo: "Tríceps · Hombros · Core", nivel: "Inicial",
      pasos: ["Corre hacia el obstáculo.", "Apoya AMBAS manos en el borde.", "Eleva la cadera por encima de las manos.", "Pies pasan entre los brazos.", "Suelta y recepciona limpio."],
      tips: "Mira el destino, no las manos.",
      img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&q=70", video: "" },
    { cod: "MuB-1", nombre: "CAT LEAP",
      reps_suave: "6 rep", reps_media: "10 rep", reps_fuerte: "15 rep",
      series: "3 series", reposo: "90 seg", musculo: "Bíceps · Hombros · Cuádriceps", nivel: "Intermedio",
      pasos: ["Corre hacia la pared.", "Salta — manos fijan el borde superior.", "Pies contra la pared para frenar.", "Flexiona brazos y piernas al contacto."],
      tips: "El agarre de manos es crítico. Entrena fuerza de dedos.",
      img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400&q=70", video: "" },
  ],
  Equilibrio: [
    { cod: "EB-1", nombre: "CAMINATA EN LÍNEA",
      reps_suave: "3 min", reps_media: "5 min", reps_fuerte: "8 min",
      series: "3 series", reposo: "60 seg", musculo: "Tobillos · Core", nivel: "Inicial",
      pasos: ["Punta del pie primero, luego talón.", "Mirada 50cm adelante — no mires los pies.", "Brazos extendidos para estabilizar.", "Progresión: línea → listón → muro bajo."],
      tips: "La mirada es el control. Fíjala en un punto fijo.",
      img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&q=70", video: "" },
  ],
};

export const CAL_ITEMS = [
  "CG-1 — Trotar continuo · 2-3 min",
  "CG-2 — Talones a glúteos · 45 seg",
  "CG-3 — Rodillas al pecho · 45 seg",
  "CG-4 — Desplazamiento lateral · 90 seg c/lado",
  "CE-1 — Pasar obstáculos · 3×2 min",
];

export const EST_ITEMS = [
  "Eg-1 — Mariposa glúteos · 30s×2",
  "Ei-1 — Isquiotibiales de pie · 30s c/lado",
  "Ec-1 — Cuádriceps de pie · 30s c/lado",
  "RESP — Respiración diafragmática · 3 min",
];

export const PERF = [
  { sem: "S1", salto: 42, tecnica: 65, flex: 48, fuerza: 55, resist: 60 },
  { sem: "S2", salto: 45, tecnica: 68, flex: 52, fuerza: 58, resist: 62 },
  { sem: "S3", salto: 44, tecnica: 72, flex: 55, fuerza: 62, resist: 65 },
  { sem: "S4", salto: 48, tecnica: 75, flex: 58, fuerza: 66, resist: 68 },
  { sem: "S5", salto: 52, tecnica: 78, flex: 62, fuerza: 70, resist: 72 },
  { sem: "S6", salto: 55, tecnica: 80, flex: 65, fuerza: 74, resist: 75 },
];

export const ASISTENCIA = {
  U003: { "2026-04": [
    { d: "2026-04-01", int: "Media"  }, { d: "2026-04-02", int: "Fuerte" },
    { d: "2026-04-07", int: "Suave"  }, { d: "2026-04-08", int: "Media"  },
    { d: "2026-04-09", int: "Fuerte" }, { d: "2026-04-14", int: "Media"  },
    { d: "2026-04-15", int: "Suave"  }, { d: "2026-04-16", int: "Fuerte" },
    { d: "2026-04-21", int: "Media"  }, { d: "2026-04-22", int: "Propio" },
    { d: "2026-04-23", int: "Propio" },
  ]},
  U004: { "2026-04": [
    { d: "2026-04-02", int: "Suave" }, { d: "2026-04-09", int: "Media" }, { d: "2026-04-16", int: "Media" },
  ]},
  U005: { "2026-04": [
    { d: "2026-04-01", int: "Suave" }, { d: "2026-04-08", int: "Propio" },
  ]},
};

export const WA_URL  = "https://wa.me/573128068821?text=Hola%2C+te+contacto+desde+la+App.";
export const IG_URL  = "https://www.instagram.com/parkour.popayan/";
export const WEB_URL = "https://www.gimnasiacauca.com";

export const getReps = (ej, intensidad) => {
  const k = intensidad === "Suave" ? "reps_suave"
    : intensidad === "Fuerte" || intensidad === "Máxima" ? "reps_fuerte"
    : "reps_media";
  return ej[k] || ej.reps_media || "—";
};

export const todayISO = () => new Date().toISOString().split("T")[0];
export const timeNow  = () => new Date().toTimeString().slice(0, 5);

export const getRecomendacion = (atleta) => {
  const s = atleta.stats || {};
  const prog = s.progreso || 0, asist = s.asistencia || 0;
  if (prog >= 80 && asist >= 80) return { tipo: "felicitacion", txt: "¡Excelente progreso! Constancia y mejora sostenida. Se recomienda mantener el plan actual." };
  if (prog >= 60 && asist >= 60) return { tipo: "positiva",     txt: "Buen avance. Reforzar estiramiento y técnica para alcanzar el siguiente nivel." };
  if (asist < 50)                return { tipo: "atencion",     txt: "La asistencia es baja y afecta el progreso. Aumentar frecuencia de entrenamientos." };
  return                               { tipo: "neutral",      txt: "Avance general pero existen áreas por fortalecer. Enfocarse en los puntos bajos." };
};
