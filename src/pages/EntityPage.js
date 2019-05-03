import React, { useContext, useMemo } from 'react';
import { useRoute } from 'react-router5';
import { observer } from 'mobx-react-lite';
import { AppContext, EntityContext } from '../contexts';
import {
  HouseholdPage,
  NotFoundPage,
  PersonPage,
} from '.';

const routeToComponent = {
  households: HouseholdPage,
  people: PersonPage,
};

export const EntityPage = observer(() => {
  const { route } = useRoute();
  const { root } = useContext(AppContext);
  const { provideDraft } = useContext(EntityContext);

  const [Page, draft] = useMemo(
    () => [
      routeToComponent[route.name] || NotFoundPage,
      provideDraft(root.findEntity(route.name, route.params.id)),
    ],
    [route, root, provideDraft]
  );

  return <Page draft={draft} />;
});
