import {Box, Typography} from "@mui/material";
import CopyrightIcon from '@mui/icons-material/Copyright';

const CopyrightComponent = (props) => {
  return <Box display="flex" gap="4px" color="#BDBDBD" flexDirection="row" justifyContent="center" bottom="8px" position="absolute" width="100%" {...props} >
    <CopyrightIcon fontSize="12px"/>
    <Typography component="p" fontSize="12px">2025, Nikola Trpková</Typography>
  </Box>
}

export default CopyrightComponent;
