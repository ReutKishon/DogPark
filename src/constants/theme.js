const COLORS = {
  primary: "#312651",
  secondary: "#444262",
  tertiary: "#FF7754",
  shadow: "rgba(0, 0, 0, 0.2)",
  gray: "#83829A",
  gray2: "#C1C0C8",
  green: "#A2ED72",
  white: "#F3F4F8",
  lightWhite: "#FAFAFC",
  background: "#DAF0F7",
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
  title: "UbuntuCondensed",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
  xxxLarge: 48,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
