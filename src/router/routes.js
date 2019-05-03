import { map } from 'lodash';

import { EntitiesConfig } from '../var/EntitiesConfig';

const entityRoutes = map(EntitiesConfig, (config) => ({
  name: config.source,
  path: `/${config.source}/:id`,
  withProps: () => config,
}));

export const routes = [
  { name: 'home', path: '/' },
  { name: 'preferences', path: '/preferences' },
  ...entityRoutes,
];
