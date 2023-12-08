import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  button: {
    backgroundColor: "#4267B2",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 10,
    width: 240,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  signUpButton: {
    backgroundColor: "#34B7F1",
  },
  signUpText: {
    fontSize: 16,
  },
});

export default styles;
