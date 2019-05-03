import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { useAppStyles } from '../../styles/AppStyles';
import { Paper, Typography } from '@material-ui/core';

export const ContentBox = ({
  className,
  Icon,
  title,
  headerActions,
  children,
}) => {
  const classes = useAppStyles();
  return (
    <Paper className={clsx(classes.contentBox, className)}>
      <Typography
        className={clsx(
          classes.contentBoxHeader,
          !children && classes.contentBoxHeaderOnly
        )}
        component="header"
        noWrap
        variant="subtitle1"
      >
        {Icon && <Icon className={classes.contentBoxHeaderIcon} />}
        {title && <div className={classes.contentBoxHeaderTitle}>{title}</div>}
        {headerActions && (
          <div className={classes.contentBoxHeaderActions}>{headerActions}</div>
        )}
      </Typography>
      {children && <div className={classes.contentBoxContent}>{children}</div>}
    </Paper>
  );
};
ContentBox.propTypes = {
  className: PropTypes.string,
  Icon: PropTypes.object,
  title: PropTypes.node,
  headerActions: PropTypes.node,
  children: PropTypes.node,
};
