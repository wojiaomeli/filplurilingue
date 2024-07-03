const { readFile } = require('fs');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
              },
              colors: {
                customBlue: 'rgba(205, 209, 212, 1)',
                BluFil: 'rgba(3, 112, 225, 1)',
                PurpulFil: 'rgba(55, 53, 152, 1)',
                redFil: 'rgba(229, 7, 73, 1)',
                purplF: 'rgba(93, 0, 115, 1)',
                greenF: 'rgba(126, 179, 1, 1)',
                redF: 'rgba(228, 0, 1, 1)',
                yellowF: 'rgba(253, 205, 0, 1)',

              },
    },
  },
  plugins: [],
};
