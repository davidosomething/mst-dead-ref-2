import { format as formatDate } from 'date-fns';
import { get, noop } from 'lodash';

import PropTypes from 'prop-types';
import React from 'react';
import { observer } from 'mobx-react-lite';

import { TextField } from '@material-ui/core';

export const DateFormInput = observer(
  ({ data, dataKey, label, onChange: handleChange }) => {
    const getValue = () => {
      const d = get(data, dataKey);
      return d
        ? formatDate(d, 'YYYY-MM-DD', { awareOfUnicodeTokens: true })
        : '';
    };

    return (
      <TextField
        type="date"
        label={label}
        margin="dense"
        variant="outlined"
        value={getValue()}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />
    );
  }
);
DateFormInput.displayName = 'ObservedDateFormInput';
DateFormInput.propTypes = {
  label: PropTypes.string,
  data: PropTypes.object,
  dataKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
DateFormInput.defaultProps = {
  onChange: noop,
};
