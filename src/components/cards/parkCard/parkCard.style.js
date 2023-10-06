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

  profileContainer: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.green,
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
  parkName: {
    fontSize: SIZES.large,
    fontFamily: "DMBold",
    color: COLORS.primary,
  },
  parkLocation: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    marginLeft: 5,
    marginTop: 3,
    textTransform: "capitalize",
  },
  dogsNumber: {
    fontSize: SIZES.medium,
    fontFamily: "DMRegular",
    marginTop: 3,
    textTransform: "capitalize",
    marginLeft: 5,
  },
  iconBox: {
    marginTop: SIZES.small / 2,
    flexDirection: "row",
    alignItems: "center",
  },
  dogImage: {
    width: 25,
    height: 25,
  },
  locationImage: {
    width: 14,
    height: 14,
  },
});

export default styles;
