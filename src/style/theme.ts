import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";

export const hp = heightPercentageToDP;
export const wp = widthPercentageToDP;

const colors = {
  body: "#FFFFFF",
  primary: "#2CB9B0",
  lightCyan: "#E7F9F7",
  secondary: "#0C0D34",
  orange: "#FE5E33",
  yellow: "#FFC641",
  pink: "#FF87A2",
  danger: "#FF0058",
  violet: "#442CB9",
  lightBlue: "#BFEAF5",
  grey: "#F4F0EF",
  info: "#808080",
  body2: "rgba(12,13,52,0.75)",
  background: "#17121A",
  disabled: "rgba(221,221,225,0.2)",
  lightGrey: "rgb(221,221,225)"
};

export const theme = {
  colors,
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40
  },
  textVariants: {
    hero: {
      fontFamily: "Fredericka",
      fontSize: wp("16%"),
      textAlign: "center",
      color: colors.body
    },
    title: {
      fontFamily: "ShareTech",
      fontSize: 28
    },
    header: {
      fontSize: 24,
      lineHeight: 24,
      fontFamily: "ShareTech",
      color: colors.body
    },
    body: {
      fontFamily: "Poppins",
      fontSize: 16,
      lineHeight: 24,
      color: colors.body
    }
  }
};
