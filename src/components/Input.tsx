/* eslint-disable no-nested-ternary */
import { forwardRef } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import type { StyleProp, TextInputProps, ViewStyle } from "react-native";
import { StyleSheet, TextInput, View } from "react-native";

import { theme } from "../style/theme";
import CustomIcon from "./CustomIcon";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    height: 56,
    padding: theme.spacing.s
  },
  iconWrapper: {
    padding: theme.spacing.s
  },
  input: {
    ...theme.textVariants.body,
    color: theme.colors.body,
    fontFamily: "ShareTech"
  }
});

interface InputProps extends TextInputProps {
  pressed?: boolean;
  icon: keyof typeof Icon.glyphMap;
  error?: string;
  inputStyle?: StyleProp<ViewStyle>;
}

const Input = forwardRef<TextInput, InputProps>(
  ({ pressed, icon, error, inputStyle, ...props }, ref) => {
    const color = !pressed ? "body" : error ? "danger" : "primary";
    const themeColor = theme.colors[color];
    return (
      <View
        style={[
          styles.container,
          {
            borderColor: themeColor
          },
          inputStyle
        ]}
      >
        <View style={styles.iconWrapper}>
          <Icon name={icon} size={16} color={themeColor} />
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholderTextColor={theme.colors.lightGrey}
            underlineColorAndroid={"transparent"}
            style={styles.input}
            {...props}
            {...{ ref }}
          />
        </View>
        {pressed && (
          <CustomIcon
            name={!error ? "check" : "x"}
            size={32}
            backgroundColor={theme.colors.body}
            color={!error ? theme.colors.primary : theme.colors.danger}
          />
        )}
      </View>
    );
  }
);

export default Input;
