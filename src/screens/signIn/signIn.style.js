import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 100,
  },
  input: {
    width: 300,
    height: 60,
    padding: 10,
    borderColor: COLORS.black,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderRadius: 100,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ed4337",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default styles;
