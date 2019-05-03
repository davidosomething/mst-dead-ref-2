import { types } from 'mobx-state-tree';

export const Preferences = types
  .model('Preferences', {
    locale: 'en-US',
    currency: 'USD',
    loadOnInit: true,
    theme: 'LIGHT',
  })
