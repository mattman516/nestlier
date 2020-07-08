import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import {
  Typography,
} from '@material-ui/core';

export default ({name, value}) => {
  return (
    <>
      <Typography variant="h3" >{name}</Typography>
      <Typography>
        <ReactMarkdown
          source={value} 
          escapeHtml={false}
        />
      </Typography>
    </>
  )
}