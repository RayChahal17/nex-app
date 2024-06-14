const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const svgToDataUri = require("mini-svg-data-uri");
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette").default;
const flowbite = require("flowbite-react/tailwind");

// Plugin to add each Tailwind color as a global CSS variable
function addVariablesForColors({ addBase, theme }) {
   let allColors = flattenColorPalette(theme("colors"));
   let newVars = Object.fromEntries(
      Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
   );

   addBase({
      ":root": newVars,
   });
}

/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
      'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
      flowbite.content(),
   ],
   darkMode: 'class', // Enable dark mode support using a class strategy
   theme: {
      extend: {
         animation: {
            scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
         },
         keyframes: {
            scroll: {
               to: {
                  transform: "translate(calc(-50% - 0.5rem))",
               },
            },
         },
         fontFamily: {
            sans: ['Inter var', ...defaultTheme.fontFamily.sans],
         },
         colors: {
            ...colors, // Spread all colors into the theme
         },
      },
   },
   plugins: [
      require('flowbite/plugin'),
      flowbite.plugin(),
      addVariablesForColors,
      function ({ matchUtilities, theme, addUtilities }) {
         matchUtilities(
            {
               "bg-dot-thick": (value) => ({
                  backgroundImage: `url("${svgToDataUri(
                     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
                  )}")`,
               }),
            },
            { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
         );

         addUtilities({
            '.scrollbar-hide': {
               /* Hide scrollbar for Chrome, Safari and Opera */
               '::-webkit-scrollbar': {
                  display: 'none',
               },
               /* Hide scrollbar for IE, Edge and Firefox */
               '-ms-overflow-style': 'none',  /* IE and Edge */
               'scrollbar-width': 'none',  /* Firefox */
            },
         });
      },
   ],
};
