/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#0A1929',
        'tech': '#008080',
        'eco': '#2E7D32',
        'warning': '#ED6C02',
        'danger': '#D32F2F',
        'bg': '#F5F7FA',
      },
    },
  },
  plugins: [],
}

