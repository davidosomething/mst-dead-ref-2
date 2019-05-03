import { map } from 'lodash';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useContext, useMemo } from 'react';
import { useRoute, useRouter } from 'react-router5';
import { useAppStyles } from '../../styles';
import { Observer, observer } from 'mobx-react-lite';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { AppContext } from '../../contexts';
import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { EntityAvatar } from '../Entity';

const EmptyState = () => (
  <ListItem disabled>
    <Typography>No entries.</Typography>
  </ListItem>
);

const AppDrawerListItem = observer(({ entity, source, draggableProps }) => {
  const { router, route } = useRoute();

  const classes = useAppStyles();

  const isSelected = useMemo(
    () => route && route.name === source && route.params.id === entity.id,
    [route, entity, source]
  );

  const handleClick = useCallback(() => {
    if (isSelected) {
      return;
    }
    router.navigate(source, { id: entity.id });
  }, [router, source, entity, isSelected]);

  // observed
  const text = entity.displayName || <em>no name</em>;

  return (
    <Draggable {...draggableProps}>
      {(provided, snapshot) => (
        <Fragment>
          <ListItem
            className={classes.drawerListItem}
            ref={provided.innerRef}
            button
            component="li"
            selected={isSelected}
            onClick={handleClick}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <ListItemAvatar>
              <EntityAvatar
                className={classes.drawerListItemAvatar}
                entity={entity}
                AvatarProps={{ fontSize: 'small' }}
              />
            </ListItemAvatar>
            <Observer>
              {() => (
                <ListItemText
                  className={classes.drawerListText}
                  primary={text}
                />
              )}
            </Observer>
          </ListItem>
          {/*
          Clone the list item to make it seem like we're copying and not
          moving the item out of the drawer.
          @see {@link https://github.com/atlassian/react-beautiful-dnd/issues/68}
          */}
          {snapshot.isDragging && (
            <ListItem
              className={clsx(
                classes.drawerListItem,
                classes.drawerListItemClone
              )}
              component="li"
              selected={isSelected}
            >
              <ListItemAvatar>
                <EntityAvatar
                  className={classes.drawerListItemAvatar}
                  entity={entity}
                />
              </ListItemAvatar>
              <Observer>
                {() => (
                  <ListItemText
                    className={classes.drawerListText}
                    primary={text}
                  />
                )}
              </Observer>
            </ListItem>
          )}
        </Fragment>
      )}
    </Draggable>
  );
});
AppDrawerListItem.propTypes = {
  entity: PropTypes.object.isRequired,
};

/**
 * Because this is an observer, it implements an sCU so will not unnecessarily
 * re-render despite being in a Droppable
 */
const Entities = observer(({ source, entities }) =>
  map([...entities.values()], (entity, index) => (
    <AppDrawerListItem
      key={entity.id}
      entity={entity}
      source={source}
      draggableProps={{
        disableInteractiveElementBlocking: true,
        draggableId: `${source}#${entity.id}`,
        index,
      }}
    />
  ))
);

const AppDrawerListHeader = ({ children, onAddClick: handleAddClick }) => {
  const classes = useAppStyles();
  return (
    <ListSubheader className={classes.drawerListSubheader}>
      <div className={classes.drawerListSubheaderContent}>{children}</div>
      <span>
        <IconButton size="small" edge="end" onClick={handleAddClick}>
          <AddIcon />
        </IconButton>
      </span>
    </ListSubheader>
  );
};

export const AppDrawerList = ({ Icon, source, title }) => {
  const router = useRouter();
  const { root } = useContext(AppContext);
  const classes = useAppStyles();

  /**
   * @param {string} source 'household'
   */
  const handleAddEntity = useCallback(() => {
    const entity = root.addEntity(source);
    router.navigate(source, { id: entity.id });
  }, [source, root, router]);

  const entities = root[source];

  return (
    <Droppable
      droppableId={`#appDrawer.${source}`}
      isDropDisabled={true}
      type={source}
    >
      {(provided) => (
        <List
          className={classes.drawerEntityList}
          subheader={
            <AppDrawerListHeader onAddClick={handleAddEntity}>
              <ListItemIcon>
                <Icon className={classes.drawerListSubheaderIcon} />
              </ListItemIcon>
              <ListItemText>{title}</ListItemText>
            </AppDrawerListHeader>
          }
          dense
          ref={provided.innerRef}
        >
          <Observer>{() => entities.size === 0 && <EmptyState />}</Observer>
          <Entities source={source} entities={entities} />
          {
            /* render this to silence react-beautiful-dnd's warning. It is
             * hidden with css since we're using clones */
            provided.placeholder
          }
        </List>
      )}
    </Droppable>
  );
};
AppDrawerList.propTypes = {
  Icon: PropTypes.object.isRequired,
  source: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
