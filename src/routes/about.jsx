import {Box, Container} from "@mui/material";
import About from "../components/About.jsx";
import TopBar from "../components/topbar/top-bar.jsx";

const AboutPage = () => {
  const breadcrumbs = [
    {link: "/about", title: "About"},
  ];

  return <Box display="flex" flexDirection="column">
    <TopBar breadcrumbList={breadcrumbs}/>
    <Container maxWidth="100%" sx={{display: "flex", flexDirection: "column"}} >
      <About />
    </Container>
  </Box>
}

export default AboutPage;