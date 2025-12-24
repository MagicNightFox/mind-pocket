import {
  Container,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  MenuItem
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import {Link as ReactLink} from "react-router";
import Menu from "@mui/material/Menu";
import TopBar from "../../components/topbar/top-bar.jsx";

const RecipePage = () => {
  return <>
    <TopBar title="Recipes"/>
    <Drawer variant="permanent" >
      <Toolbar/>
      <List sx={{ width: '200px', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Link component={ReactLink} to="/recipes">
          <ListItemButton>Recipes</ListItemButton>
        </Link>
      </List>
    </Drawer>
    <Container maxWidth="lg">
      <Toolbar/>
    </Container>
  </>
}
export default RecipePage;