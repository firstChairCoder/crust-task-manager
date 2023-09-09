import type { FC } from "react";
import type { PressableProps } from "react-native";
import { Pressable, StyleSheet, Text } from "react-native";

import { theme } from "../style/theme";

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 24,
    height: 50,
    justifyContent: "center",
    width: 240
  }
});

interface ButtonProps {
  label: string;
  onPress: () => void;
  style?: PressableProps["style"];
  color?: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  label,
  onPress,
  style,
  color = theme.colors.body,
  disabled = false
}) => {
  return (
    <Pressable
      style={[
        styles.btnContainer,
        style,
        {
          backgroundColor: disabled
            ? theme.colors.disabled
            : theme.colors.primary
        }
      ]}
      {...{ onPress }}
      disabled={disabled}
    >
      <Text style={{ ...theme.textVariants.body, color }}>{label}</Text>
    </Pressable>
  );
};

export default Button;
