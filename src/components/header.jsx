import {useState} from "react";
import {Link as ReactLink} from "react-router";
import {Avatar, AppBar, Box, Toolbar, Typography, Link, useMediaQuery, useTheme} from "@mui/material";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
const Header = (props) => {
  const {title} = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const phone = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static" >
          <Toolbar>
            {phone && <IconButton
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <Button color="inherit"><Link component={ReactLink} to="/profile"><Avatar /></Link></Button>
          </Toolbar>
        </AppBar>
      </Box>

  )
}

export default Header;