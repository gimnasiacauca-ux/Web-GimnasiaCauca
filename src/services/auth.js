import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "lcg_session";

export async function login(user) {
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

export async function saveProfile(userId, { displayNombre, foto }) {
  const existing = await getProfile(userId) || {};
  const updated = { ...existing };
  if (displayNombre !== undefined) updated.displayNombre = displayNombre;
  if (foto !== undefined)          updated.foto = foto;
  await AsyncStorage.setItem(`lcg_profile_${userId}`, JSON.stringify(updated));
}

export async function getProfile(userId) {
  const raw = await AsyncStorage.getItem(`lcg_profile_${userId}`);
  return raw ? JSON.parse(raw) : null;
}

export async function saveRegistro(form) {
  const existing = await AsyncStorage.getItem("lcg_registros");
  const lista = existing ? JSON.parse(existing) : [];
  lista.push({ ...form, id: `REG${Date.now()}`, fecha: new Date().toISOString() });
  await AsyncStorage.setItem("lcg_registros", JSON.stringify(lista));
}
