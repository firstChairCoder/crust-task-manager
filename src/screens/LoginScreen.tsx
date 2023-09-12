import type { TextInput } from "react-native";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets
} from "react-native-safe-area-context";
import { useRef } from "react";
import { useAtom } from "jotai";
import { useFormik } from "formik";
import * as Yup from "yup";

import { theme } from "../style/theme";
import { Button, Input } from "../components";
import { isAuthenticatedAtom } from "../store/states";
import { useKeyboard } from "../hooks/useKeyboard";

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
  },
  subHeading: {
    marginBottom: theme.spacing.l,
    textAlign: "center",
    ...theme.textVariants.header
  },
  btn: { alignItems: "center", marginTop: theme.spacing.m * 2 }
});

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
});

export const LoginScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const { keyboardShown } = useKeyboard();
  const passwordInputRef = useRef<TextInput>(null);
  const [_, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  const { handleChange, handleBlur, handleSubmit, errors, touched } = useFormik(
    {
      validationSchema: LoginSchema,
      initialValues: { email: "", password: "", remember: false },
      onSubmit: () => {
        setIsAuthenticated(async (val: boolean) => !(await val));
      }
    }
  );

  return (
    <SafeAreaView
      style={[styles.container, { paddingBottom: bottom + theme.spacing.m }]}
    >
      <ScrollView
        contentContainerStyle={{
          height: height,
          paddingBottom: bottom + theme.spacing.s
        }}
        scrollEnabled={keyboardShown}
        automaticallyAdjustContentInsets={true}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {!keyboardShown ? <View style={{ flex: 0.8 }} /> : null}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={styles.heroText}>Task{"\n"}Manager</Text>
          <Text style={styles.subHeading}>
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

          <View style={styles.btn}>
            <Button
              label="Log In"
              onPress={handleSubmit}
              disabled={!!errors.email || !!errors.password}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};
