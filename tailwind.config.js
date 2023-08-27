/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  safelist: [
    "font-light",
    "text-3xl",
    "rounded",
    "p-1",
    "bg-gray-200",
    "dark:bg-gray-800/0",
    "hover:dark:bg-gray-800/100",
    "bg-opacity-0",
    "hover:bg-opacity-100",
    "transition-background",

    "w-[1px]",
    "h-8",
    "-bottom-2",
    "bg-gray-800/80",
    "dark:bg-gray-200/80",
    "group-hover:opacity-100",
    "transition-opacity",
    "group-hover:animation-blink",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
