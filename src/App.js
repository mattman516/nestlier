import React from 'react';
import image from './nestlier1.jpg';
import {
  Typography,
  createMuiTheme,
  ThemeProvider,
  Paper,
  Box
} from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';
import ReactMarkdown from 'react-markdown';

const backgroundStyle = {
  /* The image used */
  backgroundImage: `url(${image})`,

  /* Full height */
  height: '100vh',

  /* Center and scale the image nicely */
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',

  color: 'white',
}

const fadeStyle = {
  backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(250,250,250,1))',
  marginTop: -100,
  marginBottom: 30,
  height: 100, 
};

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
    },
    h3: {
      fontSize: 40,
    }
  },
  palette: {
    primary: yellow
  }
});

function App() {
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      setVis(true);
    }, 2000);
  }, [])
  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.palette.background.default, paddingBottom: 30 }}>
      <ThemeProvider theme={theme}>
        <Box style={backgroundStyle} >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '100%', justifyContent: 'center' }}>
            {!vis && (
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography
                  className="animate__animated animate__backInRight"
                  variant="h1"
                >
                  Nestler 
                </Typography>
                <Typography
                  className="animate__animated animate__bounce"
                  variant="h1"
                >
                  &
                </Typography>
                <Typography
                  className="animate__animated animate__backInLeft"
                  variant="h1"
                >
                  Plantier
                </Typography>
              </div>
            )}
            {vis && (
              <>
                <Typography
                  className="animate__animated animate__backInDown"
                  variant="h1"
                >
                  Nestlier
                </Typography>
                <Typography
                  className="animate__animated animate__fadeIn animate__delay-1s"
                  variant="h2"
                >
                  Nestli-<b>yay!!</b>
                </Typography>
              </>
            )}
          </div>
        </Box>
        <Box style={fadeStyle} />
        <Paper style={{ maxWidth: 1200, margin: 'auto', padding: 20 }}>
          <Typography variant="h3" >Info</Typography>
          <Typography>
            <ReactMarkdown source={"## test"} />
          </Typography>
        </Paper>
      </ThemeProvider>

    </div>
  );
}

export default App;
