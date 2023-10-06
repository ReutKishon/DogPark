import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.green,
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: SIZES.large,
  },
});

export default styles;
