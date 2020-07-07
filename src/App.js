import React from 'react';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';
import { Router } from 'react-router-dom';
import { Route, Redirect } from 'react-router';
import Amplify from 'aws-amplify';
import Page from './containers/Page';
import awsconfig from './aws-exports';

import { createBrowserHistory } from 'history';
import Editor from './containers/Editor';
const history = createBrowserHistory();

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Georgia, serif',
    fontSize: 16,
    h1: {
      fontWeight: 600,
      fontSize: 80,
      textAlign: 'center',
    },
    h2: {
      fontSize: 50,
      fontWeight: 500,
      textAlign: 'center',
    },
    h3: {
      fontSize: 40,
    }
  },
  palette: {
    primary: {
      main: '#FFEC8B'
    },
  },
  overrides: {
    MuiButton: {
      root: {
        margin: 2,
      }
    }
  }
});

function App() {
Amplify.configure(awsconfig);
  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.palette.background.default, paddingBottom: 30 }}>
      <Router history={history} >
        <ThemeProvider theme={theme}>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/:location" >
            <Page />
          </Route>
          <Route exact path="/edit/:location" >
            <Editor />
          </Route>
        </ThemeProvider>
      </Router>

    </div>
  );
}

export default App;
