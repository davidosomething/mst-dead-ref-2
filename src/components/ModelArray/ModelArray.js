import { map } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Observer, observer } from 'mobx-react-lite';
import { AddButton } from '../Buttons';
import { ContentBox } from '../ContentBox';

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(1),
  },
  modelArrayPanel: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ItemsIterator = observer(({ isNew, items, itemProp, View }) =>
  map(items, (item, index) => (
    <View
      key={item.id}
      {...{ [itemProp]: item }}
      expanded={index === 0 && isNew}
    />
  ))
);

ItemsIterator.propTypes = {
  isNew: PropTypes.bool,
  items: PropTypes.array.isRequired,
  itemProp: PropTypes.string.isRequired,
  View: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export const ModelArray = ({ title, itemProp, items, View, onClickAdd }) => {
  const [lastCount, setLastCount] = useState(items.length);
  const classes = useStyles();

  const handleClickAdd = useCallback(() => {
    setLastCount(items.length + 1);
    if (onClickAdd) {
      onClickAdd();
    }
  }, [items, onClickAdd]);

  return (
    <div className={classes.modelArrayPanel}>
      <ContentBox
        className={classes.header}
        title={<Observer>{() => `${title} (${items.length})`}</Observer>}
        headerActions={<AddButton classes={classes} onClick={handleClickAdd} />}
      />
      <ItemsIterator
        isNew={lastCount !== items.length}
        items={items}
        itemProp={itemProp}
        View={View}
      />
    </div>
  );
};
ModelArray.propTypes = {
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  items: PropTypes.array.isRequired,
  itemProp: PropTypes.string.isRequired,
  View: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  onClickAdd: PropTypes.func,
};
