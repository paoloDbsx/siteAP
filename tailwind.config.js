/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      transitionDuration: {
        2000: "2000ms",
        3000: "3000ms",
        4000: "4000ms",
        5000: "5000ms",
      },
      colors: {
        marseille_agency: "#025FAE",
        paris_agency: "#FF6500",
        toulouse_agency: "#00B0C0",
        border_agencies: "#dde0e5",
        from_aside: "#172554",
        to_aside: "#152D60",
      },
      screens: {
        xxs: "360px",
        xs: "480px",
        // sm: '640px',
        // md: '768px',
        // lg: '1024px',
        // xl: '1280px',
        // 2xl: '1536px',
      },
    },
  },
  plugins: [],
};
