import {Container, Box, Button, Typography} from "@mui/material";
import UnauthTopBar from "../components/topbar/unauth-top-bar.jsx";
import {useLang} from "../lang/LanguageContext.jsx";

const AboutApp = () => {
  const {t} = useLang();
return <Box display="flex" flexDirection="column">
<UnauthTopBar />
<Container maxWidth="lg">
  <Box display="flex" flexDirection="column" justifyItems="center" width="100%">

  </Box>
</Container>
</Box>
}

export default AboutApp;