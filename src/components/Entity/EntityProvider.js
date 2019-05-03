import React from 'react';
import { EntityContext } from '../../contexts';
import { action, decorate, observable } from 'mobx';
import { observer } from 'mobx-react-lite';

class ProvidedEntity {
  entity = null;

  clearEntity() {
    if (!this.entity) {
      return;
    }
    console.log('EntityProvider - clearEntity');
    this.entity = null;
    return this.entity;
  }

  deleteEntity() {
    console.log('EntityProvider - deleting entity', this.entity);
    this.entity.delete();
    this.entity = null;
    return this.entity;
  }

  provideActual(entity = this.entity) {
    console.log('EntityProvider - provideActual', { entity });
    this.entity = entity.actual;
    return this.entity;
  }

  provideDraft(entity = this.entity) {
    if (!entity) {
      console.log('can not create draft without entity');
      return null;
    }

    console.group('EntityProvider - provideDraft from', { entity });
    const draft = entity.createDraft();
    this.entity = draft;
    console.groupEnd();
    return this.entity;
  }

  setEntity(e) {
    console.log('EntityProvider - setEntity', e);
    this.entity = e;
    return this.entity;
  }
}

decorate(ProvidedEntity, {
  entity: observable,
  clearEntity: action.bound,
  deleteEntity: action.bound,
  setEntity: action.bound,
  provideActual: action.bound,
  provideDraft: action.bound,
});

const provided = new ProvidedEntity();

export const EntityProvider = observer(({ children }) => (
  <EntityContext.Provider value={provided}>{children}</EntityContext.Provider>
));
