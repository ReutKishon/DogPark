import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    //backgroundColor: COLORS.lightWhite,
    flex: 1,
    //alignItems: "center",
  },

  dogName: {
    fontFamily: FONT.title,
    fontSize: SIZES.xxxLarge,
    //marginTop: 13,
    //right: 90,
  },
  infoContainer: {
    //backgroundColor: COLORS.white,
    //borderRadius: 10,
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
    fontSize: SIZES.xLarge,
    marginLeft: SIZES.small,
  },

  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  profileContainer: {
    paddingTop: 30,
    paddingLeft: 20,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: SIZES.medium,
  },
  pawIcon: {
    width: 17,
    height: 17,
    tintColor: COLORS.green,
  },
});

export default styles;
