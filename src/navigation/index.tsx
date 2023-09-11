/* eslint-disable react/no-unstable-nested-components */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAtom } from "jotai";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  isAuthenticatedAtom,
  storedTodosAtom,
  todosAtom
} from "../store/states";
import { HomeScreen, LoginScreen } from "../screens";
import type { AppRoutes } from "./types";
import { theme, wp } from "../style/theme";

const { Navigator, Group, Screen } = createNativeStackNavigator<AppRoutes>();

export default function RootStack() {
  const [isAuthenticated, seetIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [, setTodos] = useAtom(todosAtom);
  const [, setStoredTodos] = useAtom(storedTodosAtom);
  const navigation = useNavigation();

  const handleBack = useCallback(() => {
    setStoredTodos([]);
    setTodos([]);
    seetIsAuthenticated(false);
  }, []);

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
              headerLeft: () => (
                <Icon
                  name="chevron-circle-left"
                  color={theme.colors.body}
                  size={wp(7)}
                  style={{ alignSelf: "center", marginBottom: theme.spacing.s }}
                  onPress={handleBack}
                />
              ),
              headerTitleStyle: {
                ...theme.textVariants.title
              },
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
