import React from 'react';

import { IconButton } from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';

export const MoreButton = (props) => (
  <IconButton {...props}>
    <MoreVertIcon />
  </IconButton>
);
