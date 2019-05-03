import { map } from 'lodash';
import clsx from 'clsx';

import React, { Fragment, PureComponent } from 'react';

import { Drawer, Divider, List } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { AppDrawerToolbar, AppDrawerList } from '.';

import { EntitiesConfig } from '../../var/EntitiesConfig';

import { appStyles } from '../../styles';

export const AppDrawer = withStyles(appStyles)(
  class AppDrawer extends PureComponent {
    render() {
      const {
        classes,
        isOpen,
        onToggleDrawer: handleToggleDrawer,
      } = this.props;
      return (
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, isOpen && classes.drawerPaperOpen),
          }}
        >
          <AppDrawerToolbar onToggleDrawer={handleToggleDrawer} />
          <Divider />
          <List
            classes={{
              root: classes.drawerList,
            }}
            disablePadding
          >
            {map(
              EntitiesConfig,
              ({ source, entityKey, display: { Icon, title } }, index) => (
                <Fragment key={source}>
                  <AppDrawerList
                    Icon={Icon}
                    source={source}
                    entityKey={entityKey}
                    title={title}
                  />
                  <Divider />
                </Fragment>
              )
            )}
          </List>
        </Drawer>
      );
    }
  }
);
