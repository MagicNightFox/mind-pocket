import {Box,Modal} from "@mui/material";
import NoteTextEditor from "./note-text-editor.jsx";
import {useState} from "react";
import Button from "@mui/material/Button";
import {NOTE_COLORS} from "../constants.js";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  height: "50%",
  width: "25%",
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
  p:1
};


const NoteModal = (props) => {
  const {open, handleClose, onSubmit, data} = props;
  const [color, setColor] = useState(data?.color || "yellow");
  return <Modal
    open={open}
    onClose={handleClose}
  >
    <Box sx={modalStyle} bgcolor={NOTE_COLORS[color]}>
      <Box display="flex" width="100%" justifyContent="flex-end" gap="8px" >
        {Object.entries(NOTE_COLORS).map(([key, value]) => (
          <Box bgcolor={value} key={key} width="16px" height="16px"
               border={color === key ? "1px solid black" : null}
               sx={{cursor: 'pointer'}}
               onClick={() => setColor(key)}/>
        ))}
      </Box>
      <NoteTextEditor defaultValue={data && data.content} onSubmit={(submittedData) => onSubmit({content: submittedData, color})}/>
    </Box>
  </Modal>
}

export default NoteModal;