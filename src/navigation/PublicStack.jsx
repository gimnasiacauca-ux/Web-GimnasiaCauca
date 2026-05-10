import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import InicioScreen from "../screens/public/InicioScreen";
import EntrenamientoInvitadoScreen from "../screens/public/EntrenamientoInvitadoScreen";
import ClasesScreen from "../screens/public/ClasesScreen";
import EventosScreen from "../screens/public/EventosScreen";
import RedLigaScreen from "../screens/public/RedLigaScreen";

const Tab = createBottomTabNavigator();

const TABS = [
  { name: "Inicio",    icon: "🏠", component: InicioScreen },
  { name: "Ejercicios",icon: "🤸", component: EntrenamientoInvitadoScreen },
  { name: "Clases",    icon: "📅", component: ClasesScreen },
  { name: "Eventos",   icon: "🏆", component: EventosScreen },
  { name: "Red Liga",  icon: "🌐", component: RedLigaScreen },
];

export default function PublicStack({ T }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: T.card, borderTopColor: T.border, height: 60 },
        tabBarActiveTintColor: T.secondary,
        tabBarInactiveTintColor: T.textMut,
        tabBarLabelStyle: { fontSize: 9, fontWeight: "600" },
        tabBarIcon: ({ focused }) => {
          const tab = TABS.find(t => t.name === route.name);
          return <Text style={{ fontSize: focused ? 20 : 17 }}>{tab?.icon}</Text>;
        },
      })}>
      {TABS.map(tab => (
        <Tab.Screen key={tab.name} name={tab.name}>
          {props => <tab.component {...props} T={T} />}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
}
