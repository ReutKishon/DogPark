import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    paddingTop: 30,
    paddingLeft: 25,
    gap: SIZES.small,
    height: 130,
  },
  helloText: {
    fontSize: 50,
    fontFamily: FONT.title,
    color: COLORS.primary,
  },
  contentText: {
    fontSize: 20,
    fontFamily: FONT.medium,
    color: COLORS.secondary,
  },
  buttonContainer: {
    //position: "absolute",
    bottom: 0,
    width: "100%",
    height: 50,
    alignItems: "center",
    marginBottom: 50,
    marginTop: 30,
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
  listContainer: {
    flex: 1,
  },
});

export default styles;
