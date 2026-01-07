import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router";
import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, MenuItem, Select,
  TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import TopBar from "../../components/topbar/top-bar.jsx";
import CustomToolbar from "../../components/material-overrides/custom-toolbar.jsx";

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

const Fiction = () => {
  const [list, setList] = useState([]);
  const [characterList, setCharacterList] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    await AddFic(formJson);
    handleClose();
  };
  async function AddFic(data){
    fetch("http://localhost:3001/fiction/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Fiction created:", data);
      })
      .catch(err => console.error("Error creating fiction:", err));
  }

  useEffect(() => {
    fetch("http://localhost:3001/fiction/list")
      .then(res => res.json())
      .then(data =>
        setList(data.map(item => ({
          id: item._id,  // DataGrid needs this to be id not _id
          ...item
        })))
      )
      .catch(err => console.error(err)).then(
      fetch("http://localhost:3001/character/list")
        .then(res => res.json())
        .then(data => setCharacterList(data.map(item => ({
          id: item._id,
          fanficsRead: item.fanficsRead || 0,// DataGrid needs this to be id not _id
          ...item
        }))))
    )
  }, []);

  return (
    <>
      <TopBar title="Reading Nook"/>
      <Container maxWidth="lg">
        <Button variant="contained" color="primary" onClick={handleClickOpen}>Read a fic lol</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Archive</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText>
            <form onSubmit={handleSubmit} id="archive-fic-form">
              <TextField
                autoFocus
                required
                margin="dense"
                id="title"
                name="title"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="linkToDisk"
                name="linkToDisk"
                label="Link to saved copy on disk"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="linkToOriginal"
                name="linkToOriginal"
                label="Link to original"
                type="text"
                fullWidth
                variant="standard"
              />

            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="archive-fic-form">
              Add to archive
            </Button>
          </DialogActions>
        </Dialog>
      <h1>Fiction list</h1>
      <Box sx={{ height: 600, padding:"32px" }}>
        <DataGrid
          rows={list}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } }
          }}
          pageSizeOptions={[5, 10, 20]}
          onRowClick={(params) => {
            navigate("/fiction/" + params.id);
          }}
          disableRowSelectionOnClick
          showToolbar
          slots={{ toolbar: () => CustomToolbar({redirect: "/fiction/add", title: "Fiction"}) }}
        />
      </Box>


      </Container>
    </>
  );
};

export default Fiction;
