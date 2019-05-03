import React from 'react';

import { IconButton } from '@material-ui/core';
import { ChevronLeft as ChevronLeftIcon } from '@material-ui/icons';

import {
  AppDataButton,
  AppHomeButton,
  AppSyncButton,
} from '.';

import { useAppStyles } from '../../styles';

const CollapseDrawerButton = ({ classes, onClick: handleClick }) => (
  <IconButton size="small" onClick={handleClick}>
    <ChevronLeftIcon />
  </IconButton>
);

export const AppDrawerToolbar = ({ onToggleDrawer: handleToggleDrawer }) => {
  const classes = useAppStyles();
  return (
    <div className={classes.drawerToolbar}>
      <AppHomeButton size="small" />
      <AppDataButton size="small" />
      <AppSyncButton size="small" />
      <div className={classes.toolbarSpacer} />
      <CollapseDrawerButton classes={classes} onClick={handleToggleDrawer} />
    </div>
  );
};
