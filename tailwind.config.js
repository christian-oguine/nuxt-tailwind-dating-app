/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue", 
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./composables/**/*.{js,ts}",
    "./utils/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f43f5e',     // Rose pink - romantic and passionate
        secondary: '#a855f7',   // Purple - elegant and mysterious
        accent: '#ff6b6b',      // Coral - warm and friendly
        neutral: '#64748b',     // Slate gray - for text
        success: '#10b981',     // Green - for positive actions
        warning: '#f59e0b',     // Amber - for notifications
        danger: '#ef4444',      // Red - for errors/warnings
        light: '#f8fafc',       // Very light gray - backgrounds
        dark: '#1e293b'         // Dark slate - dark text
      },
    },
    fontFamily: { 
      Montserrat: "Montserrat, sans-serif",  // Headings
      Inter: "Inter, system-ui, sans-serif",  // Body text, buttons
      Poppins: "Poppins, sans-serif",         // Alternative headings
    },

    container: {
      center: true,
      padding: '2rem',
    },

  },
  plugins: [],
}

