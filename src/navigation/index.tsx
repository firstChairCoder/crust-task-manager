import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAtom } from "jotai";

import { isAuthenticatedAtom } from "../store/states";
import { HomeScreen, LoginScreen } from "../screens";
import type { AppRoutes } from "./types";
import { theme } from "../style/theme";

const { Navigator, Group, Screen } = createNativeStackNavigator<AppRoutes>();

export default function RootStack() {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

  console.log("auth ", isAuthenticated);

  if (!isAuthenticated) {
    return (
      <Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
        <Group>
          <Screen name="Login" component={LoginScreen} />
        </Group>
      </Navigator>
    );
  } else {
    return (
      <Navigator screenOptions={{ gestureEnabled: false }}>
        <Group>
          <Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Tasks",
              headerTintColor: theme.colors.body,
              headerStyle: {
                backgroundColor: theme.colors.background
              }
            }}
          />
        </Group>
      </Navigator>
    );
  }
}
