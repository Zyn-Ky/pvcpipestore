/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/scss/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      zIndex: {
        muiMobileStepper: "1000",
        muiFab: "1050",
        muiSpeedDial: "1050",
        muiAppBar: "1100",
        muiDrawer: "1200",
        muiModal: "1300",
        muiSnackbar: "1400",
        muiTooltip: "1500",
        godMode: "99999999999",
      },
    },
    screens: {
      dangerWidth: { raw: "(max-width:230px)" },
      dangerHeight: { raw: "(max-height:150px)" },
      muiXs: "0px",
      muiSm: "600px",
      muiMd: "900px",
      muiLg: "1200px",
      muiXl: "1536px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  important: "body",
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
