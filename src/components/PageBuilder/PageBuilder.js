import { map } from 'lodash';
import React, { Fragment } from 'react';
import { TwoPaneLayout } from '../TwoPaneLayout';

export const PageBuilder = ({ children }) =>
  map(children, (row, index) =>
    row.length === 2 ? (
      <TwoPaneLayout key={index} left={row[0]} right={row[1]} />
    ) : (
      <Fragment key={index}>{row[0]}</Fragment>
    )
  );
