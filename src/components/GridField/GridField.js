import { isString } from 'lodash';

import React from 'react';

import { Grid, InputAdornment, Typography } from '@material-ui/core';

import { DateFormInput, NumberFormInput } from '../FormInputs';
import { EnumerableSelect, MoneyFormControl } from '../FormControls';

const GridFieldTitle = ({ title }) => (
  <Grid item xs={6}>
    {isString(title) ? <Typography>{title}</Typography> : title}
  </Grid>
);

export const GridField = ({ title, children }) => {
  return (
    <Grid
      item
      xs={12}
      container
      direction="row"
      alignItems="center"
      spacing={1}
    >
      {title && <GridFieldTitle title={title} />}
      <Grid item xs={title ? 6 : 12}>
        {children}
      </Grid>
    </Grid>
  );
};

export const GridFieldMoney = ({ title, ...MoneyFormControlProps }) => (
  <GridField title={title}>
    <MoneyFormControl {...MoneyFormControlProps} />
  </GridField>
);

export const GridFieldDate = ({ title, ...DateFormInputProps }) => (
  <GridField title={title}>
    <DateFormInput {...DateFormInputProps} />
  </GridField>
);

export const GridFieldNumber = ({ title, ...NumberFormInputProps }) => (
  <GridField title={title}>
    <NumberFormInput {...NumberFormInputProps} />
  </GridField>
);

export const GridFieldPercent = ({ title, ...NumberFormInputProps }) => (
  <GridField title={title}>
    <NumberFormInput
      {...NumberFormInputProps}
      InputProps={{
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
        ...NumberFormInputProps.TextFieldInputProps,
      }}
    />
  </GridField>
);

export const GridFieldSelect = ({ title, ...EnumerableSelectProps }) => (
  <GridField title={title}>
    <EnumerableSelect {...EnumerableSelectProps} />
  </GridField>
);
