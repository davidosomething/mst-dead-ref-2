import pify from 'pify';
import React, { Fragment, useCallback, useContext, useState } from 'react';
import { useRoute } from 'react-router5';
import { AppContext, EntityContext } from '../../contexts';
import { observer } from 'mobx-react-lite';
import { ListItemIcon, Menu, MenuItem, Typography } from '@material-ui/core';
import {
  Delete as DeleteIcon,
  FileCopy as CopyIcon,
  Replay as ResetIcon,
} from '@material-ui/icons';
import { MoreButton } from '../Buttons';

const AppMenuItem = React.forwardRef(
  ({ Icon, text, onClick: handleClick }, ref) => (
    <MenuItem ref={ref} onClick={handleClick}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <Typography variant="inherit" noWrap>
        {text}
      </Typography>
    </MenuItem>
  )
);

const MenuItemSaveAs = React.forwardRef(({ onClick: handleClick }, ref) => (
  <AppMenuItem
    ref={ref}
    Icon={CopyIcon}
    text="Save draft as new entity"
    onClick={handleClick}
  />
));

const MenuItemResetEntity = React.forwardRef(
  ({ onClick: handleClick }, ref) => (
    <AppMenuItem
      ref={ref}
      Icon={ResetIcon}
      text="Reset this entity"
      onClick={handleClick}
    />
  )
);

const MenuItemDeleteEntity = React.forwardRef(
  ({ onClick: handleClick }, ref) => (
    <AppMenuItem
      ref={ref}
      Icon={DeleteIcon}
      text="Delete this entity"
      onClick={handleClick}
    />
  )
);

export const AppEntityMenu = observer(() => {
  const { route, router } = useRoute();
  const { snacks } = useContext(AppContext);
  const { entity, deleteEntity } = useContext(EntityContext);

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMenuClose = useCallback((e) => setMenuAnchorEl(null), []);

  const handleMenuOpen = useCallback(
    (e) => setMenuAnchorEl(e.currentTarget),
    []
  );

  const handleSaveAs = useCallback(() => {
    setMenuAnchorEl(null);
    const copy = entity.copy();
    router.navigate(route.name, { id: copy.id });
  }, [router, route, entity]);

  const handleResetEntity = useCallback(() => {
    setMenuAnchorEl(null);
    console.log('TODO');
  }, []);

  const handleDeleteEntity = useCallback(() => {
    setMenuAnchorEl(null);
    const entityName = `${entity.name}`;
    pify(router.navigate)('home')
      .then(deleteEntity(entity))
      .then(() => snacks.add(`Deleted "${entityName}"`));
  }, [router, snacks, entity, deleteEntity]);

  return entity ? (
    <Fragment>
      <MoreButton
        color="inherit"
        aria-label="Menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
      />
      <Menu
        open={Boolean(menuAnchorEl)}
        anchorEl={menuAnchorEl}
        MenuListProps={{ dense: true }}
        onClose={handleMenuClose}
      >
        {entity ? <MenuItemSaveAs onClick={handleSaveAs} /> : null}
        {entity ? <MenuItemResetEntity onClick={handleResetEntity} /> : null}
        {entity ? <MenuItemDeleteEntity onClick={handleDeleteEntity} /> : null}
      </Menu>
    </Fragment>
  ) : null;
});
