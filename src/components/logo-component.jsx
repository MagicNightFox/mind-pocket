import {Box,Typography} from "@mui/material";
import logo from "../assets/logo/mp-logo-notext.png";

const unselectable= {
  userSelect: "none",
  msUserSelect: "none",
  MozUserSelect: "none",
  WebkitUserSelect: "none",
}

const size = 16;

const LogoComponent = (props) => {
  return <Box display="flex" alignItems="center" gap="4px" margin={0} {...props} >
    <img style={{maxHeight: "48px"}} src={logo} alt="MindPocket" loading="lazy"/>
    <Typography fontSize={size+"px"} style={unselectable} unselectable="on" fontWeight="bold" color="#2c55b2">Mind</Typography><Typography fontSize={size+"px"} style={unselectable} unselectable="on" fontWeight="bold" color="#34adcd">Pocket</Typography>
  </Box>
}

export default LogoComponent;