import React from 'react';
import Content from '../Content';
import image from '../../nestlier1.jpg';
import AppBar from '../../components/AppBar';
import { getPageInfo } from './getPageInfo';
import {
  Typography,
  Box,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const backgroundStyle = {
  /* The image used */
  backgroundImage: `url(${image})`,

  /* Full height */
  height: '100vh',

  /* Center and scale the image nicely */
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
};

const fadeStyle = {
  backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(250,250,250,1))',
  marginTop: -80,
  marginBottom: 5,
  height: 80, 
};

const Page = (props) => {
  const { location } = props.match.params;
  const [pages, setPages] = React.useState([]);
  const [pageInfo, setPageInfo] = React.useState({});

  React.useEffect(() => {
    fetch();
  }, [location]);

  const fetch = async () => {
    const info = await getPageInfo();
    const pages = Object.keys(info.pages).map(p => info.pages[p]);
    setPages(pages);
    console.log(info.pages[location])
    setPageInfo(info.pages[location])
  }

  return (
    <>
      <Box style={backgroundStyle} >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '100%', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography
                className="animate__animated animate__backInDown"
                variant="h1"
                color="primary"
              >
              {pageInfo.title}
              </Typography>
              {pageInfo.subtitle && ( 
                <>
                  <Box 
                    className="animate__animated animate__backInDown"
                    style={{ height: 2, background: 'white' }}
                  />
                  <Typography
                    className="animate__animated animate__backInDown"
                    variant="h2"
                    color="primary"
                  >
                    {pageInfo.subtitle}
                  </Typography>
                </>
              )}
            </div>
        </div>
      </Box>
      <Box style={fadeStyle} />
      <AppBar pages={pages}/>
      {(pageInfo.content || []).map(c => {
        return (
          <Content key={c.name} name={c.name} location={location} />
        )
      })}
    </>
  );
}

export default withRouter(Page);
        