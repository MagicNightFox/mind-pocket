import NotificationsIcon from "@mui/icons-material/Notifications";
import {IconButton, Badge, Avatar, Box, Menu, MenuItem, ListItemIcon, Divider, ListItemButton} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore"
import ExpandLess from "@mui/icons-material/ExpandLess"
import Settings from "@mui/icons-material/Settings"
import LogoutIcon from "@mui/icons-material/Logout";
import {Link as ReactLink} from "react-router";
import {useState} from "react";
import {useAuth} from "../../context/AuthContext.jsx";
import PersonIcon from '@mui/icons-material/Person';
import {useLang} from "../../lang/LanguageContext.jsx";

const AccountContainer = (props) => {
  const {t} = useLang();
  const [accAncholEl, setAccAncholEl] = useState(null);
  const openAcc = Boolean(accAncholEl);
  const {logout} = useAuth()
  const handleAccClick = (event) => {
    setAccAncholEl(event.currentTarget);
  }
  const handleAccClose = () => {
    setAccAncholEl(null);
  }
  return <Box>
  <IconButton>
    <Badge color="primary" badgeContent={0}>
      <NotificationsIcon/>
    </Badge>
  </IconButton>
  <IconButton color="inherit" onClick={handleAccClick} aria-controls={openAcc ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openAcc ? 'true' : undefined}>
    <Avatar />
    {openAcc ? <ExpandLess /> : <ExpandMore />}
  </IconButton>
  <Menu anchorEl={accAncholEl} open={openAcc} onClose={handleAccClose} onClick={handleAccClose}
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
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <MenuItem component={ReactLink} to="/profile/">
            <Avatar /> {t.AccountMenu.MyProfile}
        </MenuItem>
        <Divider/>
        <MenuItem component={ReactLink} to="/account">
          <ListItemIcon>
            <PersonIcon/>
          </ListItemIcon> {t.AccountMenu.MyAccount}
        </MenuItem>
        <MenuItem component={ReactLink} to="/account/settings">
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
          {t.AccountMenu.Settings}
        </MenuItem>
        <MenuItem onClick={logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
          {t.AccountMenu.LogOut}
        </MenuItem>
  </Menu>
</Box>
}
export default AccountContainer;