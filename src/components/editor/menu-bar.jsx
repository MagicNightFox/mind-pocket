
import { useEditorState } from '@tiptap/react'
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

import { menuBarStateSelector } from './menu-bar-state.jsx'
import {Button, ToggleButton} from "@mui/material";


const buttonStyle_active = {backgroundColor: "lightgray"}
const buttonStyle = {};

const MenuBarButton = (props) => {
    const {onClick, disabled, className, style, children, state, value} = props;
    return <ToggleButton value={value || "toggle"} className={className}
                   onClick={onClick}
                   disabled={disabled}
                   size="small"
                   style={state ? {border: "none", cursor: 'pointer', backgroundColor: "lightgray"} : {border: "none", cursor: 'pointer'}}
    >
        {children}
    </ToggleButton>
}

export const MenuBar = ({ editor }) => {
    const editorState = useEditorState({
        editor,
        selector: menuBarStateSelector,
    })

    if (!editor) {
        return null
    }

    return (
        <div className="control-group">
            <div className="button-group" style={{gap: "1px"}}>
                <MenuBarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editorState.canBold}
                    className={editorState.isBold ? 'is-active' : 'tiptap-editor-button'}
                    state={editorState.isBold}
                    style={editorState.isBold ? {...buttonStyle, ...buttonStyle_active} : buttonStyle }
                >
                    <FormatBoldIcon/>
                </MenuBarButton>
                <MenuBarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editorState.canItalic}
                    className={editorState.isItalic ? 'is-active' : ''}
                    style={editorState.isItalic ? {...buttonStyle, ...buttonStyle_active} : buttonStyle }
                >
                    <FormatItalicIcon />
                </MenuBarButton>
                <MenuBarButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editorState.canStrike}
                    className={editorState.isStrike ? 'is-active' : ''}
                    style={editorState.isStrike ? {...buttonStyle, ...buttonStyle_active} : buttonStyle }
                >
                    <FormatStrikethroughIcon />
                </MenuBarButton>
                <MenuBarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo}>
                    <UndoIcon />
                </MenuBarButton>
                <MenuBarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo}>
                    <RedoIcon />
                </MenuBarButton>
            </div>
        </div>
    )
}

