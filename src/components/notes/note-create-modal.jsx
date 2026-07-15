import {Box, Button, Modal, Typography} from "@mui/material";
import {MenuBar} from "../editor/menu-bar.jsx";
import {EditorContent} from "@tiptap/react";
import NoteEditor from "./note-editor.jsx";
import {Editor} from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

const NoteCreateModal = (props) => {
    const noteEditor = new Editor({
        content: '<p>Example Text</p>',
        extensions: [StarterKit],
    })
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
    }
    const {open, onClose} = props;
    return <Modal open={open} onClose={onClose} >
        <Box style={style} >
            <MenuBar editor={noteEditor} />
            <EditorContent editor={noteEditor} />
            <Button onClick={()=> console.log(noteEditor.getJSON())}>Save</Button>
        </Box>
    </Modal>
}

export default NoteCreateModal