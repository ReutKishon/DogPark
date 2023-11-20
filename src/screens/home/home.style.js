import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  helloText: {
    fontSize: 50,
    fontFamily: FONT.title,
    color: COLORS.primary,
  },
  button: {
    width: "85%",
    backgroundColor: COLORS.green,
    tintColor: "#fff",
    padding: 12,
    borderRadius: 15,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: SIZES.large,
  },
});

export default styles;
