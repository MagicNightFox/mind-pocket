import {useAuth} from "../context/AuthContext.jsx";
import TopBar from "../components/topbar/top-bar.jsx";
import {Container, Box, useMediaQuery, useTheme} from "@mui/material";
import ShortcutWidget from "../components/dashboard/shortcut-widget.jsx";
import {useState} from "react";
import {updateSettings} from "../calls.js";
import NotesWidget from "../subapps/note-pocket/widgets/notes-widget.jsx";
import {DateCalendar} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {useViewport} from "../context/ViewportContext.jsx";
import Row from "../components/row.jsx";

const breadcrumbs = [
  {link: "/", title: "Personal"},
  {link: "/", title: "Dashboard"},
]

const PersonalDashboard = () => {
  const {user} = useAuth();
  const [shortcuts, setShortcuts] = useState(user.shortcuts);
  async function updateShortcuts(newShortcuts) {
    setShortcuts(newShortcuts);
    await updateSettings({shortcuts: newShortcuts});
  }
  return <>
  <TopBar breadcrumbList={breadcrumbs}/>
    <Container maxWidth="100%" sx={{display: "flex", flexDirection: "column"}} >
      <ShortcutWidget shortcuts={shortcuts} updateShortcuts={updateShortcuts} />
      <Row display="flex" gap="16px" width="100%" >
        <Box bgcolor="white" borderRadius="16px" display="flex"><DateCalendar readOnly/></Box>
        <NotesWidget />
      </Row>
    </Container>
  </>
}

export default PersonalDashboard;