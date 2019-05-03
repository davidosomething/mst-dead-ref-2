import localforage from 'localforage';
import clsx from 'clsx';
import React, { useCallback, useContext } from 'react';

import { IconButton, Tooltip } from '@material-ui/core';
import { Sync as SyncIcon } from '@material-ui/icons';

import { AppContext } from '../../contexts';

import { useAppStyles } from '../../styles';

export const AppSyncButton = (props) => {
  const { root, snacks } = useContext(AppContext);

  const classes = useAppStyles();

  const handleClick = useCallback(() => {
    localforage.setItem('root', root.toJSON());
    snacks.add('Synced with local storage');
  }, [root, snacks]);

  return (
    <Tooltip title="Sync with browser storage">
      <IconButton
        className={clsx(classes.toolbarButton, classes.toolbarIconButton)}
        color="inherit"
        onClick={handleClick}
        {...props}
      >
        <SyncIcon className={classes.toolbarIconSmall} />
      </IconButton>
    </Tooltip>
  );
};
