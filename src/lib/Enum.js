import { keys, map, memoize, reduce, values } from 'lodash';

/**
 * @example new Enum([{ MALE: 'Male' }, { FEMALE: 'Female' }]);
 */
export class Enum {
  constructor(items) {
    this.items = items;
  }

  getSlugsNames = memoize(() =>
    reduce(
      this.items,
      (result, item) => ({
        ...result,
        ...map(Object.entries(item), ([key, value]) => ({ [key]: value }))[0],
      }),
      {}
    )
  );

  /**
   * { MALE: 'Male', FEMALE: 'Female' }
   */
  get slugsNames() {
    return this.getSlugsNames();
  }

  getSlugsSlugs = memoize(() =>
    reduce(
      this.items,
      (result, item) => ({
        ...result,
        ...map(keys(item), (key) => ({ [key]: key }))[0],
      }),
      {}
    )
  );

  /**
   * { MALE: 'MALE', FEMALE: 'FEMALE' }
   */
  get slugsSlugs() {
    return this.getSlugsSlugs();
  }

  getSlugs = memoize(() =>
    reduce(this.items, (result, item) => [...result, ...keys(item)], [])
  );

  /**
   * @return {string[]} [ 'MALE', 'FEMALE' ]
   */
  get slugs() {
    return this.getSlugs();
  }

  getNames = memoize(() =>
    reduce(this.items, (result, item) => [...result, ...values(item)], [])
  );

  /**
   * @return {string[]} [ 'Male', 'Female' ]
   */
  get names() {
    return this.getNames();
  }
}
