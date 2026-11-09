import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider
      value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <AnimatedSplashOverlay />

      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "Catatan Kuliah" }}
        />

        <Stack.Screen
          name="detail"
          options={{ title: "Detail Catatan" }}
        />

        <Stack.Screen
          name="explore"
          options={{ title: "Panduan Edu Notes" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
