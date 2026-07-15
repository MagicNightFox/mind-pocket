import {useQuery, useQueryClient} from "@tanstack/react-query";
import { EditorContent, useEditor } from '@tiptap/react'
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import {MenuBar} from "../../components/editor/menu-bar.jsx";
import {listCharacters, listNotes} from "../../calls.js";

const Dashboard = () => {
    const {data: notes, error, isLoading} = useQuery({queryKey:["noteData"], queryFn: listNotes});
    const editor = new Editor({
        content: '<p>Example Text</p>',
        extensions: [StarterKit],
    })

    return (
        <>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
            {notes}
        </>
    )
}

export default Dashboard