import { findIndex, map, set } from 'lodash';
import { types } from 'mobx-state-tree';
import { Entity, Person } from '.';

export const Household = types.compose(
  'Household',
  Entity,
  types
    .model({
      draft: types.maybeNull(types.late(() => Household)),
      people: types.array(types.safeReference(Person)),
    })
    .views((self) => ({
      // ===================================================================
      // Drag and Drop
      // ===================================================================

      get droppableId() {
        const parts = ['households'];
        if (self.isDraft) {
          parts.push(self.actual.id);
          parts.push('draft');
        } else {
          parts.push(self.id);
        }
        return parts.join('.');
      },
    }))
    .actions((self) => ({
      setValue(path, value) {
        return set(self, path, value);
      },

      /**
       * @param {string} type
       * @param {object} entity
       */
      removeEntity(type, entity) {
        return self[type].remove(entity);
      },

      /**
       * @TODO There's no UI for this, the only way to add an entity is to
       * drag and drop, which will do a self.upsert()
       */
      addEntity(type, entity) {
        self[type].push(entity);
        return entity;
      },

      // ===================================================================
      // Drag and drop
      // ===================================================================

      reorder({ key, oldIndex, newIndex }) {
        const items = self[key];
        const ids = map(items, 'id');
        const [removed] = ids.splice(oldIndex, 1);
        ids.splice(newIndex, 0, removed);
        items.replace(ids);
      },

      upsert({ key, id, newIndex }) {
        const items = self[key];
        const oldIndex = findIndex(items, { id: id });
        if (oldIndex > -1) {
          self.reorder({ key, oldIndex, newIndex });
          return;
        }
        items.splice(newIndex, 0, id);
      },
    }))
);
