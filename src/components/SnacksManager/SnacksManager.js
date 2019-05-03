import { map } from 'lodash';
import React, { Fragment, useCallback, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { IconButton, Snackbar } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { AppContext } from '../../contexts';

const AUTOHIDE_IN_MS = 5000;

export const SnacksManager = observer(() => {
  const { snacks } = useContext(AppContext);

  const makeHandleClose = useCallback(
    (data) => () => {
      snacks.remove(data);
    },
    [snacks]
  );

  return snacks.size === 0
    ? null
    : map([...snacks.items.entries()], ([data, timestamp]) => {
        const handleClose = makeHandleClose(data);
        const message = data.message || data;
        const timeout = data.timeout || AUTOHIDE_IN_MS;
        const actions = data.actions || null;
        return (
          <Snackbar
            key={timestamp}
            autoHideDuration={timeout}
            open={true}
            message={message}
            onClose={handleClose}
            action={
              <Fragment>
                {actions}
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              </Fragment>
            }
          />
        );
      });
});
