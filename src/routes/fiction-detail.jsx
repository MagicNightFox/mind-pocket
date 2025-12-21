import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {
  Card,
  Chip,
  Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Divider,
  Grid, Modal,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import {FICTION_SCHEMA, STATUS} from "../Constants.js";
import TextEditor from "../components/TextEditor.jsx";
import TopBar from "../components/topbar/top-bar.jsx";

const InfoLine = (key, value) => {
  return <div>

  </div>
}
const FictionDetailPage = () => {


  const getStatusColor = (status) => {
    switch(status){
      case STATUS.completed: return "primary"
      default: return <></>;
    }
  }

  async function AddFic(data){
    fetch("http://localhost:3001/fiction/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Fiction updated:", data);
      })
      .catch(err => console.error("Error creating fiction:", err));
  }

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    await AddFic({_id: fiction.id, ...formJson});
    handleClose();
  };

  let params = useParams();
  let navigate = useNavigate();
  const [fiction, setFiction] = useState({});
  const [characters, setCharacters] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editable, setEditable] = useState(false)
  useEffect(() => {
    fetch(`http://localhost:3001/fiction/get?id=${params.id}`)
      .then(res => res.json())
      .then(data => {
        setFiction(data);
      })
      .catch(err => console.error("Error finding fiction:", err));
    fetch(`http://localhost:3001/character/list`)
      .then(res => res.json())
      .then(data => {
        setCharacters(data);
      })
      .catch(err => console.error("Error finding fiction:", err));
  }, []);
  return (<>
    <TopBar title="Reading Nook"/>
    <Container fluid style={{padding:"16px"}}>
      <Button variant="outlined" onClick={() => navigate(-1)}>
        <KeyboardReturnIcon />
        Back
      </Button>
      <Button variant="contained" onClick={() => setEditable(!editable)}>
        Edit
      </Button>
    </Container>

    <Dialog open={modalOpen} onClose={handleClose}>
      <DialogTitle>Archive</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <form onSubmit={handleSubmit} id="save-fic-form">
          <TextField
            autoFocus
            margin="dense"
            id="id"
            name="id"
            label="_id"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={fiction._id}
            disabled
          />
          {Object.entries(FICTION_SCHEMA).map(([key, value]) => (
            <TextField
              autoFocus
              margin="dense"
              id={key}
              name={key}
              label={value}
              type="text"
              fullWidth
              variant="standard"
              defaultValue={fiction[key]}
            />
          ))}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" form="save-fic-form">
          Save changes
        </Button>
      </DialogActions>
    </Dialog>

    {fiction &&
      <>
        <Container>
      <Paper>
        <Grid container spacing={2}>
          <Grid item size={3}>
            <div>{FICTION_SCHEMA.title}</div>
            <div>{FICTION_SCHEMA.chapters}</div>
            <div>{FICTION_SCHEMA.characters}</div>
            <div>{FICTION_SCHEMA.ffCathegory}</div>
            <div>{FICTION_SCHEMA.orCathegory}</div>
            <div>{FICTION_SCHEMA.genre}</div>
            <div>{FICTION_SCHEMA.original}</div>
            <div>{FICTION_SCHEMA.status}</div>
            <div>{FICTION_SCHEMA.tags}</div>
            <div>{FICTION_SCHEMA.linkToOriginal}</div>
            <div>{FICTION_SCHEMA.linkToDisk}</div>
          </Grid>
          <Grid item size={9}>
            <TextField variant="standard" value={fiction.title} fullWidth/>
            <TextField variant="standard" value={fiction.chapters || "-"} fullWidth/>
            <div>{fiction.characters || "-"}</div>
            <div>{fiction.ffCathegory || "-"}</div>
            <div>{fiction.orCathegory || "-"}</div>
            <div>{fiction.genre || "-"}</div>
            <div>{fiction.original || "-"}</div>
            <div><Chip size="small" variant="outlined" color="success" label={fiction.status} /></div>
            <div>{fiction.tags || "-"}</div>
            <div>{fiction.linkToOriginal || "-"}</div>
            <div>{fiction.linkToDisk || "-"}</div>
          </Grid>
        </Grid>
      </Paper>
          <TableContainer component={Paper}>
            <Table>
              <TableRow>
                <TableCell>{FICTION_SCHEMA.title}</TableCell>
                <TableCell>{fiction.title}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{FICTION_SCHEMA.chapters}</TableCell>
                <TableCell>{fiction.chapters}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{FICTION_SCHEMA.characters}</TableCell>
                <TableCell>{fiction.characters}</TableCell>
              </TableRow>
            </Table>
          </TableContainer>
          <h1 style={{textAlign:"center"}}>{fiction.title}</h1>
          <TextEditor defaultValue={fiction.content} />
        </Container>
        <iframe
          src={fiction.linkToDisk}
          style={{ width: "100%", height: "90vh", border: "none" }}
        ></iframe></>}
  </>)
}

export default FictionDetailPage;