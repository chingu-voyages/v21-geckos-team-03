import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --auto-grid-min-size: 27rem;
    --border-radius: 8px;
    --shadow-hover: 0 8px 20px -15px rgba(0, 0, 0, 0.2);
    --shadow-high: 0 5px 30px -15px rgba(0, 0, 0, 0.2);
	  --shadow-low: 0 10px 30px -15px rgba(0, 0, 0, 0.2);
    --transition-main: all 0.2s ease-in-out;
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

  button {
    cursor: pointer;
    border: 0;
    border-radius: 0;
    transition: var(--transition-main);
    &:focus,
    &:active {
      outline: 0;
    }
  }
`;

export default GlobalStyles;
