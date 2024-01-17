import { nextui } from '@nextui-org/react'
const authBg = './src/assets/images/auth_background_2.jpg'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth-bg': authBg,
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
