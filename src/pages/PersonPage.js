import React, { Fragment, useContext } from 'react';
import useDocumentTitle from '@rehooks/document-title';
import { EntityContext } from '../contexts';
import { Avatar } from '@material-ui/core';
import { Face as FaceIcon } from '@material-ui/icons';
import { PageBuilder } from '../components/PageBuilder';
import { PageHeading } from '../components/PageHeading';
import { PersonForm } from '../components/Person';

export const PersonPage = () => {
  const { entity } = useContext(EntityContext);

  useDocumentTitle(`${entity.name}`);

  return (
    <Fragment>
      <PageHeading
        avatar={
          <Avatar>
            <FaceIcon />
          </Avatar>
        }
        title="Person"
      />
      <PageBuilder>{[[<PersonForm />]]}</PageBuilder>
    </Fragment>
  );
};
