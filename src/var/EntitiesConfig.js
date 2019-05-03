import {
  Face as FaceIcon,
  People as PeopleIcon,
} from '@material-ui/icons';

export const EntitiesConfig = [
  {
    source: 'households',
    key: 'Households',
    entityKey: 'Household',
    display: {
      title: 'Households',
      Icon: PeopleIcon,
    },
  },
  {
    source: 'people',
    key: 'People',
    entityKey: 'Person',
    display: {
      title: 'People',
      isDraggable: true,
      Icon: FaceIcon,
    },
  },
];
