module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    patterns: {
      opacities: {
        100: "1",
        80: ".80",
        60: ".60",
        40: ".40",
        20: ".20",
        10: ".10",
        5: ".05",
      },
      sizes: {
        1: "0.25rem",
        2: "0.5rem",
        4: "1rem",
        6: "1.5rem",
        8: "2rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
      },
    },
    fontFamily: {
      b1: ["KalamehThin", "system-ui"],
      b2: ["KalamehExtraLight", "system-ui"],
      b3: ["KalamehLight", "system-ui"],
      b4: ["KalamehRegular", "system-ui"],
      b5: ["KalamehMedium", "system-ui"],
      b6: ["KalamehSemiBold", "system-ui"],
      b7: ["KalamehBold", "system-ui"],
      b8: ["KalamehExtraBold", "system-ui"],
      b9: ["KalamehBlack", "system-ui"],
    },
    screens: {
      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },

      mdrev: { min: "768px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "500px" },
      // => @media (max-width: 639px) { ... }
    },
  },

  plugins: [require("tailwindcss-bg-patterns"), require("daisyui"), require("@tailwindcss/typography")],

  daisyui: {
    themes: [
      "night",

      {
        mytheme: {
          primary: "#4E45D0",
          "primary-content": "#FFFFFF",
          secondary: "#3ABEF9",
          "secondary-content": "#FFFFFF",
          accent: "#818CF8",
          "accent-content": "#FFFFFF",
          neutral: "#D2649A",
          "neutral-content": "#000000",
          "base-100": "#D1D5DB",
          "base-200": "#F9FAFB",
          "base-300": "#ffffff",
          "base-content": "#161616",
          info: "#00B5FF",
          "	info-content": "#000000",
          success: "#00A96E",
          "success-content": "#000000",
          warning: "#FFBE00",
          "warning-content": "#000000",
          error: "#FF5861",
          "error-content": "#000000",
        },
      },
    ],
  },
};
