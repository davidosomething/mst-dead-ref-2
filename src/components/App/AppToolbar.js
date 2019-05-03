import clsx from 'clsx';
import React, { useCallback, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { useAppStyles } from '../../styles';
import { EntityContext } from '../../contexts';
import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core';
import { Menu as MenuIcon, Save as SaveIcon } from '@material-ui/icons';
import { AppEntityMenu } from '.';

const SaveButton = observer(() => {
  const { entity } = useContext(EntityContext);

  const classes = useAppStyles();

  const handleSave = useCallback(() => {
    entity.saveDraft();
  }, [entity]);

  return (
    (entity && entity.isDraft && (
      <Button
        variant="contained"
        size="small"
        className={classes.toolbarButton}
        onClick={handleSave}
      >
        <SaveIcon
          className={clsx(classes.toolbarLeftIcon, classes.toolbarIconSmall)}
        />
        Save
      </Button>
    )) ||
    null
  );
});

export const AppToolbar = ({ isOpen, onToggleDrawer: handleToggleDrawer }) => {
  const classes = useAppStyles();

  return (
    <AppBar className={clsx(classes.toolbar, isOpen && classes.toolbarOpen)}>
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="Open drawer"
          onClick={handleToggleDrawer}
          className={clsx(
            classes.toobarMenuButton,
            isOpen && classes.toolbarMenuButtonHidden
          )}
        >
          <MenuIcon />
        </IconButton>
        <SaveButton />
        <div className={classes.toolbarSpacer} />
        <AppEntityMenu />
      </Toolbar>
    </AppBar>
  );
};
