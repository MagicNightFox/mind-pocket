import {Box, Divider, IconButton, Modal} from "@mui/material";
import {MenuBar} from "../editor/menu-bar.jsx";
import {EditorContent, useEditor} from "@tiptap/react";
import {Editor} from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {useNotes} from "../../context/NoteContext.jsx";


const NoteCreateModal = (props) => {
    const noteEditor = useEditor({
        extensions: [StarterKit],
    })
    const {create} = useNotes();
    const {open, onClose} = props;
    const style= {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        backgroundColor: '#fdfdfd',
        borderRadius: 16,
        padding: "8px",
        display: 'flex',
        flexDirection: 'column',
        gap: "8px"
    }
    const saveNote = () => {
        if(!noteEditor.isEmpty){
            const dtoIn = {
                editorContent: noteEditor.getJSON(),
                color: "yellow"
            }
            create(dtoIn);
            console.log(noteEditor.getHTML());
            noteEditor.commands.clearContent();
        }
        onClose()
    }
    return <Modal open={open} onClose={saveNote} >
        <Box style={style} >
            <MenuBar editor={noteEditor} />
            <Divider/>
            <Box maxHeight="256px" overflow="scroll"><EditorContent editor={noteEditor} /></Box>
            <Box display="flex" justifyContent="space-between">
                <IconButton onClick={() => {noteEditor.commands.clearContent(); onClose()}}> <DeleteOutlinedIcon color="error"/> </IconButton>

            </Box>
            <Box position="absolute" bottom={0} right="32px" display="none" gap="16px" alignItems="flex-end">
                <Box width="24px" height="24px" sx={{backgroundColor: "#FF8080", cursor: "pointer"}}/>
                <Box width="24px" height="24px" sx={{backgroundColor: "#80ff80", cursor: "pointer"}} />
                <Box width="24px" height="24px" sx={{backgroundColor: "#8080ff", cursor: "pointer"}} />
                <Box width="24px" height="24px" sx={{backgroundColor: "#ffff80", cursor: "pointer"}} />
            </Box>
        </Box>
    </Modal>
}

export default NoteCreateModal