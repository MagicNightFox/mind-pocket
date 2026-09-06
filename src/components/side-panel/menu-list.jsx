import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from "@mui/material";
import {Link as ReactLink, useLocation} from "react-router";
import {useState} from "react";
import {
  Add,
  SummarizeOutlined,
  Apps,
  ArticleOutlined,
  AllInbox,
  AutoStoriesOutlined,
  RestaurantMenuOutlined,
  ArrowLeft
} from "@mui/icons-material";
import NoteCreateModal from "../notes/note-create-modal.jsx";
import {useViewport} from "../../context/ViewportContext.jsx";
const MenuList = () => {
  const location = useLocation();
  const {setMenuOpen} = useViewport()
  const [hoverNotes, setHoverNotes] = useState(false);
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const handleClick = () => {
    setMenuOpen(false);
  }
  return <>
    <List
      subheader={
        <ListSubheader component="div" sx={{bgcolor: "inherit"}}>
          Personal
        </ListSubheader>
      }
      dense
    >
      <ListItem>
        <ListItemButton variant={location.pathname === "/" && "active"} onClick={handleClick} component={ReactLink} to={"/"}>
          <ListItemIcon> <Apps fontSize="inherit"/> </ListItemIcon>
          <ListItemText primary="Dashboard"/>
        </ListItemButton>
      </ListItem>
      <ListItem  secondaryAction={(hoverNotes || location.pathname === "/notes") && <IconButton sx={{padding:0, color: "inherit"}} onClick={()=> setOpenNoteModal(true)}><Add sx={{fontSize:"21px"}}/></IconButton>}
                 onMouseEnter={()=> setHoverNotes(true)}
                 onMouseLeave={()=> setHoverNotes(false)}>
        <ListItemButton variant={location.pathname === "/notes" && "active"} onClick={handleClick} component={ReactLink} to={"/notes"}>
          <ListItemIcon> <SummarizeOutlined fontSize="inherit"/> </ListItemIcon>
          <ListItemText primary="Notes"/>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton variant={location.pathname === "/journal" && "active"} onClick={handleClick} component={ReactLink} to={"/"}>
          <ListItemIcon> <AutoStoriesOutlined fontSize="inherit"/> </ListItemIcon>
          <ListItemText primary="Journal"/>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton variant={location.pathname === "/shifting" && "active"} onClick={handleClick} component={ReactLink} to={"/"}>
          <ListItemIcon> <Apps fontSize="inherit"/> </ListItemIcon>
          <ListItemText primary="Shifting"/>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton variant={location.pathname === "/fiction" && "active"} onClick={handleClick} component={ReactLink} to={"/"}>
          <ListItemIcon> <ArticleOutlined fontSize="inherit"/> </ListItemIcon>
          <ListItemText primary="Fiction"/>
        </ListItemButton>
      </ListItem>
    </List>
    <List subheader={
      <ListSubheader component="div" sx={{bgcolor: "inherit"}}>
        Household
      </ListSubheader>
    }
          dense>
      <ListItem>
        <ListItemButton variant={location.pathname === "/inventory" && "active"} onClick={handleClick} component={ReactLink} to={"/inventory"}>
          <ListItemIcon> <AllInbox fontSize="inherit"/> </ListItemIcon>
          <ListItemText primary="Inventory"/>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton variant={location.pathname === "/fiction" && "active"} onClick={handleClick} component={ReactLink} to={"/"}>
          <ListItemIcon> <RestaurantMenuOutlined fontSize="inherit"/> </ListItemIcon>
          <ListItemText primary="Recipes"/>
        </ListItemButton>
      </ListItem>
    </List>
    <NoteCreateModal open={openNoteModal} onClose={()=> setOpenNoteModal(false)}/>
  </>
}

export default MenuList;