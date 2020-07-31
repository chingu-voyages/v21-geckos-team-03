/* eslint-disable prefer-destructuring */
import { theme } from '@chakra-ui/core';

const breakpoints = ['360px', '768px', '1024px', '1440px'];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

export const customTheme = {
  ...theme,
  breakpoints,
  fonts: {
    heading: "'Spartan', sans-serif",
    body: "'Spartan', sans-serif",
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '15px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '64px',
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
    // green: '#33cc33',
  },
  shadows: {
    ...theme.shadows,
    primary: ' 0px 10px 61px -30px hsla(180, 29%, 50%, 0.8)',
  },
};

export default theme;
