import React, { useState, useEffect, useCallback } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Ubuntu_400Regular,
  Ubuntu_500Medium,
  Ubuntu_700Bold,
} from "@expo-google-fonts/ubuntu";
import {
  Oswald_700Bold,
} from "@expo-google-fonts/oswald";
import AuthStack from "./src/navigation/AuthStack";
import AppNavigator from "./src/navigation/AppNavigator";
import StartupModal from "./src/components/StartupModal";
import { getSession, logout } from "./src/services/auth";
import { LIGHT, DARK } from "./src/constants/theme";
import useTheme from "./src/hooks/useTheme";

export default function App() {
  const { T } = useTheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showStartup, setShowStartup] = useState(true);

  const [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
    Oswald_700Bold,
  });

  useEffect(() => {
    getSession().then(u => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const handleLogin = useCallback((u) => {
    setUser(u);
  }, []);

  const handleLogout = useCallback(async () => {
    await logout();
    setUser(null);
    setShowStartup(true);
  }, []);

  const handleUpdateUser = useCallback((updated) => {
    setUser(updated);
  }, []);

  if (!fontsLoaded || loading) {
    return (
      <View style={[s.loading, { backgroundColor: T.primary }]}>
        <ActivityIndicator size="large" color="#FF5F03" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={s.flex}>
      <SafeAreaProvider>
        <NavigationContainer>
          {!user
            ? <AuthStack onLogin={handleLogin} />
            : <AppNavigator user={user} T={T} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />
          }
        </NavigationContainer>

        <StartupModal
          visible={showStartup && !user}
          onClose={() => setShowStartup(false)}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const s = StyleSheet.create({
  flex:    { flex: 1 },
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },
});
