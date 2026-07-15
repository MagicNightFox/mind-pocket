import {Link} from "react-router"
import {
  Divider,
  Drawer,
  Toolbar,
  createTheme, ThemeProvider, Typography
} from "@mui/material";
import MenuList from "./menu-list.jsx";
import {useViewport} from "../../context/ViewportContext.jsx";
const SidePanel = () => {
  const viewport = useViewport();
  const drawerWidth = viewport === "phone" ? 0 : 256;

  const theme = createTheme({
    palette: {
      mode: "light",
      background: {
        default: "#FAFAFA",
        paper: "#fdfdfd",
      },
    },
    components: {
      MuiListItemButton: {
        styleOverrides: {
          root: {
            height: "32px",
            variants: [{
              props: { variant: "active"},
              style: {
                background: "#e6e6e6"
              }
            }],
          }
        }
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            fontFamily: "Intel One Mono",
            color: "#50506c"
          }
        }
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: "32px",
            fontSize: "20px"
          }
        }
      },
      MuiListItem: {
        styleOverrides: {
          gutters: {
            padding: 0,
            margin: "0 0 4px 0"
          }
        }
      },
      MuiListItemSecondaryAction: {
        styleOverrides: {
          root: {
            top: "15px",
            color: "rgb(80 80 108 / 0.75)"
          }
        }
      },
      MuiListSubheader: {
        styleOverrides: {
          root: {
            fontFamily: "Intel One Mono",
            fontWeight: "lighter",
          }
        }
      }
    }
  })

  return <ThemeProvider theme={theme}>
    <Drawer anchor="left" variant="persistent" open={viewport !== "phone"} sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
      }
    }}>
      <Toolbar>
        <Typography component="h1" variant="h6" fontFamily="Intel One Mono">Workspace</Typography>
      </Toolbar>
      <Divider/>
      <MenuList />
    </Drawer>
  </ThemeProvider>
}

export default SidePanel;