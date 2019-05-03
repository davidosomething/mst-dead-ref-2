import React from 'react';
import { observer } from 'mobx-react-lite';

import { TextField } from '@material-ui/core';

export const DisplayName = observer(
  ({ label = 'Display Name', value, onChange: handleChange }) => (
    <TextField
      fullWidth
      label={label}
      margin="dense"
      variant="outlined"
      value={value}
      onChange={handleChange}
      InputLabelProps={{ shrink: true }}
    />
  )
);
DisplayName.displayName = 'ObservedDisplayName';
