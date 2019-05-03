import React, { useCallback, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

const useStyles = makeStyles({
  details: {
    alignItems: 'center',
  },
  expansionPanel: {
    width: '100%',
  },
});

export const TableExpansionPanel = ({ children, title }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const classes = useStyles();

  const handleChange = useCallback(() => setIsExpanded(!isExpanded), [
    isExpanded,
  ]);

  return (
    <ExpansionPanel className={classes.expansionPanel} onChange={handleChange}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1">{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        {isExpanded && children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
