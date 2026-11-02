import {Container, Box, CircularProgress, IconButton} from "@mui/material";
import ShortcutWidget from "../components/dashboard/shortcut-widget.jsx";
import TopBar from "../components/topbar/top-bar.jsx";
import Row from "../components/row.jsx";
import CalendarWidget from "../components/dashboard/calendar/calendar-widget.jsx";
import {useTimeFrame} from "../context/TimeFrameContext.jsx";
import {
  Add,
  AddBox, AddBoxOutlined,
  AddCircleOutline,
  AddCircleOutlined,
  ErrorOutline,
  ErrorOutlineOutlined, Expand
} from "@mui/icons-material";
import {useQuery} from "@tanstack/react-query";
import {listNotes} from "../calls.js";
import Note from "../components/notes/note.jsx";
import {QUERY_KEYS} from "../Constants.js";
import React, {useState} from "react";
import NoteCreateModal from "../components/notes/note-create-modal.jsx";
import Widget from "../components/widget.jsx";
import SettingsIcon from "@mui/icons-material/Settings";
import {useViewport} from "../context/ViewportContext.jsx";
import Page from "../components/page.jsx";
import ScheduleWidget from "../components/dashboard/schedule/schedule-widget.jsx";


const PersonalDashboard = () => {
  const {viewport} = useViewport();
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [expandedSchedule, setExpandedSchedule] = useState(false);
  const breadcrumbs = [
    {link: "/", title: "Personal"},
    {link: "/", title: "Dashboard"},
  ];
  const {data: notes, error, isLoading} = useQuery({queryKey:[QUERY_KEYS.noteQueryData], queryFn: listNotes});
  const actionBar = <Box display="flex">
    <IconButton size="small" onClick={()=> setOpenNoteModal(true)}><Add fontSize="small"/></IconButton>
    <IconButton size="small" > <SettingsIcon fontSize="small"/> </IconButton>
  </Box>;
  const scheduleActionBar = <Box display="flex">
    <IconButton size="small" onClick={() => setExpandedSchedule(!expandedSchedule)}> <Expand fontSize="small"/></IconButton>
  </Box>

  return <>
    <Page breadcrumbs={breadcrumbs}>
      <ShortcutWidget  />
      <Row display="grid" gap="16px" gridTemplateColumns={"1fr"}>
        <Widget title="Schedule" actionBar={scheduleActionBar}>
          <ScheduleWidget height={expandedSchedule ? 600 : undefined} />
        </Widget>
      </Row>
      <Row display="grid" gap="16px" gridTemplateColumns={viewport === "pc" ? "0.5fr 0.5fr 1fr" : "1fr"}>
        <Widget title="To-do">
          Item
        </Widget>
        <Widget title="Reminders">
          Item
        </Widget>
        <Widget title="Notes" actionBar={actionBar}>
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
        </Widget>
      </Row>
      <NoteCreateModal open={openNoteModal} onClose={()=> setOpenNoteModal(false)}/>
      <Row display="grid" gap="16px" gridTemplateColumns={viewport === "pc" ? "0.5fr 0.5fr 2fr" : "1fr"}>
        <Widget title="To-do">
          Item
        </Widget>
        <Widget title="Reminders">
          Item
        </Widget>
      </Row>
    </Page>
  </>
}

export default PersonalDashboard;