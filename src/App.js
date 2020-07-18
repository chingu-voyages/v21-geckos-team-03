import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, darkTheme } from './style';
import Layout from './components/Layout';
import { Forgot, Home, Login, Movie, UserLists } from './pages';

// Thinking UserList should be a nested route, will come back to it.

function App() {
  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/movie/:id" component={Movie} />
            <Route path="/login" component={Login} />
            <Route path="/lists" component={UserLists} />
            <Route path="/forgot" component={Forgot} />
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </Layout>
        <GlobalStyles />
      </ThemeProvider>
    </Router>
  );
}

export default App;
