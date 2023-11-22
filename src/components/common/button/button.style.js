import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: SIZES.large,
  },
});

export default styles;
