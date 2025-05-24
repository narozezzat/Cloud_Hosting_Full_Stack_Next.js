import type { Config } from "tailwindcss";

const config: Config = {
  important: true, // Add this line
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          "light-1": "#f5faff",
          "light-2": "#D9E8FC",
          DEFAULT: "#2419be",
          "dark-1": "#1d149a",
          "dark-2": "#202551",
        },
        text: {
          heading: "#0E1024",
          body: "#0e1024de",
        },
        green: {
          "light-1": "#edf7ee",
          "light-2": "#CDE9CE",
          "light-3": "#009A51",
          "light-4": "#EAF6ED",
          DEFAULT: "#4caf50",
          dark: "#1e4620",
        },
        gray: {
          "light-1": "#f5f5f5",
          "light-2": "#E5E5E5",
          "light-3": "#F9F9F9",
          DEFAULT: "#9e9e9e",
          dark: "#616161",
          "dark-1": "#CFCFCF",
        },
        orange: {
          DEFAULT: "#FF9500",
        },
        primary: {
          DEFAULT: "white",
        },
        error: {
          "light-1": "#DE1135",
          "light-2": "#FFE1DE",
          DEFAULT: "#ff4d4f",
        },
        warning: {
          DEFAULT: "#FFC043",
        },
        reservedInactive: "#F59E0B",
        contracted: "#581a85",
        booked: "#52bfff",
        notForSale: "#D30000",
        resExpired: "#FFD800",
      },
      fontFamily: {
        DEFAULT: ["DMSans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
