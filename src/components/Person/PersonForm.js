import { formInputHandler } from '../../lib/formInputHandler';
import React, { useCallback, useContext } from 'react';
import { EntityContext } from '../../contexts';
import { Grid } from '@material-ui/core';
import { AssignmentInd as HeaderIcon } from '@material-ui/icons';
import { ContentBox } from '../../components/ContentBox';
import { TextFormInput } from '../../components/FormInputs';

export const PersonForm = () => {
  const { entity: person } = useContext(EntityContext);

  const handleChange = useCallback(
    (key, options) =>
      formInputHandler((value) => person.setValue(key, value), options),
    [person]
  );

  return (
    <ContentBox Icon={HeaderIcon} title="Details">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container direction="row" spacing={1}>
            <Grid item>
              <TextFormInput
                label="First Name"
                data={person}
                dataKey="firstName"
                onChange={handleChange('firstName')}
              />
            </Grid>
            <Grid item>
              <TextFormInput
                label="Middle Name"
                data={person}
                dataKey="middleName"
                onChange={handleChange('middleName')}
              />
            </Grid>
            <Grid item>
              <TextFormInput
                label="Last Name"
                data={person}
                dataKey="lastName"
                onChange={handleChange('lastName')}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ContentBox>
  );
};
