import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  inputText: {
    width: 400,
    borderWidth: 2,
    borderColor: COLORS.green,
    borderRadius: 15,
    padding: 10,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  picker: {
    height: 200,
    width: 450,
    backgroundColor: COLORS.lightGray, // Add a background color for visibility
    borderRadius: 5,
  },
});

export default styles;
