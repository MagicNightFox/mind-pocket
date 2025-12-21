import {Link as ReactLink, useLocation} from "react-router";
import {
  Divider,
  Drawer,
  ListItem,
  Toolbar,
  List,
  ListItemButton,
  ListSubheader,
  Collapse,
  createTheme, ThemeProvider, ListItemIcon, ListItemText, useMediaQuery, useTheme,
} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {useState} from "react";
import {useAuth} from "../../context/AuthContext.jsx";
import {SIDE_MENU_ITEMS} from "../../Constants.js";
import MenuList from "./menu-list.jsx";
import {useLang} from "../../lang/LanguageContext.jsx";

const SidePanel = props => {
  const etheme = useTheme();
  const {language} = useLang()
  const tablet = useMediaQuery(etheme.breakpoints.down('md'));
  const phone = useMediaQuery(etheme.breakpoints.down('sm'));
  const {user} = useAuth();
  const {drawerWidth} = props;
  let userMenuItems = SIDE_MENU_ITEMS.filter(item => user.subscribedSubAppsIdList.includes(item.id));

  const theme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#FAFAFA",
        paper: "#252525",
        active: "#444344"
      },
    },
    components: {
      MuiListItemButton: {
        styleOverrides: {
          root: {
            variants: [{
              props: { variant: "active"},
              style: {
                background: "#444344"
              }
            }],
          }
        }
      }
    }
  })

  return <ThemeProvider theme={theme}>
    <Drawer anchor="left" variant="persistent" open={!phone} sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
      },
    }}>
      <Toolbar >
      </Toolbar>
      <Divider/>
      <MenuList title={language.SidePanel.Subheaders.MainMenu} itemsToRender={userMenuItems} />
    </Drawer>
  </ThemeProvider>
}

export default SidePanel;