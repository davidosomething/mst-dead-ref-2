import clsx from 'clsx';
import React, { useCallback } from 'react';
import { useRouter } from 'react-router5';
import { useAppStyles } from '../../styles';
import { IconButton, Tooltip } from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';

export const AppHomeButton = (props) => {
  const router = useRouter();

  const classes = useAppStyles();

  const handleClick = useCallback(() => {
    router.navigate('home');
  }, [router]);

  return (
    <Tooltip title="Home">
      <IconButton
        color="inherit"
        className={clsx(classes.toolbarButton, classes.toolbarIconButton)}
        onClick={handleClick}
        {...props}
      >
        <HomeIcon className={classes.toolbarIconSmall} />
      </IconButton>
    </Tooltip>
  );
};
