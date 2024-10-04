import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        textAnimation: {
          '0%, 10%': { marginTop: '0rem' },
          '20%, 30%': { marginTop: '-2.5rem' }, // Tailwind CSS의 높이 단위를 사용하여 조정
          '40%, 50%': { marginTop: '-5.2rem' },
          '60%, 70%': { marginTop: '-8.2rem' },
          '80%, 90%': { marginTop: '-10.2rem' },
          '90%, 100%': { marginTop: '0rem' },
        },
      },
      animation: {
        textAnimation: 'textAnimation 8s infinite',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "bgGray": "#2F2F2F",
        "bgDeepGray": "#191919",
        "primaryGray": "#3F3F3F",
        "secondaryGray": "#3C3C3C",
        "thirdGray": "#D9D9D9",
        "textGray": "#B3B3B3",
        "mainWhite": "#ffffff",
        "mainLightGreen": "#CEFFEC",
        "mainGreen": "#20C786",
        "mainDarkGreen": "#06CC80",
        "mainBlack": "#000000",
        "mainGray": "#666666",
        "custom-light-green": 'rgba(206,255,236,1)',
        'custom-green': 'rgba(6,204,128,1)',
      },
    },
    fontFamily: {
      Pretendard: ["Pretendard"],
    },
  },
  plugins: [],
};
export default config;
