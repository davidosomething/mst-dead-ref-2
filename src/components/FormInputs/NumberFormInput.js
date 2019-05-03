import BigNumber from 'bignumber.js';
import { get, noop } from 'lodash';

import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import NumberFormat from 'react-number-format';

import { TextField } from '@material-ui/core';

const NumberFormatComponent = ({
  inputRef,
  onChange: handleChange,
  ...props
}) => {
  const handleValueChange = useCallback(({ value }) => {
    handleChange({ target: { value } });
  }, [handleChange]);
  return (
    <NumberFormat
      {...props}
      getInputRef={inputRef}
      onValueChange={handleValueChange}
    />
  );
};
NumberFormatComponent.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
NumberFormatComponent.defaultProps = {
  onChange: noop,
};

export const NumberFormInput = observer(
  ({
    data,
    dataKey,
    label,
    onChange: handleChange,
    NumberFormatProps,
    TextFieldProps,
    TextFieldInputProps,
  }) => {
    const observed = new BigNumber(get(data, dataKey, 0) || 0);
    const value = observed.toString();

    return (
      <TextField
        label={label}
        margin="dense"
        variant="outlined"
        value={value}
        InputProps={{
          inputComponent: NumberFormatComponent,
          inputProps: NumberFormatProps,
          onChange: handleChange,
          ...TextFieldInputProps,
        }}
        InputLabelProps={{ shrink: true }}
        {...TextFieldProps}
      />
    );
  }
);
NumberFormInput.propTypes = {
  data: PropTypes.object,
  dataKey: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  TextFieldProps: PropTypes.object,
  TextFieldInputProps: PropTypes.object,
  NumberFormatProps: PropTypes.object,
};
NumberFormInput.defaultProps = {
  onChange: noop,
};
