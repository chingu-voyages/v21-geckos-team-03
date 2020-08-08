import { theme } from '@chakra-ui/core';

const breakpoints = ['375px', '600px', '1024px', '1440px'];
[breakpoints.sm, breakpoints.md, breakpoints.lg, breakpoints.xl] = breakpoints;

export const customTheme = {
  ...theme,
  breakpoints,
  fonts: {
    heading: "'PT Sans', sans-serif",
    body: "'PT Sans', sans-serif",
  },
  fontSizes: {
    '3xs': '0.25rem',
    '2xs': '0.50rem',
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem',
  },
  colors: {
    ...theme.colors,
    primary: 'hsl(180, 29%, 50%)',
    neutral: {
      100: 'hsl(180, 52%, 96%)',
      200: 'hsl(180, 31%, 95%)',
      300: 'hsl(180, 8%, 52%)',
      400: 'hsl(180, 14%, 20%)',
    },
  },
  shadows: {
    ...theme.shadows,
    primary: ' 0px 10px 61px -30px hsla(180, 29%, 50%, 0.8)',
  },
};

export default theme;
