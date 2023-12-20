const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'jost': ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#766be8',
              foreground: '#ffffff',
              50: '#ebe8ff',
              100: '#c2bdf9',
              200: '#9991ef',
              300: '#766be8',
              400: '#4838df',
              500: '#2f1fc6',
              600: '#23189a',
              700: '#18116f',
              800: '#0d0945',
              900: '#05021c',
            },
            focus: '#766be8',
          },
        },
      },
    }),
  ],
};
