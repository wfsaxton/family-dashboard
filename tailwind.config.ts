import { type Config } from "tailwindcss";

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './modules/**/*.{ts,tsx}',
    './config/**/*.{ts,tsx}',
	],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
