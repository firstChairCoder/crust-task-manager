/* eslint-disable no-nested-ternary */
import { forwardRef } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import type { TextInputProps, ViewStyle } from "react-native";
import { TextInput, View } from "react-native";

import { theme } from "../style/theme";
import CustomIcon from "./CustomIcon";

interface InputProps extends TextInputProps {
  pressed?: boolean;
  icon: string;
  error?: string;
  inputStyle?: ViewStyle;
}

const Input = forwardRef<TextInput, InputProps>(
  ({ pressed, icon, error, inputStyle, ...props }, ref) => {
    const color = !pressed ? "body" : error ? "danger" : "primary";
    const themeColor = theme.colors[color];
    return (
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            padding: theme.spacing.s,
            borderRadius: 8,
            height: 56,
            borderWidth: 1,
            borderColor: themeColor
          },
          inputStyle
        ]}
      >
        <View style={{ padding: theme.spacing.s }}>
          <Icon name={icon} size={16} color={themeColor} />
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholderTextColor={theme.colors.lightGrey}
            underlineColorAndroid={"transparent"}
            style={{ ...theme.textVariants.body, color: theme.colors.body }}
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
