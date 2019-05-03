import { isFunction } from 'lodash';

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  gridMain: {
    flexGrow: 1,
  },
  gridLeft: {
    flexGrow: 1,
  },
  gridRight: {
    flexGrow: 1,
  },
});

export const TwoPaneLayout = ({ left, right }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={3}
      className={classes.gridMain}
    >
      <Grid item xs={12} md={6}>
        {isFunction(left) ? left() : left}
      </Grid>
      <Grid item xs={12} md={6}>
        {isFunction(right) ? right() : right}
      </Grid>
    </Grid>
  );
};
