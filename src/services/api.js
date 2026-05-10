// Mock API — returns data from constants.
// Replace each function with a real fetch() call when backend is ready.
import { USERS, ATHLETES, EVENTOS, CLUBES, CLASES, PERF, ASISTENCIA } from "../constants/data";

export const apiGetAthletes   = async () => ATHLETES;
export const apiGetEventos    = async () => EVENTOS;
export const apiGetClubes     = async () => CLUBES;
export const apiGetClases     = async () => CLASES;
export const apiGetPerf       = async (userId) => PERF;
export const apiGetAsistencia = async (userId, mes) =>
  (ASISTENCIA[userId] && ASISTENCIA[userId][mes]) || [];

export const apiSaveSession = async (atletaId, sesionData) => {
  console.log("Sesión guardada (mock):", atletaId, sesionData);
  return true;
};

export const apiSaveRegistro = async (form) => {
  console.log("Registro guardado (mock):", form);
  return { ok: true, id: `REG${Date.now()}` };
};
