/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        YekanBakhThin: "YekanBakh Thin",
        YekanBakhLight: "YekanBakh Light",
        YekanBakhRegular: "YekanBakh Regular",
        YekanBakhSemiBold: "YekanBakh SemiBold",
        YekanBakhBold: "YekanBakh Bold",
        YekanBakhExtraBold: "YekanBakh ExtraBold",
        YekanBakhBlack: "YekanBakh Black",
        YekanBakhExtraBlack: "YekanBakh ExtraBlack",
      },
      // keyframes: {
      //   floatBG: {
      //     "0%, 100%": { "background-position": "center center" },
      //     "25%": { "background-position": "30% 70%" },
      //     "50%": { "background-position": "70% 30%" },
      //     "75%": { "background-position": "40% 60%" },
      //   },
      // },
      // animation: {
      //   floatBG: "floatBG 15s ease-in-out infinite",
      // },
    },
  },
  plugins: [],
};
