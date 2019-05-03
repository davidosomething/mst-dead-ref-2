import PropTypes from 'prop-types';
import React from 'react';

import { Button } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

export const AddButton = ({
  classes,
  onClick: handleClick
}) => (
  <Button
    color="primary"
    size="small"
    className={classes.addButton}
    onClick={handleClick}
  >
    <AddIcon className={classes.leftIcon} />
    Add
  </Button>
);
AddButton.propTypes = {
  classes: PropTypes.object,
  onClick: PropTypes.func
};
