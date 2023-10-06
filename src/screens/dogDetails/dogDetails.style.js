import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightWhite,
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
    paddingTop: 17,
    gap: 15,
  },
  dogName: {
    fontFamily: FONT.title,
    fontSize: SIZES.xxxLarge,
  },
  infoContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    width: 380,
    rowGap: 10,
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
  pointDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: COLORS.green,
    marginTop: 6,
  },
  profileContainer: {
    width: 350,
    height: 400,
    backgroundColor: COLORS.green,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  profileImage: {
    width: "96%",
    height: "96%",
    borderRadius: SIZES.medium,
  },
});

export default styles;
