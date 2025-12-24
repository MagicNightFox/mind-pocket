import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";
import {useNavigate} from "react-router";
import Button from "@mui/material/Button";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import {Grid, TextField} from "@mui/material";
import {useState} from "react";

const PROPERTIES = ["_id", "name", "origin", "genre", "series", "simpedSince", "dateAdded", "imageUrl", "updatedAt", "createdAt"];
const CharacterDetail = (props) => {
 const {character} = props;
 const navigate = useNavigate();
 const [edit, setEdit] = useState(false);
  return <>
    <Button variant="outlined" onClick={() => navigate(-1)}>
      <KeyboardReturnIcon />
      Back
    </Button>
    <Grid container spacing={2} alignItems="center">
      <Grid item size={4}><img
        src={`${character.imageUrl}?w=164&h=164&fit=crop&auto=format`}
        alt={character.name}
        loading="lazy"
        style={{ objectFit: "fill" }}
      /></Grid>
      <Grid item size={8}>
        <Box margin={2}><TextField fullWidth disabled label={PROPERTIES[0]} value={character[PROPERTIES[0]]} /></Box>
        <Box margin={2}><TextField fullWidth disabled label={PROPERTIES[1]} value={character[PROPERTIES[1]]} /></Box>
        <Box margin={2}><TextField fullWidth disabled label={PROPERTIES[2]} value={character[PROPERTIES[2]]} /></Box>
        <Box margin={2}><TextField fullWidth disabled label={PROPERTIES[3]} value={character[PROPERTIES[3]]} /></Box>
      </Grid>
    </Grid>
    {Object.entries(character).map(([key, value]) => {
      return <Box margin={2}>
        <TextField fullWidth label={key} value={value} disabled={!edit} />
      </Box>
    })}
    <Button variant="contained" color="primary" onClick={() => setEdit(!edit)}>Edit</Button>
    {edit && <Button variant="contained" color="primary" onClick={() => setEdit(!edit)}>Save</Button>}
  </>
}

export default CharacterDetail;