import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  headings: {
    fontFamily: "'Bebas Neue', 'Inter', sans-serif",
    fontWeight: '700',
  },
  colors: {
    dark: [
      '#d9d9d9', '#b0b0b0', '#8a8a8a', '#666666', '#4a4a4a',
      '#333333', '#242424', '#181818', '#101010', '#080808',
    ],
    red: [
      '#ffe8e8', '#ffbdbd', '#ff9090', '#fa6363', '#f53d3d',
      '#e01e1e', '#c41414', '#a30f0f', '#820c0c', '#5c0808',
    ],
  },
  primaryColor: 'red',
  primaryShade: 5,
  defaultRadius: 'md',
});

export const COLORS = {
  bg: '#0a0a0a',
  bgAlt: '#141414',
  card: '#1b1b1b',
  border: 'rgba(255,255,255,0.08)',
  red: '#e01e1e',
  redSoft: '#ff5c5c',
  text: '#f2f2f2',
  textMuted: '#a0a0a0',
};
