/* eslint-disable no-nested-ternary */
import { forwardRef } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import type { TextInputProps } from "react-native";
import { TextInput, View } from "react-native";

import { theme } from "../style/theme";
import CustomIcon from "./CustomIcon";

interface InputProps extends TextInputProps {
  pressed?: boolean;
  icon: string;
  error?: string;
}

const Input = forwardRef<TextInput, InputProps>(
  ({ pressed, icon, error, ...props }, ref) => {
    const color = !pressed ? "body" : error ? "danger" : "primary";
    const themeColor = theme.colors[color];
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: theme.spacing.s,
          borderRadius: 8,
          height: 48,
          borderWidth: 1,
          borderColor: themeColor
        }}
      >
        <View style={{ padding: theme.spacing.s }}>
          <Icon name={icon} size={16} color={themeColor} />
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholderTextColor={themeColor}
            underlineColorAndroid={"transparent"}
            {...props}
            {...{ ref }}
          />
        </View>
        {pressed && (
          <CustomIcon
            name={!error ? "check" : "x"}
            size={32}
            backgroundColor={!error ? "primary" : "danger"}
            color={theme.colors.white}
          />
        )}
      </View>
    );
  }
);

export default Input;
