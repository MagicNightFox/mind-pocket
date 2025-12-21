import Widget from "../widget.jsx";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from "@mui/material/IconButton";
import {CircularProgress, Modal, Paper, TextareaAutosize} from "@mui/material";
import {useState} from "react";
import Box from "@mui/material/Box";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router";
import {createCharacter, createNote, listCharacters, listNotes} from "../../calls.js";
import Typography from "@mui/material/Typography";
import TextEditor from "../TextEditor.jsx";

const Note = ({content, onClick}) => {
  const [elevation, setElevation] = useState(1);
  return <Paper
    onClick={onClick}
    onMouseEnter={() => setElevation(3)}
    onMouseLeave={() => setElevation(1)}
    elevation={elevation}
    sx={{bgcolor: "#FFFDCC",
      width: "256px",
      cursor: "pointer",
      padding: "8px",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      margin: "4px"
    }}>
    {content}
  </Paper>
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const NotesWidget = ({style}) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient()
  const {data: notes, error, isLoading} = useQuery({queryKey:["notesData"], queryFn: listNotes});
  async function Submit(data){
    console.log(data.text)
    console.log(data.html)
    console.log(data.delta)
    //if(New) createMutation.mutate(data);
    //else updateMutation.mutate(data);
  }

  function handleClose(){
    setOpenModal(false);
  }

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['notesData'] })
    },
  });

  const updateMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['notesData'] })
    },
  });
  if(isLoading){
    return <CircularProgress/>;
  }
  if(error){
    return <></>;
  }
  return <Widget title={"Notes"} style={style} actionBar={
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
         height="100%"
         style={{
           overflowX:"auto",
           overflowY:"hidden",
         }}
    >
      {notes.data.map((note) => (
        <Note content={note.content} key={note.id} title={note.title} onClick={() => {
          setSelectedNote(note);
          setOpenModal(true);
        }}/>
      ))}
    </Box>
    <Modal
      open={openModal}
      onClose={handleClose}
    >
      <Box sx={modalStyle}>
        <TextEditor defaultValue={selectedNote?.content} onSubmit={Submit}/>
      </Box>
    </Modal>
  </Widget>
}

export default NotesWidget;