import {Box, Button, IconButton, Modal, Paper, Popover, Typography} from "@mui/material";
import {useState} from "react";
import {Delete, Edit} from "@mui/icons-material";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteNote} from "../../calls.js";
import {QUERY_KEYS} from "../../Constants.js";
import {Editor} from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import {EditorContent} from "@tiptap/react";


const Note = (props) => {
    const {data, content, onDeleted} = props;
    const queryClient = useQueryClient();
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [isHovered, setHovered] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const noteEditor = new Editor({
        extensions: [StarterKit],
    })
    noteEditor.commands.setContent(JSON.parse(content));
    const mutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.noteQueryData] })
        },
    })
    const onConfirmDelete = () => {
        setConfirmDeleteOpen(false);
        mutation.mutate({id: data._id});
        onDeleted();
    }
    return <Paper
        elevation={isHovered? 3 : 1} onMouseEnter={() => setHovered(true)} onMouseLeave={()=> setHovered(false)}
        sx={{position:"relative", width: "196px", minHeight: "128px", background: "#ffff80", padding: "8px", overflow: "hidden scroll", overflowWrap: "break-word", display: "flex", flexDirection: "column"}}
    >
        <Box display="flex" justifyContent="space-between">
            <IconButton size="small"><Edit fontSize="16pt"/></IconButton>
            <IconButton size="small" onClick={(event) => {
                setAnchor(event.currentTarget);
                setConfirmDeleteOpen(true)
            }}><Delete color="error" fontSize="16pt"/></IconButton>
        </Box>
        <Box padding="8px" overflow="scroll" sx={{backgroundColor:"#ffffb2", boxShadow: "inset 0px 0px 4px 0px rgba(0,0,0,0.10)", }}>
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