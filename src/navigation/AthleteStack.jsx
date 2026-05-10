import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import DashboardScreen from "../screens/athlete/DashboardScreen";
import CarnetScreen from "../screens/athlete/CarnetScreen";
import EntrenamientoScreen from "../screens/athlete/EntrenamientoScreen";
import InformeScreen from "../screens/athlete/InformeScreen";
import EventosScreen from "../screens/athlete/EventosScreen";
import RedLigaScreen from "../screens/public/RedLigaScreen";

const Tab = createBottomTabNavigator();

const TABS = [
  { name: "Progreso",  icon: "📈", component: DashboardScreen },
  { name: "Carnet",    icon: "🪪", component: CarnetScreen },
  { name: "Entrena.",  icon: "🤸", component: EntrenamientoScreen },
  { name: "Informes",  icon: "📄", component: InformeScreen },
  { name: "Eventos",   icon: "🏆", component: EventosScreen },
  { name: "Red Liga",  icon: "🌐", component: RedLigaScreen },
];

export default function AthleteStack({ T, user }) {
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
          {props => <tab.component {...props} T={T} user={user} />}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
}
