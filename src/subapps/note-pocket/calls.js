import axios from "axios";
import {BASE_URI} from "../../Constants.js";
axios.defaults.withCredentials = true;

async function listNotes(filter) {

  let response = await axios.get(`${BASE_URI}/note/list`);
  return response;
}

async function createNote(noteData) {
  let data = await axios.post(`${BASE_URI}/note/create`, noteData, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return data;
}

async function updateNote(noteData) {
  let data = await axios.post(`${BASE_URI}/note/update`, {
    id: noteData.id,
    content: noteData.content,
    color: noteData.color
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return data;
}

async function deleteNote(noteData) {
  let data = await axios.post(`${BASE_URI}/note/delete`, {
    id: noteData,
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return data;
}

export {
  listNotes,
  createNote,
  updateNote,
  deleteNote
};