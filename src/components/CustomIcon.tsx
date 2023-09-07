import type { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center"
  }
});

interface CustomIconProps {
  name: string;
  size: number;
  color: string;
  backgroundColor: string;
  iconRatio?: number;
  align?: "center" | "flex-start" | "flex-end";
}

const CustomIcon: FC<CustomIconProps> = ({
  size,
  iconRatio = 0.75,
  name,
  backgroundColor,
  color,
  align = "center"
}) => {
  const height = size;
  const width = size;
  const iconSize = size * iconRatio;
  return (
    <View
      style={[
        styles.iconContainer,
        {
          backgroundColor,
          height,
          width,
          borderRadius: size / 2,
          alignItems: align
        }
      ]}
    >
      <Text style={{ width: iconSize, height: iconSize, color }}>
        <Icon size={iconSize} {...{ name }} />
      </Text>
    </View>
  );
};

export default CustomIcon;
