import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useRoute } from 'react-router5';
import { useAppStyles } from '../../styles';
import { LayoutContext } from '../../contexts';
import { CssBaseline } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { AppDrawer, AppToolbar } from '.';

export const AppLayout = ({ children }) => {
  const { route } = useRoute();

  const scroller = useRef(null);

  const [isOpen, toggleDrawer] = useState(true);

  const classes = useAppStyles();

  const handleToggleDrawer = useCallback(
    (e) => {
      toggleDrawer(!isOpen);
    },
    [isOpen]
  );

  useLayoutEffect(() => {
    if (scroller.current) {
      scroller.current.scrollTop = 0;
    }
  }, [scroller, route]);

  return (
    <LayoutContext.Provider value={{ scroller }}>
      <CssBaseline />
      <Box display="flex">
        <AppToolbar isOpen={isOpen} onToggleDrawer={handleToggleDrawer} />
        <AppDrawer isOpen={isOpen} onToggleDrawer={handleToggleDrawer} />
        <div ref={scroller} className={classes.appScroller}>
          <div className={classes.appBarSpacer} />
          {children}
        </div>
      </Box>
    </LayoutContext.Provider>
  );
};
