import {Container, Box, CircularProgress} from "@mui/material";
import ShortcutWidget from "../components/dashboard/shortcut-widget.jsx";
import TopBar from "../components/topbar/top-bar.jsx";
import Row from "../components/row.jsx";
import CalendarWidget from "../components/dashboard/calendar/calendar-widget.jsx";
import {useTimeFrame} from "../context/TimeFrameContext.jsx";
import {ErrorOutline, ErrorOutlineOutlined} from "@mui/icons-material";
import {useQuery} from "@tanstack/react-query";
import {listNotes} from "../calls.js";
import Note from "../components/notes/note.jsx";
import {QUERY_KEYS} from "../Constants.js";


const PersonalDashboard = () => {
  const {currentDate, setCurrentDate} = useTimeFrame()
  const breadcrumbs = [
    {link: "/", title: "Personal"},
    {link: "/", title: "Dashboard"},
  ];
  const onDateChange = (value) => {
    setCurrentDate(value);
  }
  const {data: notes, error, isLoading} = useQuery({queryKey:[QUERY_KEYS.noteQueryData], queryFn: listNotes});
  return <>
  <TopBar breadcrumbList={breadcrumbs}/>
    <Container maxWidth="100%" sx={{display: "flex", flexDirection: "column"}} >
      <ShortcutWidget />
      <Row display="grid" gap="16px" gridTemplateColumns="300px 1fr">
        <Box bgcolor="white" borderRadius="16px">
        <CalendarWidget selectedDate={currentDate} onDateChange={onDateChange} />
        </Box>
        <Box bgcolor="white" borderRadius="16px" >
          <Box display="flex" flexDirection="row" gap="16px" padding="16px" maxHeight="324px">
            {
              isLoading ? <CircularProgress /> : (
                  error ? <ErrorOutline /> : (
                      notes?.data.map(note => {
                        return <Note data={note} content={JSON.stringify(note.editorContent)} />
                      })
                  )
              )
            }
          </Box>
        </Box>
      </Row>
    </Container>
  </>
}

export default PersonalDashboard;