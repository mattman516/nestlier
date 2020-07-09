
import {
    createMuiTheme,
} from '@material-ui/core';

export default createMuiTheme({
    typography: {
      fontFamily: 'Source Serif',
      fontSize: 16,
      h1: {
        fontWeight: 300,
        fontSize: 60,
        textAlign: 'center',
      },
      h2: {
        fontSize: 45,
        fontWeight: 200,
        textAlign: 'center',
      },
      h3: {
        fontSize: 40,
      }
    },
    palette: {
      primary: {
        main: '#d78d00'
      },
    },
    overrides: {
      MuiButton: {
        root: {
          margin: 2,
        }
      },
      MuiAppBar: {
        colorPrimary: {
          backgroundColor: 'transparent',
          borderStyle: 'none none solid none',
          borderWidth: 5,
          borderColor: '#d78d00',
        }
      },
      MuiToolbar: {
          root: {
              background: 'transparent',
          }
      }
    }
  });