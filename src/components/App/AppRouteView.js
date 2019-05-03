import React from 'react';
import { useRoute } from 'react-router5';
import {
  EntityPage,
  HomePage,
  NotFoundPage,
} from '../../pages';

const SystemPages = {
  home: HomePage,
};

const EntityPages = new Set(['households', 'people']);

export const AppRouteView = () => {
  const { route } = useRoute();

  const SystemPage = SystemPages[route.name];
  if (SystemPage) {
    return <SystemPage />;
  }

  if (EntityPages.has(route.name)) {
    return <EntityPage />;
  }

  return <NotFoundPage />;
};
