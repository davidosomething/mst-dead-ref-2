import { filter, get, map, reduce, split } from 'lodash';
import { types } from 'mobx-state-tree';
import { EntitiesConfig } from '../var/EntitiesConfig';

const draggableSources = map(
  filter(EntitiesConfig, 'display.isDraggable'),
  'source'
);

export const DragAndDropMixin = types
  .model('DragAndDropMixin')
  .actions((self) => {
    /**
     * @param {object} params
     * @param {string} fromList e.g. 'properties', 'households', etc.
     * @param {string} toKey e.g. 'people' in a household
     * @return {object} extend actions with it
     */
    const makeDropFromAppDrawerHandler = ({ fromList, toKey }) => ({
      [`drop$appDrawer$${toKey}`]: ({ draggableId, destination }) => {
        const [, entityId] = split(draggableId, '#');

        const { droppableId, index } = destination;
        // droppableId might be "households.household0.draft#people"
        const [entityPath, key] = split(droppableId, '#');
        const [entityMapId, actualId, ...subPath] = split(entityPath, '.');
        const entityMap = self[entityMapId];
        const actual = entityMap.get(actualId);
        const target = subPath.length > 0 ? get(actual, subPath) : actual;
        target.upsert({
          key,
          id: entityId,
          newIndex: index,
        });
      },
    });

    /**
     * @param {object} params
     * @param {string} mapName e.g. 'properties', 'households', etc.
     * @return {object} extend actions with it
     */
    const makeDropReorderHandler = ({ mapName }) => ({
      [`drop$${mapName}$${mapName}`]: ({
        draggableId,
        source,
        destination,
      }) => {
        // draggableId might be "households.household0.draft.people#person2"
        const [entityPath, key, memberId] = split(draggableId, '#');
        const [entityMapKey, actualId, ...subPath] = split(entityPath, '.');
        const entityMap = self[entityMapKey];
        const actual = entityMap.get(actualId);
        const target = subPath.length > 0 ? get(actual, subPath) : actual;
        console.log(`reorder ${memberId} in ${target.id}`);
        target.reorder({
          key,
          oldIndex: source.index,
          newIndex: destination.index,
        });
      },
    });

    return reduce(
      draggableSources,
      (dndActions, key) => ({
        ...dndActions,
        ...makeDropFromAppDrawerHandler({
          fromList: key,
          toKey: key,
        }),
        ...makeDropReorderHandler({
          mapName: key,
        }),
      }),
      {}
    );
  });
