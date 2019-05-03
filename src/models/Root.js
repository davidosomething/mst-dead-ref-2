import { values } from 'mobx';
import { applySnapshot, destroy, types } from 'mobx-state-tree';
import { DragAndDropMixin } from '../mixins';
import { Household, Person } from '.';

export const Root = types
  .compose(
    'Root',
    DragAndDropMixin,
    types
      .model('Entities', {
        households: types.map(Household),
        people: types.map(Person),
      })
      .views((self) => ({
        entitiesArray(entities) {
          return values(entities);
        },

        findEntity(source, id) {
          const entityMap = self[source];
          return entityMap ? entityMap.get(id) : null;
        },
      }))
      .actions((self) => ({
        addEntity(source, entity = {}) {
          return self[source].put(entity);
        },

        removeEntity(entity) {
          destroy(entity);
        },
      }))
  )
  .actions((self) => ({
    clear() {
      applySnapshot(self, {});
    },

    load(snapshot) {
      applySnapshot(self, snapshot);
    },
  }));
