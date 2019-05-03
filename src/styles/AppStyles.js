import { makeStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';

const drawerWidth = 250;

export const appStyles = (theme) => ({
  // Generic button styles
  leftButton: {
    marginRight: theme.spacing(1),
  },

  // Generic icon styles
  leftIcon: {
    marginRight: theme.spacing(1),
  },

  // AppToolbar
  toolbar: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbarOpen: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  toolbarMenuButton: {
    marginRight: theme.spacing(0.5),
  },
  toolbarMenuButtonHidden: {
    display: 'none',
  },
  toolbarButton: {
    margin: theme.spacing(0, 0.5),
  },
  toolbarIconSmall: {
    fontSize: 20,
  },
  toolbarSpacer: {
    flexGrow: 1,
  },

  // AppDrawer
  drawerPaper: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    position: 'relative',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    whiteSpace: 'nowrap',
    width: theme.spacing(7),
  },
  drawerPaperOpen: {
    width: drawerWidth,
  },
  drawerToolbar: {
    display: 'flex',
    alignItems: 'center',
    height: 48, // dense
    justifyContent: 'flex-end',
    padding: '0 8px',
  },
  drawerList: {
    display: 'flex',
    flexDirection: 'column',
  },

  drawerEntityList: {
    // ul
    '& > [data-react-beautiful-dnd-placeholder]': {
      display: 'none !important', // since we're using clone
    },
  },
  drawerListSubheader: {
    background: blueGrey[50],
    color: 'black',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    lineHeight: '2em',
  },
  drawerListSubheaderContent: {
    display: 'flex',
    alignItems: 'center',
  },
  drawerListSubheaderIcon: {
    color: theme.palette.grey['900'],
    background: 'transparent',
  },
  drawerListItem: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  drawerListItemClone: {
    '& ~ li': {
      // don't move things around since we're using clone
      transform: 'none !important',
    },
    background: blueGrey[100],
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  drawerListItemAvatar: {
    height: theme.spacing(3),
    width: theme.spacing(3),
  },
  drawerListText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  appScroller: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    padding: theme.spacing(0, 2, 3),
  },
  appBarSpacer: theme.mixins.toolbar,

  pageHeader: {
    marginBottom: theme.spacing(1.5),
  },
  pageTabs: {
    marginBottom: theme.spacing(1.5),
  },

  contentBoxHeader: {
    alignItems: 'center',
    background: theme.palette.grey[100],
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(1, 1.5),
  },
  contentBoxHeaderOnly: {
    borderRadius: 'inherit',
  },
  contentBoxHeaderIcon: {
    flexShrink: 1,
    marginRight: theme.spacing(1),
  },
  contentBoxHeaderTitle: {
    flexGrow: 1,
  },
  contentBoxHeaderActions: {
    flexShrink: 1,
  },
  contentBoxContent: {
    padding: theme.spacing(1.5),
  },
});

export const useAppStyles = makeStyles(appStyles);
