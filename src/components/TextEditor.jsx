import Box from "@mui/material/Box";
import Editor from "./Editor";
import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';

const Delta = Quill.import("delta");

const TextEditor = (props) => {
  const { defaultValue, onSubmit } = props;

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
    <Box border="1px solid #EDEDED" display="flex" height="100%" flexDirection="column">
      <Toolbar variant="dense">
        <Box borderRadius="16px" bgcolor={bold ? "#ededed" : "#FFFFFF"}>
          <Button variant="text" onClick={applyBold}>
            <FormatBoldIcon />
          </Button>
        </Box>

        <Box borderRadius="16px" bgcolor={italic ? "#ededed" : "#FFFFFF"}>
          <Button variant="text" onClick={applyItalic}>
            <FormatItalicIcon />
          </Button>
        </Box>

        <Box borderRadius="16px" bgcolor={underline ? "#ededed" : "#FFFFFF"}>
          <Button variant="text" onClick={applyUnderline}>
            <FormatUnderlinedIcon />
          </Button>
        </Box>
      </Toolbar>

      <Divider />

      <Box flexGrow={1} overflow="auto">
        <Editor
          ref={quillRef}
          readOnly={readOnly}
          defaultValue={new Delta().insert(defaultValue)}
          onSelectionChange={setRange}
        />
      </Box>

      {/* ✅ SUBMIT BUTTON */}
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default TextEditor;
