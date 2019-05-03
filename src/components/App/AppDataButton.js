import clsx from 'clsx';
import React, { Fragment, useCallback, useState } from 'react';

import { Dialog, IconButton, Tooltip } from '@material-ui/core';
import { ImportExport as ImportExportIcon } from '@material-ui/icons';

import { ImportExportDialog } from '../ImportExportDialog';

import { useAppStyles } from '../../styles';

export const AppDataButton = (props) => {
  const [isImportExportOpen, setIsImportExportOpen] = useState(false);

  const classes = useAppStyles();

  const handleImportDialogOpen = useCallback(() => {
    setIsImportExportOpen(true);
  }, []);
  const handleImportDialogClose = useCallback(
    () => setIsImportExportOpen(false),
    []
  );

  // disableRestoreFocus since the dialog's modal tries to restore focus to
  // the tooltip or other components after closing, leaving them in a stuck
  // hover state
  return (
    <Fragment>
      <Tooltip title="JSON import/export" disableFocusListener>
        <IconButton
          color="inherit"
          className={clsx(classes.toolbarButton, classes.toolbarIconButton)}
          onClick={handleImportDialogOpen}
          {...props}
        >
          <ImportExportIcon className={classes.toolbarIconSmall} />
        </IconButton>
      </Tooltip>
      <Dialog
        disableRestoreFocus
        maxWidth="lg"
        open={isImportExportOpen}
        scroll="paper"
        onClose={handleImportDialogClose}
      >
        <ImportExportDialog onClose={handleImportDialogClose} />
      </Dialog>
    </Fragment>
  );
};
