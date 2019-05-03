import PropTypes from 'prop-types';
import React from 'react';

import { Button } from '@material-ui/core';

export const ActionButton = ({
  children,
  className,
  disabled,
  onClick: handleClick,
}) => (
  <Button
    className={className}
    color="primary"
    variant="outlined"
    disabled={disabled}
    onClick={handleClick}
  >
    {children}
  </Button>
);
ActionButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};
