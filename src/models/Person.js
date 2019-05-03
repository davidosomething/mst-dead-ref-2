import { trim } from 'lodash';
import { types } from 'mobx-state-tree';
import { Entity } from '.';

export const Person = types.compose(
  'Person',
  Entity,
  types
    .model({
      draft: types.maybeNull(types.late(() => Person)),
      firstName: '',
      middleName: '',
      lastName: '',
    })
    .views((self) => ({
      get name() {
        return self.displayName || self.fullName || '';
      },

      get fullName() {
        return trim(`${self.firstName} ${self.middleName} ${self.lastName}`);
      },
    }))
    .actions((self) => ({
      afterCreate() {
        self.displayName = self.displayName || self.fullName;
      },
    }))
);
