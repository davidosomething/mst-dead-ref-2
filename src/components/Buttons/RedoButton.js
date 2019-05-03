import React from 'react';
import { IconButton } from '@material-ui/core';
import { Redo as RedoIcon } from '@material-ui/icons';
import { useAppStyles } from '../../styles';

export const RedoButton = () => {
  const classes = useAppStyles();
  return (
    <IconButton color="inherit" className={classes.toolbarButton}>
      <RedoIcon />
    </IconButton>
  );
};
