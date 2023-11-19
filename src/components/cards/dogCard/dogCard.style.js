import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.small,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  selectedContainer: {
    //backgroundColor: "rgba(255, 0, 0, 0.1)",
    shadowColor: "rgba(0, 255, 0, 0.5)", // Change the shadow color to green
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.99,
    shadowRadius: 3,
    elevation: 4,
  },
  profileContainer: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "96%",
    height: "96%",
    borderRadius: SIZES.medium,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  dogName: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.primary,
  },
  dogGender: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
});

export default styles;
