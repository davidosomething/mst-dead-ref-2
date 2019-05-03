import { action, decorate, observable } from 'mobx';

export class SnacksModel {
  items = new Map();

  /**
   * @param {*} message if object, acceps
   */
  add(config) {
    this.items.set(config, Date.now());
  }

  clear() {
    this.items.clear();
  }

  remove(config) {
    this.items.delete(config);
  }
}

decorate(SnacksModel, {
  items: observable,

  add: action,
  clear: action,
  remove: action,
});
