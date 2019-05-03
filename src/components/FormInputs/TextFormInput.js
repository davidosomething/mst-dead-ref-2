import React from 'react';
import { observer } from 'mobx-react-lite';

import { TextField } from '@material-ui/core';

export const TextFormInput = observer(
  ({ label, data, dataKey, onChange: handleChange }) => (
    <TextField
      label={label}
      margin="dense"
      variant="outlined"
      value={data[dataKey]}
      onChange={handleChange}
      InputLabelProps={{ shrink: true }}
    />
  )
);
