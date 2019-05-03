import React, { Fragment, useContext } from 'react';
import useDocumentTitle from '@rehooks/document-title';
import { EntityContext } from '../contexts';
import { Avatar } from '@material-ui/core';
import { People as PeopleIcon } from '@material-ui/icons';
import { PageBuilder } from '../components/PageBuilder';
import { PageHeading } from '../components/PageHeading';
import { HouseholdEntities } from '../components/Household';

export const HouseholdPage = () => {
  const { entity } = useContext(EntityContext);

  useDocumentTitle(`${entity.name}`);

  return (
    <Fragment>
      <PageHeading
        avatar={
          <Avatar>
            <PeopleIcon />
          </Avatar>
        }
        title="Household"
      />
      <PageBuilder>{[[<HouseholdEntities household={entity} />]]}</PageBuilder>
    </Fragment>
  );
};
