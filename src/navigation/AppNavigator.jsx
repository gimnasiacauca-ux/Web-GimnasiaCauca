import React from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import CoachStack from "./CoachStack";
import AthleteStack from "./AthleteStack";
import PublicStack from "./PublicStack";
import MiCuentaScreen from "../screens/auth/MiCuentaScreen";
import Header from "../components/Header";

const Stack = createStackNavigator();

function MainApp({ user, T, onLogout, onMiCuenta, onUpdateUser }) {
  return (
    <View style={s.flex}>
      <Header user={user} onLogout={onLogout} onMiCuenta={onMiCuenta} onMenu={() => {}} T={T} />
      {user.role === "entrenador" && <CoachStack T={T} user={user} />}
      {user.role === "atleta"     && <AthleteStack T={T} user={user} />}
      {user.role === "publico"    && <PublicStack T={T} />}
    </View>
  );
}

export default function AppNavigator({ user, T, onLogout, onUpdateUser }) {
  const [showMiCuenta, setShowMiCuenta] = React.useState(false);

  if (showMiCuenta) {
    return (
      <MiCuentaScreen
        user={user}
        T={T}
        navigation={{ goBack: () => setShowMiCuenta(false) }}
        onSave={(updated) => { onUpdateUser?.(updated); setShowMiCuenta(false); }}
      />
    );
  }

  return (
    <MainApp
      user={user}
      T={T}
      onLogout={onLogout}
      onMiCuenta={() => setShowMiCuenta(true)}
      onUpdateUser={onUpdateUser}
    />
  );
}

const s = StyleSheet.create({
  flex: { flex: 1 },
});
