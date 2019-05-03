import React, { useCallback } from 'react';
import { Grid } from '@material-ui/core';
import { HouseholdEntity } from '.';

export const HouseholdPerson = ({ index, household, entity }) => {
  const handleRemove = useCallback(
    () => household.removeEntity('people', entity),
    [household, entity]
  );

  return (
    <HouseholdEntity
      entity={entity}
      index={index}
      source="people"
      onRemove={handleRemove}
    >
      <Grid container spacing={1}>
        {entity.displayName}
      </Grid>
    </HouseholdEntity>
  );
};
