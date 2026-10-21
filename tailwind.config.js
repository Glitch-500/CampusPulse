/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Requested Primary: #130070 (Deep Royal Indigo)
        royal: {
          50: '#F0EBFA',
          100: '#ECE7FE',
          200: '#DCD4FD',
          300: '#BDB0FB',
          400: '#9680F7',
          500: '#6E4DF0',
          600: '#4B24E1',
          700: '#2C07BD',
          800: '#1C0191',
          900: '#130070', // #130070
          950: '#0A0042',
          DEFAULT: '#130070',
        },
        // Requested Neutral/Secondary: #808080 (Classic Grey)
        neutralGrey: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#808080', // #808080
          600: '#6B7280',
          700: '#4B5563',
          800: '#374151',
          900: '#1F2937',
          DEFAULT: '#808080',
        },
        brand: {
          50: '#F0EBFA',
          100: '#ECE7FE',
          200: '#DCD4FD',
          300: '#BDB0FB',
          400: '#9680F7',
          500: '#6E4DF0',
          600: '#4B24E1',
          700: '#2C07BD',
          800: '#1C0191',
          900: '#130070',
          950: '#0A0042',
          teal: '#130070',
          softMint: '#ECE7FE',
          mintBg: '#F0EBFA',
        },
        // Map emerald and crimson so existing utility classes adopt #130070 and #808080
        emerald: {
          50: '#F0EBFA',
          100: '#ECE7FE',
          200: '#DCD4FD',
          300: '#BDB0FB',
          400: '#9680F7',
          500: '#6E4DF0',
          600: '#4B24E1',
          700: '#2C07BD',
          800: '#1C0191',
          900: '#130070',
          950: '#0A0042',
          DEFAULT: '#130070',
        },
        crimson: {
          50: '#F0EBFA',
          100: '#ECE7FE',
          200: '#DCD4FD',
          300: '#BDB0FB',
          400: '#9680F7',
          500: '#6E4DF0',
          600: '#4B24E1',
          700: '#2C07BD',
          800: '#1C0191',
          900: '#130070',
          950: '#0A0042',
          DEFAULT: '#130070',
          light: '#ECE7FE',
          dark: '#130070',
        },
        shalaboy: {
          light: '#E0F2FE',
          DEFAULT: '#0284C7',
          dark: '#0369A1',
        },
        shalagirl: {
          light: '#FCE7F3',
          DEFAULT: '#DB2777',
          dark: '#BE185D',
        },
        shalaalert: {
          light: '#FEF3C7',
          DEFAULT: '#D97706',
          dark: '#B45309',
        },
        shalarte: {
          light: '#ECE7FE',
          DEFAULT: '#130070',
          dark: '#0A0042',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
        'emerald-glow': '0 10px 25px -5px rgba(19, 0, 112, 0.35)',
        'crimson-glow': '0 10px 25px -5px rgba(19, 0, 112, 0.35)',
        'royal-glow': '0 10px 25px -5px rgba(19, 0, 112, 0.35)',
      }
    },
  },
  plugins: [],
}
