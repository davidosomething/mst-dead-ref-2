import clsx from 'clsx';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles({
  male: {
    backgroundColor: deepOrange[100],
  },
  female: {
    backgroundColor: deepPurple[100],
  },
});

export const EntityAvatar = observer(
  ({ className, entity, AvatarProps, ...props }) => {
    const classes = useStyles();

    const contents = entity.avatar ? (
      <entity.avatar {...AvatarProps} />
    ) : entity.name ? (
      entity.name[0]
    ) : (
      '?'
    );

    return (
      <Avatar
        className={clsx(
          entity.sex === 'MALE' && classes.male,
          entity.sex === 'FEMALE' && classes.female,
          className
        )}
        {...props}
      >
        {contents}
      </Avatar>
    );
  }
);
EntityAvatar.propTypes = {
  className: PropTypes.string,
  entity: PropTypes.object.isRequired,
};
