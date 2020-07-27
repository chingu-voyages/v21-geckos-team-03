import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import { customTheme } from './theme';
import firebase, { FirebaseContext } from './firebase';
import {
  Forgot,
  SearchPage,
  Login,
  Movie,
  WatchLists,
  WatchList,
} from './pages';
import Layout from './components/Layout';
import useAuth from './hooks/useAuth';

function App() {
  const user = useAuth();
  return (
    <Router>
      <FirebaseContext.Provider value={{ user, firebase }}>
        <ThemeProvider theme={customTheme}>
          <ColorModeProvider>
            <Layout>
              <Switch>
                <Route exact path="/" component={SearchPage} />
                <Route path="/movie/:movieid" component={Movie} />
                <Route path="/login" component={Login} />
                <Route path="/lists" component={WatchLists} />
                <Route path="/list/:listid" component={WatchList} />
                <Route path="/forgot" component={Forgot} />
                <Route render={() => <h1>404</h1>} />
              </Switch>
            </Layout>
            <CSSReset />
          </ColorModeProvider>
        </ThemeProvider>
      </FirebaseContext.Provider>
    </Router>
  );
}

export default App;
