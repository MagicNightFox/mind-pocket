import {Editor} from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import {MenuBar} from "../editor/menu-bar.jsx";
import {EditorContent} from "@tiptap/react";

const NoteEditor = () => {
    const noteEditor = new Editor({
        content: '<p>Example Text</p>',
        extensions: [StarterKit],
    })

    return (
        <>
            <MenuBar editor={noteEditor} />
            <EditorContent editor={noteEditor} />
        </>
    )
}

export default NoteEditor;