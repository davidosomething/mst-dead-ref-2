import { createRouter } from 'router5';
import loggerPlugin from 'router5-plugin-logger';
import browserPlugin from 'router5-plugin-browser';

function configureRouter({ useLogger = false, routes, store }) {
  const router = createRouter(routes, {
    allowNotFound: true,
  })

  router.usePlugin(browserPlugin({ useHash: false }));
  if (useLogger) {
    router.usePlugin(loggerPlugin);
  }

  return router;
}

export { configureRouter as createRouter };
