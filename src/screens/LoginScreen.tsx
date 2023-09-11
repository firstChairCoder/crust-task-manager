import type { TextInput } from "react-native";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef } from "react";
import { useAtom } from "jotai";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFormik } from "formik";
import * as Yup from "yup";

import { theme } from "../style/theme";
import { Button, Input } from "../components";
import { isAuthenticatedAtom } from "../store/states";
import type { AppRoutes } from "../navigation/types";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: theme.colors.background,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.l
  },
  heroText: {
    ...theme.textVariants.hero,
    paddingBottom: theme.spacing.xl,
    textTransform: "uppercase"
  }
});

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
});

export const LoginScreen = ({
  navigation
}: NativeStackNavigationProp<AppRoutes, "Login">) => {
  const passwordInputRef = useRef<TextInput>(null);
  const [_, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  const { handleChange, handleBlur, handleSubmit, errors, touched } = useFormik(
    {
      validationSchema: LoginSchema,
      initialValues: { email: "", password: "", remember: false },
      onSubmit: () => {
        // setIsAuthenticated(true);
        setIsAuthenticated(async (val: boolean) => !(await val));
        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{ name: "Home" }]
        //   })
        // );
      }
    }
  );

  console.log(!!errors.email, " here ");

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={60}
      >
        <Text style={styles.heroText}>Task Manager</Text>
        <Text
          style={{
            textAlign: "center",
            marginBottom: theme.spacing.l,
            ...theme.textVariants.header
          }}
        >
          Please enter your credentials to access your account
        </Text>
        <>
          <Input
            icon="mail"
            placeholder="Enter your mail"
            autoComplete="email"
            returnKeyType="next"
            returnKeyLabel="next"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            error={errors.email}
            pressed={touched.email}
            autoCapitalize="none"
            keyboardType="email-address"
            onSubmitEditing={() => passwordInputRef.current?.focus()}
          />
          <View style={{ marginBottom: theme.spacing.m }} />
          <Input
            ref={passwordInputRef}
            icon="lock"
            placeholder="Enter your password"
            secureTextEntry
            autoComplete="password"
            autoCapitalize="none"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            error={errors.password}
            pressed={touched.password}
            returnKeyType="go"
            returnKeyLabel="go"
            onSubmitEditing={() => handleSubmit()}
          />
        </>

        <View style={{ marginTop: theme.spacing.m * 2, alignItems: "center" }}>
          <Button
            label="Log In"
            onPress={handleSubmit}
            disabled={!!errors.email || !!errors.password}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
