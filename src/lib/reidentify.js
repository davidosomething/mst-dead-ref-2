import flat, { unflatten } from 'flat';
import {
  endsWith,
  mapValues,
  merge,
  pickBy,
  reduce,
  uniqueId,
  values,
} from 'lodash';

export const cloneId = (originalId, suffix = 'clone') =>
  `${originalId}_${uniqueId(`${suffix}_`)}`;

/**
 * @param {object} flattenedObj { 'id': 'abc123', 'a.id': 'xyz', 'not': 'e' }
 * @return {object} { 'id': 'abc123', 'a.id': 'xyz' }
 */
export const pathsToIds = (flatSnapshot) =>
  pickBy(flatSnapshot, (id, path) => path === 'id' || endsWith(path, '.id'));

/**
 * @param {object} flatSnapshot { 'a.b.c.id': 123, 'a.b.c.reference': 123 }
 * @param {object} ids in pathsToIds form
 * @return {object} { '123': [ 'a.b.c.id', 'a.b.c.reference'] }
 */
export const idToPaths = (flatSnapshot, ids) => {
  return reduce(
    flatSnapshot,
    (result, value, path) => {
      if (ids.has(value)) {
        result[value] = result[value] || [];
        result[value].push(path);
      }
      return result;
    },
    {}
  );
};

export const rereferenceFlatSnapshot = (flatSnapshot, idsPaths, clonedIds) =>
  reduce(
    idsPaths,
    (rerefd, paths, originalId) => {
      const replacementsForId = reduce(
        paths,
        (replaced, path, index) => {
          const value = flatSnapshot[path];
          const idPath = idsPaths[value];
          if (idPath && idPath.length > 0) {
            replaced[path] = clonedIds[idPath[0]];
          }
          return replaced;
        },
        {}
      );
      return {
        ...rerefd,
        ...replacementsForId,
      };
    },
    {}
  );

/**
 * Clone snapshot and update ids in the clone
 *
 * @param {object} snapshot original object with references, getters, setters,
 * and observables
 * @param {object} [options]
 * @param {function} [options.withId]
 * @param {function} [options.idGenerator=cloneId] aceepts param id
 * @return {object} a brand new plain js object with ids replaced as needed
 */
export const reidentify = (
  snapshot,
  { withId, idGenerator = cloneId } = {}
) => {
  const flatSnapshot = flat(snapshot);
  const pIds = pathsToIds(flatSnapshot);
  const ids = new Set(values(pIds));
  const idsPaths = idToPaths(flatSnapshot, ids);
  const clonedIds = mapValues(pIds, (id, path, obj) =>
    withId && path === 'id' ? withId : idGenerator(id)
  );
  const rereferencedFlatSnapshot = rereferenceFlatSnapshot(
    flatSnapshot,
    idsPaths,
    clonedIds
  );
  // Don't merge the original snapshot object since it has actual references
  // and observables. Use an unflattened flatSnapshot as the base
  // It essentially clones the snapshot to a regular javascript object
  return merge(unflatten(flatSnapshot), unflatten(rereferencedFlatSnapshot));
};
