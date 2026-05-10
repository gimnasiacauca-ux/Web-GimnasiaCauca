import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LIGHT, DARK } from "../constants/theme";

export function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("lcg_dark").then(v => { if (v === "1") setDark(true); });
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    AsyncStorage.setItem("lcg_dark", next ? "1" : "0");
  };

  return { T: dark ? DARK : LIGHT, dark, toggleDark: toggle };
}
