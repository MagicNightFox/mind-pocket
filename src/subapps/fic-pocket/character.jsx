import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {Container, Grid, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import {DataGrid} from "@mui/x-data-grid";
import CharacterDetail from "./character-detail.jsx";
import TopBar from "../../components/topbar/top-bar.jsx";

const columns = [
  { field: "title", headerName: "Title", width: 200 },
  { field: "characters", headerName: "Characters", width: 200 },
  { field: "ffCathegory", headerName: "Fanfic Category", width: 180 },
  { field: "orCathegory", headerName: "Origin Category", width: 180 },
  { field: "genre", headerName: "Genre", width: 120 },
  { field: "original", headerName: "Original", width: 120 },
  { field: "status", headerName: "Status", width: 120 },
  { field: "tags", headerName: "Tags", width: 120 },
  { field: "finishedReading", headerName: "FinishedReading", width: 120 },
  { field: "notes", headerName: "Notes", width: 120 },
  { field: "linkToOriginal", headerName: "Original Link", width: 120 },
  { field: "summary", headerName: "Summary", width: 120 }
];

const Character = () => {
  let params = useParams();
  let navigate = useNavigate();
  const [character, setCharacter] = useState({});
  const [fictionList, setFictionList] = useState([]);
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:3001/character/get?id=${params.id}`)
      .then(res => res.json())
      .then(data => {
        setCharacter(data);
      })
      .catch(err => console.error("Error creating character:", err)).then(
      fetch("http://localhost:3001/fiction/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({characters: character._id})
      })
        .then(res => res.json())
        .then(data =>
          setFictionList(data.map(item => ({
            id: item._id,  // DataGrid needs this to be id not _id
            ...item
          })))
        )
        .catch(err => console.error(err))
    )

  }, []);
  return <>
    <TopBar title="Goon Cave"/>
    <Container fluid>
    <CharacterDetail character={character} />
      <Box sx={{ height: 600, padding:"32px" }}>
        <DataGrid
          rows={fictionList}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } }
          }}
          pageSizeOptions={[5, 10, 20]}
          onRowClick={(params) => {
            navigate("/fiction/" + params.id);
          }}
          disableRowSelectionOnClick
        />
      </Box>

    </Container>
  </>
}

export default Character;