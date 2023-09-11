import { ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import {
  FrederickatheGreat_400Regular,
  useFonts
} from "@expo-google-fonts/fredericka-the-great";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { Suspense, useEffect } from "react";
import {
  Poppins_400Regular,
  Poppins_600SemiBold
} from "@expo-google-fonts/poppins";
import { ShareTech_400Regular } from "@expo-google-fonts/share-tech";

import RootStack from "./src/navigation";
import JotaiProvider from "./src/store/provider";

export default function App() {
  const [fontsLoaded] = useFonts({
    Fredericka: FrederickatheGreat_400Regular,
    Poppins: Poppins_400Regular,
    PoppinsBold: Poppins_600SemiBold,
    ShareTech: ShareTech_400Regular
  });

  useEffect(() => {
    // when loading is complete
    if (fontsLoaded) {
      // hide splash function
      const hideSplash = async () => SplashScreen.hideAsync();
      // hide splash screen to show app
      hideSplash();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Suspense fallback={<ActivityIndicator size={"large"} />}>
      <JotaiProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
          <StatusBar animated style={"inverted"} />
        </SafeAreaProvider>
      </JotaiProvider>
    </Suspense>
  );
}
