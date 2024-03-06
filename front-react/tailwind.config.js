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

  plugins: [require("tailwindcss-bg-patterns"), require("daisyui")],
};
