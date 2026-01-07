
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from "@mui/material/IconButton";
import {CircularProgress, Box, Button} from "@mui/material";
import {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createNote, deleteNote, listNotes, updateNote} from "../calls.js";
import Widget from "../../../components/widget.jsx"
import Note from "../components/note.jsx"
import NoteModal from "../components/note-modal.jsx";
import {useLang} from "../../../lang/LanguageContext.jsx";

const NotesWidget = () => {
  const {t} = useLang();
  const [selectedNote, setSelectedNote] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient()
  const {data: notes, error, isLoading} = useQuery({queryKey:["notesData"], queryFn: listNotes});
  async function Submit(data){
    if(!selectedNote){createMutation.mutate(data)}
    else updateMutation.mutate({id:selectedNote._id, ...data});
    handleClose();
  }

  function handleClose(){
    setOpenModal(false);
    setSelectedNote(null);
  }

  async function handleDelete(id){
    deleteMutation.mutate(id);
  }

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['notesData'] })
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['notesData'] })
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notesData'] })
    },
  });

  if(isLoading){
    return <CircularProgress/>;
  }
  if(error){
    return <></>;
  }
  const sorted = notes.data.sort((a,b) => {
    return (new Date(b.updatedAt) - new Date(a.updatedAt))
  }).slice(0,10);

  return <Widget title={t.SubApps.NotePocket.NotesWidget.Notes} flexGrow={1} actionbar={
    <IconButton size="small" onClick={() => {
      setSelectedNote(null);
      setOpenModal(true)
    }}>
      <AddCircleOutlineIcon />
    </IconButton>
  }>
    <Box gap="16px"
         display="flex"
         flexDirection="row"
         padding="8px"
         sx={{
           overflowX:"auto",
           overflowY:"hidden",
           height: "100%",
         }}
    >
      {sorted.map((note) => (
        <Note key={note._id} data={note}
              onClick={() => {
                setSelectedNote(note);
                setOpenModal(true);
              }}
              handleDelete={() => handleDelete(note._id)}/>
      ))}
      <Button>{t.SubApps.NotePocket.NotesWidget.SeeMore}</Button>
    </Box>
    <NoteModal data={selectedNote} open={openModal} handleClose={handleClose} onSubmit={Submit}/>
  </Widget>
}

export default NotesWidget;