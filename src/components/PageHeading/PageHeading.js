import { formInputHandler } from '../../lib/formInputHandler';
import PropTypes from 'prop-types';
import React, { useCallback, useContext } from 'react';
import { useAppStyles } from '../../styles';
import { EntityContext } from '../../contexts';
import { Observer } from 'mobx-react-lite';
import { Card, CardHeader } from '@material-ui/core';
import { DisplayName } from '../../components/FormControls';

export const PageHeading = ({ title, avatar }) => {
  const { entity } = useContext(EntityContext);
  const classes = useAppStyles();

  /**
   * @return {function}
   */
  const handleChange = useCallback(
    (key) => formInputHandler((value) => entity.setValue(key, value)),
    [entity]
  );

  return (
    <Card className={classes.pageHeader}>
      <CardHeader
        avatar={avatar}
        title={
          <Observer>
            {() => (
              <DisplayName
                label={`${title} Display Name`}
                value={entity.displayName}
                onChange={handleChange('displayName')}
              />
            )}
          </Observer>
        }
      />
    </Card>
  );
};
PageHeading.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string.isRequired,
  avatar: PropTypes.element.isRequired,
};
