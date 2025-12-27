import {Box, Typography, Container, Button} from "@mui/material";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import {Link as ReactLink} from "react-router";
const PageNotFound = () => {
  return <Container>
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="16px" height="80vh">
      <Box>
        <Typography variant="h5" component="h2" textAlign="center">404 Error</Typography>
        <Typography variant="p" component="p" textAlign="center">Oops! The page you're looking for does not exist.</Typography>
      </Box>
      <Box display="flex" flexDirection="row" gap="16px">
        <Button sx={{gap: "8px"}} variant="outlined" color="primary" component={ReactLink} to={-1}><KeyboardReturnIcon />Back</Button>
        <Button variant="contained" color="primary" component={ReactLink} to="/">Home</Button>
      </Box>
    </Box>
  </Container>
}

export default PageNotFound