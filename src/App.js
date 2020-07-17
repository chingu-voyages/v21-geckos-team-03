import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, darkTheme } from './style';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <header className="App-header">
        <h1>Hello Word. This is my push</h1>
      </header>
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
