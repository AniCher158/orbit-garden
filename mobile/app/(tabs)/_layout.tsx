import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { colors } from "@/src/theme";

const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
  home: "home-outline",
  plan: "calendar-outline",
  study: "timer-outline",
  courses: "library-outline",
  garden: "planet-outline",
};
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.mint,
        tabBarInactiveTintColor: colors.faint,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
        tabBarIcon: ({ color, focused }) => (
          <Ionicons
            name={
              focused
                ? (icons[route.name].replace(
                    "-outline",
                    "",
                  ) as keyof typeof Ionicons.glyphMap)
                : icons[route.name]
            }
            color={color}
            size={22}
          />
        ),
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="plan" options={{ title: "Plan" }} />
      <Tabs.Screen name="study" options={{ title: "Study" }} />
      <Tabs.Screen name="courses" options={{ title: "Courses" }} />
      <Tabs.Screen name="garden" options={{ title: "Garden" }} />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    height: 78,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: "rgba(12,16,36,0.98)",
    borderTopColor: colors.border,
  },
  label: { fontSize: 11, fontWeight: "700" },
});
