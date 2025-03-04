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
        disappear: 'disappear 0.2s ease-in-out',
        marquee: 'marquee 25s linear infinite',
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
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
}
