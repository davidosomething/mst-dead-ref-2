import { isString } from 'lodash';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
  Typography,
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  expansionPanel: {
    margin: theme.spacing(0, 0, 2),
  },
  expansionPanelSummaryContent: {
    alignItems: 'center',
  },
  expansionPanelActions: {
    margin: theme.spacing(1),
  },
  avatar: {
    flex: '0 0 auto',
    marginRight: 16,
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  details: {
    alignItems: 'center',
  },
}));

export const CollapsibleDeletable = ({
  avatar,
  children,
  defaultExpanded = true,
  title,
  onDelete: handleDelete,
}) => {
  const classes = useStyles();
  return (
    <ExpansionPanel
      defaultExpanded={defaultExpanded}
      className={classes.expansionPanel}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        classes={{ content: classes.expansionPanelSummaryContent }}
      >
        {avatar && <div className={classes.avatar}>{avatar}</div>}
        {isString(title) ? (
          <Typography variant="subtitle1">{title}</Typography>
        ) : (
          title
        )}
      </ExpansionPanelSummary>
      {children && (
        <ExpansionPanelDetails className={classes.details}>
          {children}
        </ExpansionPanelDetails>
      )}
      <ExpansionPanelActions className={classes.expansionPanelActions}>
        <Button color="secondary" size="small" onClick={handleDelete}>
          Delete
          <DeleteIcon className={classes.rightIcon} />
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
};
