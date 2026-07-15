import {useNavigate, useParams} from "react-router";
import {useState} from "react";
import Button from "@mui/material/Button";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import {CircularProgress, Container, Grid, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import TopBar from "../../components/topbar/top-bar.jsx";
import {useQuery} from "@tanstack/react-query";
import {getCharacter} from "../../calls.js";

const PROPERTIES = ["_id", "name", "origin", "genre", "series", "simpedSince", "dateAdded", "imageUrl", "updatedAt", "createdAt"];

const CharacterDetailRoute = () => {
    let {characterId} = useParams();
    const {data: character, error, isLoading} = useQuery({queryKey:["characterData", characterId], queryFn: () => getCharacter(characterId)});
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    const breadcrumbs = [
        {link: "/fiction", title: "Fiction Hub"},
        {link: "/fiction/character/list", title: "Simp List"},
        {link: `/fiction/character/${character?.data?._id}`, title: character?.data?.name}
    ];
    if(isLoading){
        return <CircularProgress/>;
    }
    if(error){
        return <></>;
    }
    return <>
        <TopBar breadcrumbList={breadcrumbs}/>
        <Container maxWidth="100%" sx={{display: "flex", flexDirection: "column"}} >
            <Box display="flex" maxHeight="128px">
                <img src={character?.data?.imageUrl} alt={character?.data?.name} style={{borderRadius: "16px", maxHeight: "inherit"}}/>
                <Box display="flex" justifyItems="spaceBetween" flexGrow={1}>
                    <Typography variant="h2" component="h2" sx={{ flexGrow: 1, alignSelf: "center" }}>{character?.data?.name}</Typography>
                    <Box>
                        <Button variant="outlined" onClick={() => navigate(-1)}>
                        <KeyboardReturnIcon />
                        Back
                    </Button>
                        <Button variant="contained" color="primary" onClick={() => setEdit(!edit)}>Edit</Button>
                        {edit && <Button variant="contained" color="primary" onClick={() => setEdit(!edit)}>Save</Button>}
                    </Box>
                </Box>
            </Box>
        <Grid container spacing={2} alignItems="center">
            <Grid item size={4}></Grid>
            <Grid item size={8}>
            </Grid>
        </Grid>
        {Object.entries(character.data).map(([key, value]) => {
            return <Box margin={2}>
                <TextField fullWidth label={key} value={value} disabled={!edit} />
            </Box>
        })}

        </Container>
    </>
}
export default CharacterDetailRoute