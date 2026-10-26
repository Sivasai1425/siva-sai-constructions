/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: { 950: '#102b24', 900: '#173c32', 800: '#214b3f', 700: '#2d5c4e' },
        gold: { 300: '#e4c995', 400: '#c9a96e', 500: '#ad8950' },
        cream: '#f7f5ef',
        ink: '#202923'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Georgia', 'serif']
      },
      boxShadow: { soft: '0 18px 60px rgba(18, 45, 36, .10)' }
    }
  },
  plugins: []
}