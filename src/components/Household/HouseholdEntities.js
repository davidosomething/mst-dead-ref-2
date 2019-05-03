import { map } from 'lodash';
import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  HouseholdEntityIterator,
  HouseholdPerson,
} from '.';

const iteratees = {
  people: {
    title: 'People',
    Details: HouseholdPerson,
  },
};

const HouseholdEntityIteratorEntities = observer(
  ({ household, source, entity, Details }) =>
    map(household[source], (entity, index) => (
      <Details
        key={entity.id}
        index={index}
        household={household}
        entity={entity}
      />
    ))
);

export const HouseholdEntities = observer(({ household }) =>
  map(iteratees, ({ title, Details }, source, reactIndex) => (
    <HouseholdEntityIterator
      key={title}
      index={reactIndex}
      household={household}
      source={source}
      title={title}
    >
      <HouseholdEntityIteratorEntities
        household={household}
        source={source}
        Details={Details}
      />
    </HouseholdEntityIterator>
  ))
);
