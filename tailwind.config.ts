import type { Config } from "tailwindcss";

const config: Config = {
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
        red:"#ff0000",
        redlight:"#ffbdbd",
        green:"#00ad08",
        greenlight:"#94ffa1",
        blue:"#C3EBFA",
        bluelight:"#96c1ff",
        bluelight1:"#c9dfff",
        Yellow: "#FAE27C",
        YellowLight: "#FEFCE8",
        Sky: "#C3EBFA",
        SkyLight: "#EDF9FD",
        purple: "#CFCEFF"
      }
    },
  },
  plugins: [],
};
export default config;

