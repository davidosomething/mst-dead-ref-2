import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import { observer } from 'mobx-react-lite';
import { Droppable } from 'react-beautiful-dnd';
import { ContentBox } from '../ContentBox';

const useStyles = makeStyles((theme) => ({
  householdEntityIterator: {
    marginBottom: theme.spacing(3),
  },
  header: {
    marginBottom: theme.spacing(1),
  },
  empty: {
    border: `2px ${theme.palette.grey[300]} dashed`,
    height: theme.spacing(6),
    margin: theme.spacing(1),
  },
  targeted: {
    backgroundColor: blueGrey[100],
  },
}));

export const HouseholdEntityIterator = observer(
  ({ household, children, source, title }) => {
    const classes = useStyles();
    const size = household[source].length;
    return (
      <div className={classes.householdEntityIterator}>
        <ContentBox className={classes.header} title={`${title} (${size})`} />
        <Droppable
          droppableId={`${household.droppableId}#${source}`}
          type={source}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              className={clsx(
                classes.droppable,
                size === 0 && classes.empty,
                snapshot.isDraggingOver && classes.targeted
              )}
              {...provided.droppableProps}
            >
              {children}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
);
