import React from 'react';
import {
  Paper,
} from '@material-ui/core';
import { getContent } from './getContent';
import ContentComponent from '../../components/Content';

const Content = ({ name, location }) => {

  const [contentValue, setContentValue] = React.useState('');

  React.useEffect(() => {

    const fetch = async () => {
      const x = await getContent(name, location);
      setContentValue(x.value);
    }

    fetch();
  }, [name, location]);

  return (
    <Paper style={{ maxWidth: 1200, margin: 'auto', padding: 20, marginTop: 20 }}>
      <ContentComponent name={name} value={contentValue} />
    </Paper>
  );
}

export default Content;
