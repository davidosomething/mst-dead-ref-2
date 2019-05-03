import nanoid from 'nanoid';
import { types } from 'mobx-state-tree';

export const MyTypes = {};
MyTypes.positiveNumber = types.refinement(
  'positiveNumber',
  types.number,
  (value) => value >= 0
);

MyTypes.positiveInteger = types.refinement(
  'positiveInteger',
  types.integer,
  (value) => value >= 0
);

MyTypes.uuid = types.optional(types.identifier, () => nanoid());

MyTypes.unreferencedId = types.optional(types.string, () => nanoid());
