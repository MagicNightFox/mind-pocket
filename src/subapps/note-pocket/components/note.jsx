import {useState} from "react";
import {Paper} from "@mui/material";
import DOMPurify from 'dompurify';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {NOTE_COLORS} from "../constants.js";
const Note = (props) => {
  const {data, key, handleDelete, onClick} = props;
  const [elevation, setElevation] = useState(1);
  const safeHTML = DOMPurify.sanitize(data?.content?.html, {USE_PROFILES: {html: true}});
  const width= 256;
  const [isMouseOverDelete, setIsMouseOverDelete] = useState(false);
  return <Paper
    key={key}
    onClick={isMouseOverDelete ? handleDelete : onClick}
    onMouseEnter={() => setElevation(3)}
    onMouseLeave={() => setElevation(1)}
    elevation={elevation}
    sx={{bgcolor: NOTE_COLORS[data?.color] || "#FFFDCC",
      width: `${width}px`,
      cursor: "pointer",
      padding: "8px",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      margin: "4px",
      maxHeight:"128px",
      minHeight:"32px"
    }}>
    {elevation > 1 && <Box position="absolute" width={width + "px"} display="flex" justifyContent="flex-end">
      <IconButton
        onMouseEnter={() => setIsMouseOverDelete(true)}
        onMouseLeave={() => setIsMouseOverDelete(false)}>
        <DeleteIcon fontSize="small" color="error" />
      </IconButton>
    </Box>}
    <div dangerouslySetInnerHTML={{ __html: safeHTML }}/>
  </Paper>
}

export default Note;