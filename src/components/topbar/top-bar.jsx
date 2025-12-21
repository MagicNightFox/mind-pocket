import {AppBar, Avatar, Badge, Box, Breadcrumbs, Link, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import {Link as ReactLink} from "react-router";
import LoginComponent from "../auth/login-component.jsx";
import {useState} from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExpandMore from "@mui/icons-material/ExpandMore"
import AccountContainer from "./account-container.jsx";
const TopBar = (props) => {
  const {breadcrumbList} = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [mobileScreen, setMobileScreen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Box sx={{ flexGrow: 1 }} >
      <Toolbar>
        {mobileScreen && <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>}
        <Breadcrumbs aria-label="breadcrumb" sx={{ flexGrow: 1 }}>
          {breadcrumbList?.map((item, i) => (
            <Link key={i} underline="hover" color="inherit" href={item.link}>
              {i === breadcrumbList.length-1 ?  <Typography sx={{ color: 'text.primary' }}>{item.title}</Typography> : item.title }
            </Link>
          ))}
        </Breadcrumbs>
        <AccountContainer />
      </Toolbar>
      </Box>)
}

export default TopBar;