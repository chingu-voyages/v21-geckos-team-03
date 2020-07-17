import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --limegreen: hsl(163, 72%, 41%);
    --brightred: hsl(356, 69%, 56%);
    --facebook: hsl(208, 92%, 53%);
    --twitter: hsl(203, 89%, 53%);
    --instagram: linear-gradient(to right,hsl(37, 97%, 70%), hsl(329, 70%, 58%));
    --youtube: hsl(348, 97%, 39%);
    --auto-grid-min-size: 27rem;
    --shadow-hover: 0 8px 20px -15px rgba(0, 0, 0, 0.2);
  }

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

    *,
  html,
  body {
    margin: 0;
    padding: 0;
  }

  html {
	font-size: 62.5%; // 1rem = 10px
  }

  body {
    height: 100vh;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textPrimary};
    font-family: 'Inter', sans-serif;
    text-rendering: optimizeSpeed;
    transition: color 0.15s ease;
  }

  ul,
  ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.textPrimary};
    display: inline-block;
  }
`;

export default GlobalStyles;
