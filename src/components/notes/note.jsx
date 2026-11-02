import {Box, Button, IconButton, Modal, Paper, Popover, Typography} from "@mui/material";
import {useState} from "react";
import {Delete, Edit} from "@mui/icons-material";
import {Editor} from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import {EditorContent} from "@tiptap/react";


const Note = (props) => {
    const {data, content, onDelete} = props;
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [isHovered, setHovered] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const noteEditor = new Editor({
        extensions: [StarterKit],
        editable: false
    })
    noteEditor.commands.setContent(JSON.parse(content));
    const onConfirmDelete = () => {
        setConfirmDeleteOpen(false);
        onDelete({id: data._id});
    }
    return <Paper
        elevation={isHovered? 3 : 1} onMouseEnter={() => setHovered(true)} onMouseLeave={()=> setHovered(false)}
        sx={{position:"relative", width: "196px", minHeight: "128px", background: "#ffffb2", padding: "8px", overflow: "hidden scroll", overflowWrap: "break-word", display: "flex", flexDirection: "column", flexShrink: 0}}
    >
        {isHovered && <Box display="flex" justifyContent="end" position="absolute" width="inherit" zIndex={2}>
            <IconButton size="small" onClick={(event) => {
                setAnchor(event.currentTarget);
                setConfirmDeleteOpen(true)
            }}><Delete color="error" fontSize="16pt"/></IconButton>
        </Box>}
        <Box padding="8px" overflow="scroll">
            <EditorContent editor={noteEditor} />
        </Box>
        <Popover anchorEl={anchor}
                 anchorOrigin={{
                     vertical: 'top',
                     horizontal: 'right',
                 }}
                 transformOrigin={{
                     vertical: 'top',
                     horizontal: 'right',
                 }}
                 open={confirmDeleteOpen}
                 onClose={()=> setConfirmDeleteOpen(false)}
        >
            <Button color="error" variant="contained" onClick={onConfirmDelete}>Confirm</Button>
        </Popover>

    </Paper>
}

export default Note