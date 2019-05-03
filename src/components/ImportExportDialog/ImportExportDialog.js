import { debounce } from 'lodash';
import { Root } from '../../models';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useRoute } from 'react-router5';
import { AppContext } from '../../contexts';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import {
  CloudUpload as CloudUploadIcon,
  SaveAlt as SaveAltIcon,
} from '@material-ui/icons';
import { ActionButton } from '../Buttons';

const useStyles = makeStyles((theme) => ({
  textArea: {
    fontFamily: 'monospace',
    minWidth: '75vw',
    whiteSpace: 'pre',
  },
  leftActions: {
    flexGrow: 1,
    margin: theme.spacing(0, 1, 1),
  },
  leftButton: {
    marginRight: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  spinner: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

const ImportExportContext = React.createContext();

const JsonTextArea = () => {
  const { isValid, jsonString, setIsBusy, setIsValid } = useContext(
    ImportExportContext
  );

  const classes = useStyles();

  const debouncedValidate = useCallback(
    debounce((value) => {
      setIsBusy(true);
      try {
        Root.create(JSON.parse(value));
        setIsValid(true);
      } catch (error) {
        setIsValid(false);
      } finally {
        setIsBusy(false);
      }
    }),
    [setIsBusy, setIsValid]
  );

  const handleChange = useCallback(
    (e) => {
      const value = e.target.value;
      debouncedValidate(value);
    },
    [debouncedValidate]
  );

  useEffect(() => {
    return function cleanup() {
      debouncedValidate.cancel();
    };
  }, [debouncedValidate]);

  return (
    <TextField
      label="JSON"
      helperText="This field can be used to import/export data. Enter JSON to import. Duplicate ids will be overwritten"
      variant="outlined"
      fullWidth
      margin="dense"
      multiline
      placeholder="JSON"
      rows={12}
      defaultValue={jsonString}
      error={!isValid}
      inputProps={{
        className: classes.textArea,
      }}
      InputLabelProps={{ shrink: true }}
      onChange={handleChange}
    />
  );
};

const Content = () => {
  const { root } = useContext(AppContext);
  const {
    isInitialized,
    setIsBusy,
    setIsInitialized,
    setJsonString,
  } = useContext(ImportExportContext);

  const classes = useStyles();

  useEffect(() => {
    setJsonString(JSON.stringify(root.toJSON(), undefined, 2));
    setIsInitialized(true);
    setIsBusy(false);
  }, [root, setIsBusy, setIsInitialized, setJsonString]);

  return (
    <DialogContent>
      {isInitialized ? (
        <JsonTextArea />
      ) : (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      )}
    </DialogContent>
  );
};

const Actions = ({
  onImport: handleImport,
  onExport: handleExport,
  onCancel: handleCancel,
}) => {
  const { isBusy, isValid } = useContext(ImportExportContext);
  const classes = useStyles();
  return (
    <DialogActions>
      <div className={classes.leftActions}>
        <ActionButton
          className={classes.leftButton}
          disabled={isBusy || !isValid}
          onClick={handleImport}
        >
          <CloudUploadIcon className={classes.leftIcon} />
          Import
        </ActionButton>
        <ActionButton
          className={classes.leftButton}
          disabled={isBusy || !isValid}
          onClick={handleExport}
        >
          <SaveAltIcon className={classes.leftIcon} />
          Download as JSON file
        </ActionButton>
      </div>
      <Button onClick={handleCancel} color="secondary">
        Cancel
      </Button>
    </DialogActions>
  );
};

export const ImportExportDialog = ({ onClose: handleClose }) => {
  const { router } = useRoute();
  const { root, snacks } = useContext(AppContext);
  const classes = useStyles();

  const [isBusy, setIsBusy] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [jsonString, setJsonString] = useState('');

  const handleImport = useCallback(() => {
    let snapshot;
    try {
      snapshot = JSON.parse(jsonString);
    } catch (error) {
      console.error('Could not parse JSON');
      console.error(error);
      handleClose();
      return;
    }

    router.navigate('home', () => {
      try {
        console.log('import snapshot');
        root.load(snapshot);
      } catch (error) {
        console.error('Invalid data (did you try changing ids?)');
        console.error(error);
        isValid.set(false);
        handleClose();
        return;
      }
      snacks.add('Imported data');
      handleClose();
    });
  }, [router, root, snacks, handleClose, isValid, jsonString]);

  const handleExport = useCallback(() => {
    try {
      const data = `data:text/json;charset=utf-8,${encodeURIComponent(
        jsonString
      )}`;
      const downloadA = document.createElement('a');
      downloadA.setAttribute('href', data);
      downloadA.setAttribute('download', 'export.json');
      document.body.append(downloadA);
      downloadA.click();
      downloadA.remove();
    } catch (error) {
      console.error('Could not parse JSON');
      console.error(error);
    }
  }, [jsonString]);

  return (
    <ImportExportContext.Provider
      value={{
        isBusy,
        isInitialized,
        isValid,
        jsonString,
        setIsBusy,
        setIsInitialized,
        setIsValid,
        setJsonString,
      }}
    >
      <DialogTitle>Import/Export Data</DialogTitle>
      <Content classes={classes} />
      <Actions
        classes={classes}
        onImport={handleImport}
        onExport={handleExport}
        onCancel={handleClose}
      />
    </ImportExportContext.Provider>
  );
};
