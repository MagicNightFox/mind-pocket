import {TextField} from "@mui/material";
import {FICTION_SCHEMA} from "../../Constants.js"
const ArchiveFic = () => {

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

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    await AddFic(formJson);
    //handleClose();
  };

  return <>
    <form onSubmit={handleSubmit} id="archive-fic-form">
      <TextField
        autoFocus
        required
        margin="dense"
        id="title"
        name="title"
        label="Title"
        type="text"
        variant="outlined"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="linkToDisk"
        name="linkToDisk"
        label="Link to saved copy on disk"
        type="text"
        variant="outlined"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="linkToOriginal"
        name="linkToOriginal"
        label="Link to original"
        type="text"
        variant="outlined"
      />

    </form>
  </>
}

export default ArchiveFic;