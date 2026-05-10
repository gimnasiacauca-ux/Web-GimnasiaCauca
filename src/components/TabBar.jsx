import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

export default function TabBar({ tabs, active, onTab, T }) {
  return (
    <View style={[s.wrap, { backgroundColor: T.card, borderBottomColor: T.border }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tabs.map(tab => {
          const isActive = active === tab.id;
          return (
            <TouchableOpacity key={tab.id} onPress={() => onTab(tab.id)}
              style={[s.tab, isActive && { borderBottomColor: T.secondary, borderBottomWidth: 2 }]}
              activeOpacity={0.7}>
              <Text style={s.icon}>{tab.icon}</Text>
              <Text style={[s.label, { color: isActive ? T.primary : T.textMut }]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  wrap:  { borderBottomWidth: 1 },
  tab:   { paddingHorizontal: 12, paddingVertical: 10, alignItems: "center", minWidth: 60, borderBottomWidth: 2, borderBottomColor: "transparent" },
  icon:  { fontSize: 16, marginBottom: 3 },
  label: { fontSize: 9, fontWeight: "600" },
});
