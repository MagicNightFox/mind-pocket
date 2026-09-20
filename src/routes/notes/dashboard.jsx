import {useQuery} from "@tanstack/react-query";
import {notes} from "../../calls.js";
import {Box, CircularProgress, Container, Typography} from "@mui/material";
import Note from "../../components/notes/note";
import {QUERY_KEYS} from "../../Constants.js";
import React from "react";
import TopBar from "../../components/topbar/top-bar.jsx";
import Row from "../../components/row.jsx";

const breadcrumbs = [
    {link: "/", title: "Personal"},
    {link: "/notes", title: "Notes"},
];
const Dashboard = () => {
    const {data, error, isLoading} = useQuery({queryKey:[QUERY_KEYS.noteQueryData], queryFn: notes.list});
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
                <Container maxWidth="100%" sx={{display: "flex", flexDirection: "column"}}>
                    <Row padding="16px" bgcolor="white" borderRadius="16px" minHeight="128px">
                        <Box display="flex" flexDirection="row" overflow="hidden" flexWrap="wrap" gap="8px" alignItems="flex-start">
                            {data.data.map(note => {
                                return <Note data={note} content={JSON.stringify(note.editorContent)} />
                            })}
                        </Box>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Dashboard