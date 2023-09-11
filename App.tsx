import { ActivityIndicator, StyleSheet } from "react-native";
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
  // const { width } = useWindowDimensions();
  // const colorScheme = useColorScheme();
  // const passwordInputRef = useRef<TextInput>(null);
  // const [todos] = useAtom(todosAtom);
  // const [visible, setVisible] = useState(false);

  // const ref = useRef(View.prototype);
  // const value = useRef(new Animated.Value(0)).current;

  // const [textWidth, setTextWidth] = useState(0);
  // const [textHeight, setTextHeight] = useState(0);

  // const animateStroke = () => {
  //   Animated.timing(value, {
  //     toValue: 1,
  //     duration: 2000,
  //     easing: Easing.linear,
  //     useNativeDriver: false
  //   }).start();
  // };

  // useEffect(() => {
  //   ref.current?.measure((x, y, w, h) => {
  //     setTextWidth(w);
  //     setTextHeight(h);
  //     animateStroke();
  //   });
  // }, []);

  // const strokeWidth = value.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, textWidth],
  //   extrapolate: "clamp"
  // });

  // const hideModal = useCallback(() => setVisible(false), []);
  // const showModal = useCallback(() => setVisible(true), []);

  // const showDivider = useCallback(
  //   () => (
  //     <View
  //       style={{
  //         height: StyleSheet.hairlineWidth,
  //         width,
  //         marginVertical: theme.spacing.s,
  //         backgroundColor: theme.colors.grey
  //       }}
  //     />
  //   ),
  //   []
  // );

  // console.log(visible);

  // console.log(textHeight, textWidth);

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

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20
  }
});

/**
 *
 */
