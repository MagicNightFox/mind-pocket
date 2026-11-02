import {Box, CircularProgress, Container} from "@mui/material";
import Note from "../../components/notes/note";
import React from "react";
import TopBar from "../../components/topbar/top-bar.jsx";
import Row from "../../components/row.jsx";
import {useNotes} from "../../context/NoteContext.jsx";

const breadcrumbs = [
    {link: "/", title: "Personal"},
    {link: "/notes", title: "Notes"},
];
const Dashboard = () => {
    const {data, error, isLoading, remove} = useNotes();
    if(isLoading){
        return <CircularProgress/>;
    }
    if(error){
        return <>Error</>;
    }
    else {
        return (
            <>
                <TopBar breadcrumbList={breadcrumbs}/>
                <Container maxWidth="100%" sx={{display: "flex", flexDirection: "column", gap: "16px"}}>
                    <Row padding="16px" bgcolor="white" borderRadius="16px" minHeight="128px">
                        <Box padding="16px" bgcolor="white" borderRadius="16px" minHeight="128px">
                            Number of notes: {data.data.length}
                        </Box>
                    </Row>
                    <Row bgcolor="white" borderRadius="16px" minHeight="128px">
                        <Box padding="16px" display="flex" flexDirection="row" overflow="hidden" flexWrap="wrap" gap="8px" alignItems="flex-start">
                            {data.data.map(note => {
                                return <Note data={note} onDelete={remove} content={JSON.stringify(note.editorContent)} />
                            })}
                        </Box>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Dashboard