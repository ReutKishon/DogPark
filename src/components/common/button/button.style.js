import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.lightWhite,
    padding: 14,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    //color: "white",
    textAlign: "center",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: SIZES.large,
  },
});

export default styles;
