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
  Toolbar,
  Typography,
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
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);


  React.useEffect(() => {
    fetch();
  }, [location]);

  const fetch = async () => {
    const info = await getPageInfo();
    updateState(info);
    setButtonDisabled(true);
  }

  const updatePageInfo = (key) => (e) => {
    setButtonDisabled(false);
    const newPageInfo = { ...pageInfo };
    newPageInfo.pages[location][key] = e.target.value;
    setPageInfo(newPageInfo);
  }

  const updateState = (newInfo) => {
    setButtonDisabled(false);
    let pages = Object.keys(newInfo.pages).map(p => newInfo.pages[p]);
    pages = pages.map(p => ({ ...p, url: `/edit${p.url}` }))
    setPages(pages);
    setPageInfo(newInfo)
  }

  const publish = async () => {
    setLoading(true);
    const updated = await publishPageInfo(pageInfo, location);
    updateState(updated);
    setButtonDisabled(true);
    setLoading(false);
  }
  const currentPage = (pageInfo && pageInfo.pages && pageInfo.pages[location]) ? pageInfo.pages[location] : {};
  return (
    <>
      <Box style={backgroundStyle} >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '100%', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center' }}>
              <TextField
                variant="filled"
                label="Title"
                value={currentPage['title']}
                onChange={updatePageInfo('title')}
              />
              <TextField
                variant="filled"
                label="Subtitle"
                value={currentPage['subtitle']}
                onChange={updatePageInfo('subtitle')}
              />
            </div>
        </div>
      </Box>
      <Box style={fadeStyle} />
      <NestlierBar pages={pages}/>
      <AppBar position="sticky" color="default">
        <Toolbar style={{ justifyContent: 'flex-end' }}>
          <DeletePage {...{pageInfo, updateState, location, publish}} />
          <AddPage {...{pageInfo, updateState}} />
          <Button disabled={buttonDisabled} onClick={publish} variant="contained" color="primary" >
            {loading ? <CircularProgress size="small" /> : 'Publish' }
          </Button>
        </Toolbar>
      </AppBar>
      {(currentPage.content || []).map(c => {
        return (
          <Content key={c.name} name={c.name} location={location} onDelete={updatePageInfo('content')} currentPage={currentPage} />
        )
      })}
      <AddContentButton currentPage={currentPage} onChange={updatePageInfo('content')} location={location} />
    </>
  );
}

export const AddPage = ({ pageInfo, updateState }) => {
  const defaultValue = { name: '', subtitle: '', title: '', url: '', content: [] };
  const [dialog, setDialog] = React.useState(false);

  const createPage = () => {
    const newPageInfo = { ...pageInfo };
    newPageInfo.pages[defaultValue.name] = defaultValue;
    updateState(newPageInfo);
    triggerDialog();
  }
  const changeVal = (e) => {
    defaultValue.url = `/${(e.target.value).replace(' ', '')}`
    defaultValue.name = e.target.value;
  }
  const triggerDialog = () => {
    setDialog(!dialog);
  }
  return (
    <>
      <Button onClick={triggerDialog}>
        Create New Page
      </Button>
      <Dialog open={dialog} onClose={triggerDialog}>
        <TextField label="title" onChange={changeVal}/>
        <Button disabled={defaultValue.name} onClick={triggerDialog}>Cancel</Button>
        <Button disabled={defaultValue.name} onClick={createPage}>Enter</Button>
      </Dialog>
    </>
  )
}
export const DeletePage = ({ pageInfo, updateState, location, publish }) => {
  const [dialog, setDialog] = React.useState(false);

  const createPage = async () => {
    const newPageInfo = { ...pageInfo };
    Object.keys(pageInfo.pages).forEach(p => {
      if (p === location) {
        delete pageInfo.pages[p];
      }
    });
    await updateState(newPageInfo);
    await publish();
  }
  const triggerDialog = () => {
    setDialog(!dialog);
  }
  return (
    <>
      <Button onClick={triggerDialog} color="error" >
        Remove This Page
      </Button>
      <Dialog open={dialog} onClose={triggerDialog}>
        <Typography>Are you sure you want to delete??</Typography>
        <Button onClick={triggerDialog}>No</Button>
        <Button  onClick={createPage}>Yes</Button>
      </Dialog>
    </>
  )
}

export const AddContentButton = ({currentPage, onChange, location}) => {

  const [addContentOpen, setAddContentOpen] = React.useState(false);
  const [name, setName] = React.useState('');

  const toggleAddContent = () => {
    setAddContentOpen(!addContentOpen);
  }

  const updateName = (e) => {
    setName(e.target.value);
  }

  const addContent = async () => {
    currentPage.content.push({ name })
    const e = { target: { value: currentPage.content } }
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
        