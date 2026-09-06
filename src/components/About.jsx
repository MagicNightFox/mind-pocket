import {Typography, Box} from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

const About = () => {

  return  <Box textAlign="center" display="flex" flexDirection="column" justifyItems="center" width="100%">
    <QuestionMarkIcon fontSize="large" htmlColor="white" sx={{bgcolor: '#BDBDBD', borderRadius:"32px", margin:"auto"}}/>
    <Typography component="h1" variant="h4" padding="8px">Why I created this app</Typography>
    <Typography component="p" variant="p" style={{whiteSpace: "pre-line"}}>I started this project with my close friends and family in mind, as well as myself.
      I wanted to create something useful to me and others, so I thought about things and apps they usually use and tried to think of a way to make it easier for them to manage all they need. Most usually they used notes, todo-lists, shopping lists, communicated with their family about what to buy, if they have something at home or not → and usually what they used was just a basic chat and their phones' note app.

      So, I thought about creating something tethered to them, an app that would allow them to create notes that were shared across devices easily, todo-lists, possibly a schedule-manager, daily planner, household management with shopping lists and finances and whatnot.</Typography>
  </Box>
}

export default About;