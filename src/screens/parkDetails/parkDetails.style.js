import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    //paddingTop: 17,
    //gap: 15,
  },
  parkName: {
    //fontFamily: FONT.title,
    fontSize: SIZES.xxLarge,
  },
  parkLocation: {
    fontSize: SIZES.xLarge,
    marginLeft: 2,
  },
  dogsHeader: {
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dogsHeaderContainer: {
    backgroundColor: COLORS.green,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  infoContainer: {
    //backgroundColor: COLORS.white,
    //borderRadius: 10,
    padding: 20,
    rowGap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  infoText: {
    fontFamily: FONT.title,
    fontSize: SIZES.large,
    marginLeft: SIZES.small,
  },

  profileContainer: {
    width: 350,
    height: 400,
    backgroundColor: COLORS.green,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: "96%",
    height: "96%",
    borderRadius: SIZES.medium,
  },
  locationBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  locationImage: {
    width: 22,
    height: 22,
    tintColor: COLORS.gray,
  },
  footContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.xLarge,
    paddingBottom: SIZES.xxxLarge,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
