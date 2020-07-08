import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Typography,
} from '@material-ui/core';

export default ({name, value}) => {
  return (
    <>
      <Typography variant="h3" >{name}</Typography>
      <Typography>
        <ReactMarkdown source={value} />
      </Typography>
    </>
  )
}