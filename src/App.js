import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import firebase, { FirebaseContext } from './firebase';
import { GlobalStyles, darkTheme } from './style';
import { Forgot, Home, Login, Movie, UserLists, CreateList } from './pages';
import Layout from './components/Layout';
import useAuth from './hooks/useAuth';

// Thinking UserList should be a nested route, will come back to it.

function App() {
  const user = useAuth();
  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <FirebaseContext.Provider value={{ user, firebase }}>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/movie/:id" component={Movie} />
              <Route path="/login" component={Login} />
              <Route path="/lists" component={UserLists} />
              <Route path="/forgot" component={Forgot} />
              <Route path="/create-list" component={CreateList} />
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </Layout>
          <GlobalStyles />
        </FirebaseContext.Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
