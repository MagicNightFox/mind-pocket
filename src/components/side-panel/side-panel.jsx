import {
  Divider,
  Drawer,
  Toolbar,
  createTheme, ThemeProvider
} from "@mui/material";
import MenuList from "./menu-list.jsx";
import {useLang} from "../../lang/LanguageContext.jsx";
import {useViewport} from "../../context/ViewportContext.jsx";

const SidePanel = props => {
  const {language} = useLang()
  const viewport = useViewport();
  const {drawerWidth} = props;

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
    <Drawer anchor="left" variant="persistent" open={viewport !== "phone"} sx={{
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
      <MenuList title={language.SidePanel.Subheaders.MainMenu} />
    </Drawer>
  </ThemeProvider>
}

export default SidePanel;