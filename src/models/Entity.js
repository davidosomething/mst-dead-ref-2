import nanoid from 'nanoid';
import { replace, set } from 'lodash';
import {
  applySnapshot,
  destroy,
  getParent,
  getPathParts,
  getRoot,
  getSnapshot,
  getType,
  types,
} from 'mobx-state-tree';
import { MyTypes } from '../lib/MyTypes';
import { cloneId, reidentify } from '../lib/reidentify';

export const Entity = types
  .model({
    id: MyTypes.uuid,
    displayName: '',
  })
  .postProcessSnapshot((snapshot) => {
    delete snapshot.draft;
    return snapshot;
  })
  .volatile((self) => ({
    isDraft: false,
  }))
  .views((self) => ({
    get actual() {
      return self.isDraft ? getParent(self) : self;
    },

    get container() {
      return getParent(self.actual);
    },

    get source() {
      return self.container ? getPathParts(self.container)[0] : '';
    },

    get name() {
      return self.displayName;
    },
  }))
  .actions((self) => ({
    // =====================================================================
    // Self
    // =====================================================================

    setValue(path, value) {
      return set(self, path, value);
    },

    delete() {
      getRoot(self).removeEntity(self.actual);
    },

    // =====================================================================
    // Copies
    // =====================================================================

    /**
     * Copies the DRAFT
     *
     * @return {?object} copy
     */
    copy() {
      const root = getRoot(self);
      if (!root) {
        return null;
      }

      const selfType = getType(self);
      const snapshot = getSnapshot(self);

      const copy = selfType.create();
      const reidSnapshot = reidentify(snapshot, {
        withId: copy.id,
        idGenerator: () => nanoid(),
      });

      root.addEntity(self.source, copy);
      applySnapshot(copy, {
        ...reidSnapshot,
        displayName: `${reidSnapshot.displayName} [COPY]`,
      });
      return copy;
    },

    // =====================================================================
    // Drafts
    // =====================================================================

    /**
     * @return {object} draft
     */
    createDraft() {
      if (self.isDraft) {
        console.log('is draft');
        return self;
      }

      if (self.draft) {
        console.log('has a draft');
        return self.draft;
      }

      const selfType = getType(self);
      const snapshot = getSnapshot(self);

      const draftId = cloneId(self.id, 'draft');
      // Must add the draft node to tree so it can resolve references
      self.draft = selfType.create({ id: draftId });

      // Update model
      const idGenerator = (id) => `${id}__${draftId}`;
      const reidSnapshot = reidentify(snapshot, {
        withId: draftId,
        idGenerator,
      });
      console.log('new draft using snapshot', reidSnapshot);
      applySnapshot(self.draft, reidSnapshot);
      // Update volatiles
      self.draft.isDraft = true;
      return self.draft;
    },

    /**
     * @return {boolean} success
     */
    saveDraft() {
      const draft = self.draft ? self.draft : self.isDraft ? self : null;
      if (!draft) {
        console.warn('No draft exists!', self);
        return false;
      }
      const original = getParent(draft);
      const draftSnapshot = getSnapshot(draft);
      const draftIdSuffixRegex = new RegExp(`__${draftSnapshot.id}$`);
      const idGenerator = (id) => replace(id, draftIdSuffixRegex, '');
      const reidDraftSnapshot = reidentify(draftSnapshot, {
        withId: original.id,
        idGenerator,
      });
      applySnapshot(original, reidDraftSnapshot);
      return true;
    },

    destroyDraft() {
      if (self.draft) {
        destroy(self.draft);
      }
    },

    resetDraft() {
      if (self.draft) {
        self.destroyDraft();
      }
      return self.createDraft();
    },
  }));
