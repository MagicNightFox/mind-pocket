import {Box,Modal} from "@mui/material";
import NoteTextEditor from "./note-text-editor.jsx";
import {useEffect, useState} from "react";
import {NOTE_COLORS} from "../constants.js";
import {useViewport} from "../../../context/ViewportContext.jsx";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  height: "50%",
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
  p:1
};


const NoteModal = (props) => {
  const {open, handleClose, onSubmit, data} = props;
  const [color, setColor] = useState(null);
  const viewport = useViewport();

  const setNoteColor = (clickedColor) => {
    setColor(clickedColor);
  }
  return <Modal
    open={open}
    onClose={(e) => {
      setColor(null);
      handleClose(e)
    }}
  >
    <Box sx={{...modalStyle, width: viewport === "phone" ? "90%" : "25%"}} bgcolor={NOTE_COLORS[color || color?.data || "yellow"]}>
      <Box display="flex" width="100%" justifyContent="flex-end" gap="8px" >
        {Object.entries(NOTE_COLORS).map(([key, value]) => (
          <Box bgcolor={value} key={key} width="16px" height="16px"
               border={color === key ? "1px solid black" : null}
               sx={{cursor: 'pointer'}}
               onClick={() => setNoteColor(key)}/>
        ))}
      </Box>
      <NoteTextEditor defaultValue={data && data.content} onSubmit={(submittedData) => {
        if(!color) setColor("yellow");
        onSubmit({content: submittedData, color})
        setColor(null);
      }}/>
    </Box>
  </Modal>
}

export default NoteModal;