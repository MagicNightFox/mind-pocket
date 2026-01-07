import DOMPurify from 'dompurify';
import {useState} from "react";
import {Paper, Box} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import {NOTE_COLORS} from "../constants.js";
const Note = (props) => {
  const {data, key, handleDelete, onClick} = props;
  const [elevation, setElevation] = useState(1);
  const safeHTML = DOMPurify.sanitize(data?.content?.html, {USE_PROFILES: {html: true}});
  const [isMouseOverDelete, setIsMouseOverDelete] = useState(false);
  return <Paper
    key={key}
    onClick={isMouseOverDelete ? handleDelete : onClick}
    onMouseEnter={() => setElevation(3)}
    onMouseLeave={() => setElevation(1)}
    elevation={elevation}
    sx={{bgcolor: NOTE_COLORS[data?.color] || NOTE_COLORS["yellow"],
      minWidth:"256px",
      maxWidth:"256px",
      cursor: "pointer",
      padding: "8px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      minHeight:"32px",
      flexShrink: 0,
      position: "relative"
    }}>
    {elevation === 3 && <Box position="absolute" display="flex" justifyContent="flex-end" right={8} >
      <IconButton
        onMouseEnter={() => setIsMouseOverDelete(true)}
        onMouseLeave={() => setIsMouseOverDelete(false)}>
        <DeleteIcon fontSize="small" color="error" />
      </IconButton>
    </Box>}
    <div style={{maxHeight: "0"}} dangerouslySetInnerHTML={{ __html: safeHTML }}/>
  </Paper>
}

export default Note;