import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useContext, useState } from 'react';
import { useRouter } from 'react-router5';
import { makeStyles } from '@material-ui/core/styles';
import { EntityContext } from '../../contexts';
import { observer } from 'mobx-react-lite';
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon,
  RemoveCircleOutline as RemoveIcon,
} from '@material-ui/icons';
import { DraggableComponent } from '../Draggables';
import { EntityAvatar } from '../Entity';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(1),
  },
  avatar: {
    cursor: 'pointer',
  },
  title: {
    cursor: 'pointer',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: theme.spacing(1),
  },
  removeButtonIcon: {
    marginLeft: theme.spacing(1),
  },
}));

export const HouseholdEntity = observer(({
  children,
  entity,
  index,
  source,
  subheader,
  onRemove: handleRemove,
}) => {
  const router = useRouter();
  const { entity: household } = useContext(EntityContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const classes = useStyles();

  const draggableId = `${household.droppableId}#${source}#${entity.id}`;

  const handleClick = useCallback(
    () => router.navigate(source, { id: entity.id }),
    [router, source, entity.id]
  );

  const handleExpandClick = useCallback(() => setIsExpanded(!isExpanded), [
    isExpanded,
  ]);

  return (
    <Card
      className={classes.card}
      component={DraggableComponent}
      draggableProps={{
        index,
        draggableId,
      }}
    >
      <CardHeader
        avatar={
          <EntityAvatar
            className={classes.avatar}
            entity={entity}
            onClick={handleClick}
          />
        }
        action={
          <Fragment>
            <IconButton onClick={handleRemove}>
              <RemoveIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, isExpanded && classes.expandOpen)}
              aria-expanded={isExpanded}
              aria-label="Show details"
              onClick={handleExpandClick}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Fragment>
        }
        title={
          <span className={classes.title} onClick={handleClick}>
            {entity.name}
          </span>
        }
        subheader={subheader}
      />
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent>{children}</CardContent>
      </Collapse>
    </Card>
  );
});
HouseholdEntity.propTypes = {
  entity: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired, // draggable
  source: PropTypes.string.isRequired,
  subheader: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onRemove: PropTypes.func,
};
