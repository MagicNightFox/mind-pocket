import {Typography, Box} from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import {useLang} from "../lang/LanguageContext.jsx";

const About = () => {

  const {t} = useLang();

  return  <Box textAlign="center" display="flex" flexDirection="column" justifyItems="center" width="100%">
    <QuestionMarkIcon fontSize="large" htmlColor="white" sx={{bgcolor: '#BDBDBD', borderRadius:"32px", margin:"auto"}}/>
    <Typography component="h1" variant="h4" padding="8px">{t.About.ReasonOfCreation.title}</Typography>
    <Typography component="p" variant="p" style={{whiteSpace: "pre-line"}}>{t.About.ReasonOfCreation.content}</Typography>
  </Box>
}

export default About;