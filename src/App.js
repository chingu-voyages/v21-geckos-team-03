import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import { customTheme } from './theme';
import firebase, { FirebaseContext } from './firebase';
import {
  Forgot,
  SearchPage,
  Home,
  Login,
  Movie,
  UserLists,
  UserList,
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
                <Route exact path="/" component={Home} />
                <Route path="/search" component={SearchPage} />
                <Route path="/movie/:movieid" component={Movie} />
                <Route path="/login" component={Login} />
                <Route path="/lists" component={UserLists} />
                <Route path="/list/:listid" component={UserList} />
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
