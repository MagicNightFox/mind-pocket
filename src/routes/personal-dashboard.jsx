import TopBar from "../components/topbar/top-bar.jsx";
import {Container, Box} from "@mui/material";
import ShortcutWidget from "../components/dashboard/shortcut-widget.jsx";
import NotesWidget from "../subapps/note-pocket/widgets/notes-widget.jsx";
import {DateCalendar} from "@mui/x-date-pickers";
import Row from "../components/row.jsx";
import {useLang} from "../lang/LanguageContext.jsx";



const PersonalDashboard = () => {
  const {t} = useLang();

  const breadcrumbs = [
    {link: "/", title: t.Breadcrumbs.Personal},
    {link: "/", title: t.Breadcrumbs.Dashboard},
  ];

  return <>
  <TopBar breadcrumbList={breadcrumbs}/>
    <Container maxWidth="100%" sx={{display: "flex", flexDirection: "column"}} >
      <ShortcutWidget />
      <Row display="flex" gap="16px">
        <Box bgcolor="white" borderRadius="16px" display="flex"><DateCalendar readOnly/></Box>
        <NotesWidget />
      </Row>
    </Container>
  </>
}

export default PersonalDashboard;