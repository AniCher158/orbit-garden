import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { colors } from "@/src/theme";

const orbitTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.ink,
    card: colors.surface,
    text: colors.cream,
    border: colors.border,
    primary: colors.mint,
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={orbitTheme}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.ink },
          headerTintColor: colors.cream,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.ink },
          headerBackTitle: "Back",
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="onboarding"
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="add-course"
          options={{ title: "Add a course", presentation: "modal" }}
        />
        <Stack.Screen
          name="add-assignment"
          options={{ title: "Add schoolwork", presentation: "modal" }}
        />
        <Stack.Screen
          name="study/setup"
          options={{ title: "Plan a study session" }}
        />
        <Stack.Screen
          name="study/timer"
          options={{ title: "", headerTransparent: true }}
        />
        <Stack.Screen
          name="study/complete"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen name="course/[id]" options={{ title: "Course hub" }} />
        <Stack.Screen
          name="resources"
          options={{ title: "Resource library" }}
        />
        <Stack.Screen name="methods" options={{ title: "Study methods" }} />
        <Stack.Screen name="review" options={{ title: "Review queue" }} />
        <Stack.Screen name="journal" options={{ title: "Study journal" }} />
        <Stack.Screen name="settings" options={{ title: "Settings" }} />
        <Stack.Screen
          name="demo"
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen
          name="place-reward"
          options={{ title: "Place your reward", presentation: "modal" }}
        />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
