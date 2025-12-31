import {Box, Breadcrumbs, Link, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {useState} from "react";
import AccountContainer from "./account-container.jsx";
import {useViewport} from "../../context/ViewportContext.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
const TopBar = (props) => {
  const viewport = useViewport();
  const {user} = useAuth();
  const {breadcrumbList, leftBar, rightBar} = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Box sx={{ flexGrow: 1 }} >
      <Toolbar>
        {viewport === "phone" && <IconButton
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
        {leftBar}
        {breadcrumbList && <Breadcrumbs aria-label="breadcrumb" sx={{ flexGrow: 1 }}>
          {breadcrumbList?.map((item, i) => (
            <Link key={i} underline="hover" color="inherit" href={item.link}>
              {i === breadcrumbList.length-1 ?  <Typography sx={{ color: 'text.primary' }}>{item.title}</Typography> : item.title }
            </Link>
          ))}
        </Breadcrumbs>}
        {rightBar}
        {user && <AccountContainer />}
      </Toolbar>
      </Box>)
}

export default TopBar;