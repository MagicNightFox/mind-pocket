import {Box, Container} from "@mui/material";
import UnauthTopBar from "../../components/unauthenticated/unauth-top-bar.jsx";
import About from "../../components/About.jsx";

const AboutApp = () => {
return <Box display="flex" flexDirection="column">
  <UnauthTopBar />
  <Container maxWidth="lg">
    <About />
  </Container>
</Box>
}

export default AboutApp;