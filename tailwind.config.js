export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Lato"],
        custom2: ["Noto Sans"],
        custom3: ["Nunito Sans"],
      },
      animation: {
        appear: 'appear 0.2s ease-in-out',
        disappear: 'disappear 0.2s ease-in-out'
      },
      keyframes: {
        appear: {
          '0%': { opacity: '0',
           },
          '100%': { opacity: '1',
           },
        },
        disappear: {
          '0%': { opacity: '1',
           },
          '100%': { opacity: '0',
           },
        },
      },
    },
  },
  plugins: [],
}
