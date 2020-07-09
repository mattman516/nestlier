import React from 'react';
import {
  ThemeProvider,
} from '@material-ui/core';
import { Router } from 'react-router-dom';
import { Route, Redirect } from 'react-router';
import Amplify from 'aws-amplify';
import Page from './containers/Page';
import awsconfig from './aws-exports';

import { createBrowserHistory } from 'history';
import Editor from './containers/Editor';
import theme from './theme';
const history = createBrowserHistory();

function App() {
Amplify.configure(awsconfig);
  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.palette.background.default, paddingBottom: 30 }}>
      <Router history={history} >
        <ThemeProvider theme={theme}>
          <Route exact path="/">
            <Redirect to="/page/home" />
          </Route>
          <Route path="/page/:location" >
            <Page />
          </Route>
          <Route path="/edit/:location" >
            <Editor />
          </Route>
        </ThemeProvider>
      </Router>

    </div>
  );
}

export default App;
