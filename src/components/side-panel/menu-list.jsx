import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader} from "@mui/material";
import {Link as ReactLink} from "react-router";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookIcon from '@mui/icons-material/Book';
import Settings from "@mui/icons-material/Settings"
import {useLang} from "../../lang/LanguageContext.jsx";

const getIcon = (id) => {
  switch(id) {
    case "goonCave": return <BookIcon />;
    case "fictionArchive": return <BookIcon />;
    default: return <DashboardIcon />
  }
}
const MenuList = (props) => {
  const {title, itemsToRender} = props;
  const {t} = useLang();
  return <>
    <List
      subheader={
        <ListSubheader component="div" sx={{bgcolor: "inherit"}}>
          {title}
        </ListSubheader>
      }
      dense
    >
      <ListItem>
        <ListItemButton variant={location.pathname === "/" && "active"} component={ReactLink} to={"/"} sx={{borderRadius:"8px", height: "48px" }} >
          <ListItemIcon> <DashboardIcon /> </ListItemIcon>
          <ListItemText primary={t.Breadcrumbs.Dashboard}/>
        </ListItemButton>
      </ListItem>
      {itemsToRender?.map((item, index) => (
        <ListItem key={index}>
          <ListItemButton variant={location.pathname === item.url && "active"} component={ReactLink} to={item.url} sx={{borderRadius:"8px", height: "48px" }} >
            <ListItemIcon> {getIcon(item.id)} </ListItemIcon>
            <ListItemText primary={item.title}/>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </>
}

export default MenuList;