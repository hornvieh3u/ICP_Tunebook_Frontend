/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const windmill = require("./src/tailwind/config");

module.exports = windmill({
  darkMode: "class",
  content: ["src/**/*.{js, jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'plus':  ['Roboto normal', ...defaultTheme.fontFamily.sans],
        'plus-bold': ['Roboto bold', ...defaultTheme.fontFamily.sans],
        'roboto': ['Roboto normal', ...defaultTheme.fontFamily.sans],
        'roboto-medium': ['Roboto medium', ...defaultTheme.fontFamily.sans],
        'roboto-bold': ['Roboto bold', ...defaultTheme.fontFamily.sans]
      },
      boxShadow: {
        bottom:
          "0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)",
          "bottom_1": "0px 0px 30px rgba(74, 74, 74, 0.35)",
          "drop_1" : "0 0 15px rgba(6, 116, 252, 0.2)"
      },
      width: {
        '65': '16.625rem',
        '69': '19.625rem',
        '26': '2.25rem',
        '30': '1.875rem',
      },
      height: {
        '27': '2.875rem',
        '26': '2.25rem',
        '30': '1.875rem'
      },
      gap: {
        '1': '0.25rem',
        '3': '0.75rem',
        '4': '1rem',
        '45' : '0.625rem',
        '8': '1.25rem',
        '10': '2.25rem'
      },
      padding: {
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '45': '0.625rem',
        '8': '2rem',
        '9': '2.5rem',
        '12': '3rem',
        "16": "4rem",
        "96": "6rem"
      },
      borderRadius: {
        '2': '0.25rem', // Your custom border radius value
        '3' : '0.625rem',
        '4': '1rem',
        '5': '1.25rem',
        '8': '3rem'
      },
      
      fontWeight: {
        thin: '100',
        hairline: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      lineHeight: {
        '25': '25px',
        '18': '18px',
        '22': '22px',
        '20': '20px',
        '30': '30px'
      },
      fontSize: {
        '24': '24px',
        '22': '22px',
        '20': '24px', 
        '10': '10px',
        '14': '14px',
        '16': '1rem',
        '18': '18px',
        '28': '28px'
      }
    },
    screens: {
      'xs': '450px', // Define the xs breakpoint to start from 0px
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: {
      primary: "#1C1B1B",
      secondary: "#50462A",
      background: "#161616",      
      stone: {
        50: "#fafaf9",
        100: "#f5f5f4",
        200: "#e7e5e4",
        300: "#d6d3d1",
        400: "#a8a29e",
        500: "#78716c",
        600: "#57534e",
        700: "#44403c",
        800: "#292524",
        900: "#1c1917",
        950: "#0c0a09",
        1000: "#10100F",
      },
      amber: {
        50: "#fffbeb",
        100: "#fef3c7",
        200: "#fde68a",
        300: "#fcd34d",
        400: "#fbbf24",
        500: "#f59e0b",
        600: "#d97706",
        700: "#b45309",
        800: "#92400e",
        900: "#78350f",
        950: "#451a03",
      },
      primary: {
        100: "#F7F7F8",
        200: "#C6C5CC",
        300: "#95949F",
        400: "#656372",
        500: "#363443",
        600: "#2F2D3B",
        700: "#282733",
        800: "#21202A",
        900: "#1B1A22",
      },
      secondary: {
        100: "#F6F6F7",
        200: "#C1C1C5",
        300: "#8B8B92",
        400: "#575760",
        500: "#23232C",
        600: "#1F1F27",
        700: "#1A1A21",
        800: "#16161C",
        900: "#111116",
      },
      neutral: {
        100: "#FFFFFF",
        200: "#F2F2F2",
        300: "#E6E6E6",
        400: "#D9D9D9",
        500: "#CDCDCD",
        600: "#A4A4A4",
        700: "#7B7B7B",
        800: "#525252",
        900: "#292929",
      },
      darkblue: {
        100: "#E6F0FF",
        200: "#ACCFFF",
        300: "#79A8FF",
        400: "#3D83F7",
        500: "#0060D9",
        600: "#004FD0",
        700: "#003FB3",
        800: "#00308C",
        900: "#002166",
      },
      coral: {
        100: "#FFF5F5",
        200: "#FFB8B8",
        300: "#FF7D81",
        400: "#FF5358",
        500: "#FD363B",
        600: "#DF2C31",
        700: "#BF2327",
        800: "#9F1B1F",
        900: "#801417",
      },
      violet: {
        100: "#F3F3FF",
        200: "#C0C2FF",
        300: "#9599FF",
        400: "#7478FF",
        500: "#5C60F5",
        600: "#393DC9",
        700: "#1F2293",
        800: "#0D0F5C",
        900: "#020426",
      }
    },
  },
  plugins: [require('tailwindcss')({ watch: true })],
  content: ["./node_modules/flowbite/**/*{.js, jsx}", "src/**/*.{js, jsx}", 
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  "./node_modules/tailwind-datepicker-react/dist/**/*.js"]});

