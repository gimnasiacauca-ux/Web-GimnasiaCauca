export const FONTS = { regular: "Ubuntu_400Regular", medium: "Ubuntu_500Medium", bold: "Ubuntu_700Bold" };
export const FONT_DISPLAY = "Oswald_700Bold";
export const FONT_MONO = "Ubuntu_400Regular";

export const LIGHT = {
  bg: "#EDEADE", card: "#FFFFFF", panel: "#F7F5EC",
  border: "#D8D4C3",
  text: "#111827", textSec: "#374151", textMut: "#6B7280",
  primary: "#072C2C", primaryLt: "#E6EEEE",
  secondary: "#FF5F03", secondaryLt: "#FFE9DC",
  green: "#2E7D32", greenLt: "#E8F5E9",
  yellow: "#F5C400", yellowLt: "#FFFDE7",
  lime: "#A8C200",
  blue: "#1565C0", blueLt: "#E3F2FD",
  success: "#16A34A", successLt: "#DCFCE7",
  warn: "#D97706", warnLt: "#FEF3C7",
  danger: "#DC2626", dangerLt: "#FEE2E2",
  shadow: "rgba(7,44,44,0.08)",
};

export const DARK = {
  bg: "#0A1414", card: "#0F1F1F", panel: "#0C1818",
  border: "#1F3333",
  text: "#F3F4F6", textSec: "#D1D5DB", textMut: "#9CA3AF",
  primary: "#1A5050", primaryLt: "#0F2525",
  secondary: "#FF7A33", secondaryLt: "#2A1A10",
  green: "#43A047", greenLt: "#0F2A12",
  yellow: "#F5C400", yellowLt: "#2A2200",
  lime: "#A8C200",
  blue: "#1976D2", blueLt: "#0D2040",
  success: "#22C55E", successLt: "#0F2A1A",
  warn: "#F59E0B", warnLt: "#2A1F0A",
  danger: "#EF4444", dangerLt: "#2A1414",
  shadow: "rgba(0,0,0,0.4)",
};

export const INTENSIDAD_COLOR = {
  Suave:  { bg: "#16A34A", lbl: "Suave" },
  Media:  { bg: "#F5C400", lbl: "Media" },
  Fuerte: { bg: "#DC2626", lbl: "Fuerte" },
  Propio: { bg: "#1565C0", lbl: "Propio" },
};

export const DISC_COLORS = {
  PKR: { label: "Parkour",    bg: "#2E7D32", text: "#fff" },
  POR: { label: "Porrismo",   bg: "#1565C0", text: "#fff" },
  BRK: { label: "BrakeDance", bg: "#7B1FA2", text: "#fff" },
  CAL: { label: "Calistenia", bg: "#FF5F03", text: "#fff" },
  GIM: { label: "Gimnasia",   bg: "#F5C400", text: "#111" },
};

export const NIVEL_COLOR = { Inicial: "#16A34A", Intermedio: "#D97706", Avanzado: "#DC2626" };

export const pagoLabel = { activo: "AL DÍA", pendiente: "PENDIENTE", mora: "MORA" };
export const pagoColor = (ep, T) => ep === "activo" ? T.success : ep === "pendiente" ? T.warn : T.danger;
