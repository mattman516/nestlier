import React from 'react';
import {
  Button,
  Paper,
  TextField,
  Dialog,
  CircularProgress,
} from '@material-ui/core';
import Content from '../../components/Content';
import { getContent } from './getContent';
import { publishContent } from './publishContent';
import { deleteContent } from './deleteContent';

const ContentEditorContainer = ({ name, location, onDelete, pageInfo }) => {

  const [content, setContent] = React.useState({});
  const [initialContent, setInitialContent] = React.useState({})
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const initial = await getContent(name, location) || {};
    setInitialContent(initial)
    setContent(initial);
  }

  const publish = async () => {
    setLoading(true);
    const newContent = await publishContent(content) || {};
    setInitialContent(newContent);
    setContent(newContent);
    setLoading(false);
  }

  const changeValue = (key) => (e) => {
    const newValue = { ...content };
    newValue[key] = e.target.value;
    setContent(newValue);
  }


  const isChanged = (content.value === initialContent.value);

  return (
    <Paper style={{ maxWidth: 1200, margin: 'auto', padding: 20, marginTop: 20, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Delete {...{ content, onDelete, name, pageInfo }}/>
        <Preview content={content} />
        <Button variant="contained" color="primary" disabled={isChanged} onClick={publish}>
          {loading ? <CircularProgress size="small" /> : 'Publish' }
        </Button>
      </div>
      <TextField
        defaultValue={name}
        label="Title"
        // onChange={changeName}
      />
      <TextField
        multiline
        defaultValue={content['value']}
        onBlur={changeValue('value')}
        label="Message"
      />
    </Paper>
  );
}

const Preview = ({content}) => {
  const [showPreview, setShowPreview] = React.useState(false);
  const togglePreview = () => {
    setShowPreview(!showPreview);
  }
  return (
    <>
      <Button onClick={togglePreview}>Preview</Button>
      <Dialog open={showPreview} onClose={togglePreview} >
        <Content name={content.name} value={content.value} />
      </Dialog>
    </>
  );
}

const Delete = ({content, onDelete, name, pageInfo}) => {
  const triggerDelete = () => {
    deleteContent(content.id);
    onDelete({ target: { value: pageInfo.content.filter(c => c.name !== name) }});
  }
  return (
    <>
      <Button color="error" onClick={triggerDelete}>Delete</Button>
    </>
  );
}

export default ContentEditorContainer;
