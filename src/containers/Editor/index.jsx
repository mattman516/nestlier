import React from 'react';
import Content from '../ContentEditor';
import image from '../../nestlier1.jpg';
import NestlierBar from '../../components/AppBar';
import { getPageInfo } from './getPageInfo';
import { publishPageInfo } from './updatePageInfo';
import { createContent } from './createContent';
import {
  DialogActions,
  Button,
  Dialog,
  Box,
  TextField,
  CircularProgress,
  AppBar,
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
  const [initialPageInfo, setInitialPageInfo] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);


  React.useEffect(() => {
    fetch();
  }, [location]);

  const fetch = async () => {
    const info = await getPageInfo();
    updateState(info);
  }

  const updatePageInfo = (key) => (e) => {
    setButtonDisabled(false);
    const newPageInfo = { ...pageInfo };
    newPageInfo[key] = e.target.value;
    setPageInfo(newPageInfo);
  }

  const updateState = (newInfo) => {
    let pages = Object.keys(newInfo.pages).map(p => newInfo.pages[p]);
    pages = pages.map(p => ({ ...p, url: `/edit${p.url}` }))
    setPages(pages);
    setPageInfo(newInfo.pages[location])
    setInitialPageInfo(newInfo.pages[location])
    setButtonDisabled(true);
  }

  const publish = async () => {
    setLoading(true);
    const updated = await publishPageInfo(pageInfo, location);
    updateState(updated);
    setLoading(false);
  }

  return (
    <>
      <AppBar>
        <Button disabled={buttonDisabled} onClick={publish}>
          {loading ? <CircularProgress size="small" /> : 'Publish' }
        </Button>
      </AppBar>
      <Box style={backgroundStyle} >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '100%', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center' }}>
              <TextField
                label="Title"
                value={pageInfo['title']}
                onChange={updatePageInfo('title')}
              />
              <TextField
                label="Subtitle"
                value={pageInfo['subtitle']}
                onChange={updatePageInfo('subtitle')}
              />
            </div>
        </div>
      </Box>
      <Box style={fadeStyle} />
      <NestlierBar pages={pages}/>
      {(pageInfo.content || []).map(c => {
        return (
          <Content key={c.name} name={c.name} location={location} onDelete={updatePageInfo('content')} pageInfo={pageInfo} />
        )
      })}
      <AddContentButton pageInfo={pageInfo} onChange={updatePageInfo('content')} location={location} />
    </>
  );
}

export const AddContentButton = ({pageInfo, onChange, location}) => {

  const [addContentOpen, setAddContentOpen] = React.useState(false);
  const [name, setName] = React.useState('');

  const toggleAddContent = () => {
    setAddContentOpen(!addContentOpen);
  }

  const updateName = (e) => {
    setName(e.target.value);
  }

  const addContent = async () => {
    pageInfo.content.push({ name })
    const e = { target: { value: pageInfo.content } }
    await createContent(location, name);
    onChange(e);
    toggleAddContent();
  }

  return (
    <Box style={{ maxWidth: 1200,  margin: 'auto' }}>
      <Button onClick={toggleAddContent}>Add More Content</Button>
      <Dialog open={addContentOpen} width='md' fullWidth  >
        <TextField
          label="New Content"
          onChange={updateName}
        />
        <DialogActions>
          <Button onClick={toggleAddContent} >Close</Button>
          <Button variant="contained" onClick={addContent}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default withRouter(Page);
        