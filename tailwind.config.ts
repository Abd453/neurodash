import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        primaryLight: 'var(--primary-light)',
        accent: 'var(--accent)',
        // card and footer backgrounds (optional)
        card: '#0d1114',
        footer: '#07080a',
      },
    },
  },
  plugins: [],
};
