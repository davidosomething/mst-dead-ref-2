import { isFunction, split } from 'lodash';
import localforage from 'localforage';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { DragDropContext } from 'react-beautiful-dnd';
import { AppContext } from '../../contexts';
import { EntityProvider } from '../Entity';
import { CircularProgress } from '@material-ui/core';
import { AppLayout, AppRouteView } from '.';
import { SnacksManager } from '../SnacksManager';

export const App = observer(({ preferences, root, snacks }) => {
  const [readyState, setReadyState] = useState('loading');

  const load = useMemo(
    () =>
      async function load() {
        let snapshot = await localforage.getItem('root');
        if (snapshot) {
          try {
            root.load(snapshot);
            snacks.add('Loaded data from local storage');
          } catch (error) {
            console.error(error);
            await localforage.removeItem('root');
            snacks.add('Removed invalid data from local storage');
          }
        }
        setReadyState('loaded');
      },
    [root, snacks]
  );

  const handleDragEnd = useCallback(
    (result) => {
      const { destination, source } = result;
      if (!destination) {
        return;
      }

      const [, sourceParts] = split(source.droppableId, '#');
      const [sourceMain] = split(sourceParts, '.');
      const [, destinationParts] = split(destination.droppableId, '#');
      const [destinationMain] = split(destinationParts, '.');

      const actionName = `drop$${sourceMain}$${destinationMain}`;
      console.log(actionName, result);
      const action = root[actionName];
      if (isFunction(action)) {
        action(result);
      }
    },
    [root]
  );

  useEffect(() => {
    if (readyState === 'loading') {
      if (preferences.loadOnInit) {
        load();
      } else {
        setReadyState('loaded');
      }
    }
  }, [readyState, preferences, load]);

  return (
    <AppContext.Provider value={{ preferences, root, snacks }}>
      <SnacksManager />
      <EntityProvider>
        <DragDropContext onDragEnd={handleDragEnd}>
          <AppLayout>
            {readyState === 'loading' && <CircularProgress />}
            {readyState === 'loaded' && <AppRouteView />}
          </AppLayout>
        </DragDropContext>
      </EntityProvider>
    </AppContext.Provider>
  );
});
App.propTypes = {
  preferences: PropTypes.object.isRequired,
  root: PropTypes.object.isRequired,
  snacks: PropTypes.object.isRequired,
};
