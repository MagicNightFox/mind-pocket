import Box from "@mui/material/Box";
import Editor from "../../../components/Editor.jsx";
import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import IconButton from "@mui/material/IconButton";
import {useLang} from "../../../lang/LanguageContext.jsx";

const Delta = Quill.import("delta");

const NoteTextEditor = (props) => {
  const { defaultValue, onSubmit } = props;
  const {t} = useLang();

  const [range, setRange] = useState();
  const [readOnly, setReadOnly] = useState(false);

  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);

  const quillRef = useRef(null);

  const applyBold = () => {
    const format = !quillRef.current.getFormat().bold;
    quillRef.current.format("bold", format);
    setBold(format);
  };

  const applyItalic = () => {
    const format = !quillRef.current.getFormat().italic;
    quillRef.current.format("italic", format);
    setItalic(format);
  };

  const applyUnderline = () => {
    const format = !quillRef.current.getFormat().underline;
    quillRef.current.format("underline", format);
    setUnderline(format);
  };

  useEffect(() => {
    if (!quillRef.current) return;
    const format = quillRef.current.getFormat();
    setBold(!!format.bold);
    setItalic(!!format.italic);
    setUnderline(!!format.underline);
  }, [range]);

  const handleSubmit = () => {
    if (!quillRef.current || !onSubmit) return;
    // Choose ONE of these depending on what you want to store:
    const delta = quillRef.current.getContents();   // best for Quill
    const html = quillRef.current.root.innerHTML;   // best for rendering
    const text = quillRef.current.getText();        // plain text

    onSubmit({
      delta,
      html,
      text,
    });
  };

  return (
    <Box display="flex" height="100%" flexDirection="column" gap="8px">
      <Box display="flex" flexDirection="row" gap="8px" >
        <Box borderRadius="32px" bgcolor={bold ? "rgba(42,43,50,0.25)" : "transparent"}>
          <IconButton variant="text" onClick={applyBold} >
            <FormatBoldIcon fontSize="small"  sx={{color: "#252525"}}/>
          </IconButton>
        </Box>
        <Box borderRadius="32px" bgcolor={italic ? "rgba(42,43,50,0.25)" : "transparent"}>
          <IconButton variant="text" onClick={applyItalic}>
            <FormatItalicIcon fontSize="small" sx={{color: "#252525"}}/>
          </IconButton>
        </Box>
        <Box borderRadius="32px" bgcolor={underline ? "rgba(42,43,50,0.25)" : "transparent"}>
          <IconButton variant="text" onClick={applyUnderline}>
            <FormatUnderlinedIcon fontSize="small" sx={{color: "#252525"}}/>
          </IconButton>
        </Box>
      </Box>

      <Divider color="#252525" />

      <Box flexGrow={1} overflow="auto">
        <Editor
          ref={quillRef}
          readOnly={readOnly}
          defaultValue={defaultValue?.delta || new Delta().insert(defaultValue?.text )}
          onSelectionChange={setRange}
        />
      </Box>

      {/* ✅ SUBMIT BUTTON */}
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button variant="contained" onClick={handleSubmit} >
          {t.SubApps.NotePocket.NoteModal.Save}
        </Button>
      </Box>
    </Box>
  );
};

export default NoteTextEditor;
