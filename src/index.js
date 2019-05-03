import 'typeface-roboto';
import { Preferences, Root, SnacksModel } from './models';
import { createRouter, routes } from './router';
import React from 'react';
import ReactDOM from 'react-dom';
import * as mobx from 'mobx';
import makeInspectable from 'mobx-devtools-mst';
import mobxFormatters from 'mobx-formatters';
import { RouterProvider } from 'react-router5';
import { App } from './components/App';
import { IS_DEV } from './lib/Env';

const preferencesStore = Preferences.create();
const snacksStore = new SnacksModel();
const rootStore = Root.create();

const router = createRouter({
  useLogger: true,
  routes,
  store: rootStore,
});

if (IS_DEV) {
  mobx.configure({ enforceActions: 'observed' });
  mobxFormatters(mobx);
  makeInspectable(preferencesStore);
  //makeInspectable(rootStore);
}

const renderApp = () =>
  ReactDOM.render(
    <RouterProvider router={router}>
      <App
        preferences={preferencesStore}
        root={rootStore}
        snacks={snacksStore}
      />
    </RouterProvider>,
    document.querySelector('#root')
  );

const initApp = () =>
  router.start((error, state) => {
    renderApp();
  });

initApp();
