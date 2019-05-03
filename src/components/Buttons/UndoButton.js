import React from 'react';
import { IconButton } from '@material-ui/core';
import { Undo as UndoIcon } from '@material-ui/icons';
import { useAppStyles } from '../../styles';

export const UndoButton = () => {
  const classes = useAppStyles();
  return (
    <IconButton color="inherit" className={classes.toolbarButton}>
      <UndoIcon />
    </IconButton>
  );
};
