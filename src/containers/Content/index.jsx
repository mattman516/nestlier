import React from 'react';
import {
  Typography,
  Paper,
} from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import { getContent } from './getContent';

const Content = ({ name, location }) => {

  const [contentValue, setContentValue] = React.useState('');

  React.useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const x = await getContent(name, location);
    setContentValue(x.value);
  }

  return (
    <Paper style={{ maxWidth: 1200, margin: 'auto', padding: 20 }}>
      <Typography variant="h3" >{name}</Typography>
      <Typography>
        <ReactMarkdown source={contentValue} />
      </Typography>
    </Paper>
  );
}

export default Content;
