import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: COLORS.background,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 100,
  },
  input: {
    width: 350,
    backgroundColor: "white",
    padding: 15,
    marginBottom: 20,
    borderRadius: 15,
    borderColor: "black",
  },
  registerButton: {
    width: "100%",
    backgroundColor: "#1877f2",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
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
