import React from 'react';
import Content from '../Content';
import defaultImage from '../../nestlier1.jpg';
import AppBar from '../../components/AppBar';
import { getPageInfo } from './getPageInfo';
import {
  Typography,
  Box,
  IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit'
import { withRouter } from 'react-router-dom';
import { Storage } from 'aws-amplify';

const backgroundStyle = (image) => ({
  /* The image used */
  backgroundImage: `url(${image})`,

  /* Full height */
  height: '100vh',

  /* Center and scale the image nicely */
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
});

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
  const [img, setImg] = React.useState(defaultImage);

  React.useEffect(() => {
    fetch();
  }, [location]);

  const fetch = async () => {
    const info = await getPageInfo();
    const img = await Storage.get(`${location}backgroundImage`);
    let pages = Object.keys(info.pages).map(p => info.pages[p]);
    pages = pages.map(p => ({ ...p, url: `/page${p.url}` }))
    setPages(pages);
    setImg(img);
    setPageInfo(info.pages[location])
  }
  
  const navigateEdit = () => {
    props.history.push(`/edit/${location}`)
  }

  return (
    <>
      <Box style={backgroundStyle(img)} >
        <IconButton
          size="small"
          style={{ position: 'absolute', top: 0, right: 0 }}
          onClick={navigateEdit}
        >
          <EditIcon fontSize="small"/>
        </IconButton>
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
        