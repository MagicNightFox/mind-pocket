
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from "@mui/material/IconButton";
import {CircularProgress, Box} from "@mui/material";
import {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createNote, deleteNote, listNotes, updateNote} from "../calls.js";
import Widget from "../../../components/widget.jsx"
import Note from "../components/note.jsx"
import NoteModal from "../components/note-modal.jsx";

const NotesWidget = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient()
  const {data: notes, error, isLoading} = useQuery({queryKey:["notesData"], queryFn: listNotes});
  async function Submit(data){
    console.log(data)
    if(!selectedNote){createMutation.mutate(data)}
    else updateMutation.mutate({id:selectedNote._id, content: data});
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
  })
  return <Widget title={"Notes"} flexGrow={1} actionBar={
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
         style={{
           overflowX:"auto",
           overflowY:"hidden",
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
    </Box>
    <NoteModal data={selectedNote} open={openModal} handleClose={handleClose} onSubmit={Submit}/>
  </Widget>
}

export default NotesWidget;