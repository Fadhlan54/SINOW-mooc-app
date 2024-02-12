/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "01": "#00CCF4",
          "01-transparent": "rgba(0, 204, 244, 0.08)",
          "02": "#27B1CC",
          "03": "#33B5FF",
          "04": "#0066A2",
        },
        neutral: {
          "01": "#FFFFFF",
          "02": "#EBF3FC",
          "03": "#D0D0D0",
          "04": "#8A8A8A",
          "05": "#3C3C3C",
          "06": "#151515",
          "07": "#D9D9D9",
        },
        alert: {
          danger: "#FF0000",
          "danger-transparent": "rgba(255, 0, 0, 0.08)",
          warning: "#F9CC00",
          success: "#73CA5C",
          attention: "#F9CC00",
        },
        "black-transparent": "rgba(0, 0, 0, 0.6)",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "serif"],
      },
      boxShadow: {
        low: "0 0 0 0 rgba(0, 0, 0, 0.15) backdrop-blur-4",
        high: "0 0 0 0 rgba(0, 0, 0, 0.15) backdrop-blur-10",
        "md-blue":
          "0 4px 6px -1px rgba(0, 204, 244, 0.1), 0 2px 4px -2px rgba(0, 204, 244, 0.1)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "#636363 #FFF",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#FFF",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#8b8b8b",
            borderRadius: "20px",
            border: "1px solid #FFF",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#636363",
          },
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
