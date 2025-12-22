import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Tooltip
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import {useState} from "react";
import Box from "@mui/material/Box";
import {useAuth} from "../../context/AuthContext.jsx";
import {update} from "../../calls.js";


const ShortcutWidget = () => {
  const {user} = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [shortcut, setShortcut] = useState(false);
  function handleEditShortcut(item){
    setShortcut(item);
    setModalOpen(true);
  }
  function handleClose(){
    setModalOpen(false);
    setShortcut(undefined);
  }

  async function handleSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    await update({id: user.id, shortcuts: [...user.shortcuts, formJson]});
    handleClose();
  }

  return <Box>
    {user?.shortcuts?.map((item, i) => (
      <Tooltip title={item.title} key={"shortcut" + i}>
        <IconButton href={item.url} target="_blank" rel="noopener noreferrer">
          <Avatar sx={{height: "64px", width: "64px"}} src={item.iconUrl || item.uri+"/favicon.ico"} alt={item.title}>{item.title[0]}</Avatar>
        </IconButton>
      </Tooltip>
      ))
}
<IconButton variant="contained" onClick={handleEditShortcut}>
  <Avatar sx={{height: "64px", width: "64px", border: "2px dashed lightgray", bgcolor: "transparent", color: "lightgray"}}>+</Avatar>
</IconButton>
    <Dialog open={modalOpen} onClose={handleClose}>
      <DialogTitle>Shortcut</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add your shortcut!
        </DialogContentText>
        <form onSubmit={handleSubmit} id="update-shortcuts-form">
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="title"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={shortcut?.title}
          />
          <TextField
            autoFocus
            margin="dense"
            id="url"
            name="url"
            label="link"
            type="url"
            fullWidth
            variant="standard"
            defaultValue={shortcut?.url}
          />
          <TextField
            autoFocus
            margin="dense"
            id="iconurl"
            name="iconurl"
            label="icon link"
            type="url"
            fullWidth
            variant="standard"
            defaultValue={shortcut?.url}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" form="update-shortcuts-form">
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  </Box>

}
export default ShortcutWidget;