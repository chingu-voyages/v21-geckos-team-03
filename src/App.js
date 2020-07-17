import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, darkTheme } from './style';
import Layout from './components/Layout';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Layout>
        <header className="App-header">
          <h1>Hello Word. This is my push</h1>
        </header>
      </Layout>
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
