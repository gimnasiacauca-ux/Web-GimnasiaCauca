import AsyncStorage from "@react-native-async-storage/async-storage";
import { USERS } from "../constants/data";

const KEY = "lcg_session";

export async function login(userId) {
  const user = USERS.find(u => u.id === userId);
  if (!user) throw new Error("Usuario no encontrado");
  await AsyncStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

export async function logout() {
  await AsyncStorage.removeItem(KEY);
}

export async function getSession() {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function saveProfile(userId, { displayName, fotoUri }) {
  if (displayName) await AsyncStorage.setItem(`lcg_dn_${userId}`, displayName);
  if (fotoUri)     await AsyncStorage.setItem(`lcg_foto_${userId}`, fotoUri);
}

export async function getProfile(userId) {
  const displayName = await AsyncStorage.getItem(`lcg_dn_${userId}`);
  const fotoUri     = await AsyncStorage.getItem(`lcg_foto_${userId}`);
  return { displayName, fotoUri };
}

export async function saveRegistro(form) {
  const existing = await AsyncStorage.getItem("lcg_registros");
  const lista = existing ? JSON.parse(existing) : [];
  lista.push({ ...form, id: `REG${Date.now()}`, fecha: new Date().toISOString() });
  await AsyncStorage.setItem("lcg_registros", JSON.stringify(lista));
}
