import {useState} from "react";
import {Link as ReactLink} from "react-router";
import {Box, ListItemButton, MenuItem, Menu, Select, IconButton} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {useViewport} from "../../context/ViewportContext.jsx";
import LogoComponent from "../logo-component.jsx";

const UnauthTopBar = () => {
  const {viewport} = useViewport();

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const menuOpen = Boolean(menuAnchorEl);
  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  }
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  }
  return <Box display="flex" padding="16px">
    <Box flexGrow={1}>
      <LogoComponent />
    </Box>
    <Box display="flex" gap="8px">
      <Select variant="standard" value={"en"}>
        <MenuItem value="en">
          English
        </MenuItem>
        <MenuItem value="cs">
          Czech
        </MenuItem>
      </Select>
      {viewport === "phone" ? <><IconButton><MenuIcon onClick={handleMenuClick}/></IconButton>
        <Menu anchorEl={menuAnchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
          <MenuItem component={ReactLink} to="/about">
            About
          </MenuItem>
          <MenuItem component={ReactLink} to="/">
            Sign In
          </MenuItem>
        </Menu></> : <>
        <ListItemButton component={ReactLink} to="/about">
          About
        </ListItemButton>
        <ListItemButton component={ReactLink} to="/">
          Sign In
        </ListItemButton>
      </>}
    </Box>
  </Box>
}

export default UnauthTopBar