import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },boxShadow:{
        'cardshadow' : "0px 0px 42.1px 13px rgba(0, 0, 0, 0.25) inset"
      },backgroundColor:{
        'verde': "rgba(5, 255, 0, 0.40)",
        'vermelho': 'rgba(255, 0, 0, 0.40)',
        'amarelo': 'rgba(255, 229, 0, 0.40)'
      },borderWidth:{
        "5px" : "5px"
      },borderColor:{
        "verde": "#05FF00"
      }
    },
  },
  plugins: [],
}
export default config
