/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        regular: ["Poppins_400Regular"],
        bold: ["Poppins_600SemiBold"],
        bold2: ["Poppins_700Bold"],
      },
     
      colors: {
        customColorSet:
        {
          primary: "#800000",
          secondary:"#FFFFFF",
        }
      },
    },
  },
  plugins: [],
}

