import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import CampoScreen from "../screens/coach/CampoScreen";
import AnalyticsScreen from "../screens/coach/AnalyticsScreen";
import InformeScreen from "../screens/coach/InformeScreen";
import EntrenamientoInvitadoScreen from "../screens/public/EntrenamientoInvitadoScreen";
import RedLigaScreen from "../screens/public/RedLigaScreen";

const Tab = createBottomTabNavigator();

const TABS = [
  { name: "Campo",     icon: "📍", component: CampoScreen },
  { name: "Análisis",  icon: "📊", component: AnalyticsScreen },
  { name: "Informes",  icon: "📄", component: InformeScreen },
  { name: "Entrena.",  icon: "🤸", component: EntrenamientoInvitadoScreen },
  { name: "Red Liga",  icon: "🌐", component: RedLigaScreen },
];

export default function CoachStack({ T, user }) {
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
