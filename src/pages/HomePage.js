import { merge } from 'lodash';
import React, { useCallback, useContext, useState } from 'react';
import useDocumentTitle from '@rehooks/document-title';
import { useAppStyles } from '../styles';
import { AppContext } from '../contexts';
import { Typography } from '@material-ui/core';
import { CloudUpload as CloudUploadIcon } from '@material-ui/icons';
import { ActionButton } from '../components/Buttons';

export const HomePage = () => {
  const [isImporting, setIsImporting] = useState(false);
  const { root } = useContext(AppContext);

  const classes = useAppStyles();

  const handleImport = useCallback(() => {
    if (isImporting) {
      return;
    }
    setIsImporting(true);
    window
      .fetch('/export.json')
      .then((response) => response.json())
      .then((data) => {
        const current = root.toJSON();
        root.load(merge({}, current, data));
      });
  }, [root, isImporting]);

  useDocumentTitle('Home');

  return (
    <div>
      <Typography variant="h4">Select an item</Typography>
      <ActionButton
        className={classes.leftButton}
        disabled={isImporting}
        onClick={handleImport}
      >
        <CloudUploadIcon className={classes.leftIcon} />
        Import test data
      </ActionButton>
    </div>
  );
};
