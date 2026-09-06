import {useQuery} from "@tanstack/react-query";
import {listNotes} from "../../calls.js";
import {CircularProgress, Typography} from "@mui/material";
import Note from "../../components/notes/note";

const Dashboard = () => {
    const {data: notes, error, isLoading} = useQuery({queryKey:["noteData"], queryFn: listNotes});
    if(isLoading){
        return <CircularProgress/>;
    }
    if(error){
        return <>Error</>;
    }
    else {
        notes.data.map(note => {
            console.log(note);
        })
        return (
            <>
                {notes.data.map(note => {
                    return <Note data={note} content={JSON.stringify(note)}> {JSON.stringify(note)} </Note>
                })}
            </>
        )
    }
}

export default Dashboard