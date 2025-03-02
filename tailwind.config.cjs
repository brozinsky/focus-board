/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      // padding: {
      //   DEFAULT: "1rem",
      //   sm: "2rem",
      //   lg: "4rem",
      // },
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1240px",
        "2xl": "1464px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "var(--color-input)",
        ring: "hsl(var(--ring))",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        "background-glass": "var(--color-background-glass)",
        foreground: "var(--color-foreground)",
        "foreground-primary": "var(--color-foreground-primary)",
        "foreground-muted": "var(--color-foreground-muted)",
        warning: "#E74A4A",
        inverted: "var(--color-neutral-900)",
        text: {
          100: "var(--color-text-100)",
          300: "var(--color-text-300)",
          500: "var(--color-text-500)",
          900: "var(--color-text-900)",
        },
        "dark-blue": "var(--color-dark-blue)",
        premium: "var(--color-premium)",
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        "window-bar": "var(--window-bar-height)",
      },
      fontSize: {
        none: "0",
      },
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
      gridTemplateColumns: {
        13: "repeat(13, minmax(0, 1fr))",
        26: "repeat(26, minmax(0, 1fr))",
      },
      aspectRatio: {
        image: "4 / 3",
      },
      gridColumn: {
        "span-13": "span 13 / span 13",
        "span-14": "span 14 / span 14",
        "span-15": "span 15 / span 15",
        "span-16": "span 16 / span 16",
        "span-17": "span 17 / span 17",
        "span-18": "span 18 / span 18",
        "span-19": "span 19 / span 19",
        "span-20": "span 20 / span 20",
        "span-21": "span 21 / span 21",
        "span-22": "span 22 / span 22",
        "span-23": "span 23 / span 23",
        "span-24": "span 24 / span 24",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/line-clamp")],
};
