import axios from "axios";
import {BASE_URI} from "./Constants.js";
axios.defaults.withCredentials = true;
async function register(dtoIn){
  let data = await axios.post(`${BASE_URI}/user/register`, {
    username: dtoIn.username, password: dtoIn.password
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return data;
}

async function listCharacters() {

  let response = await axios.get(`${BASE_URI}/character/list`);
  return response;
}

async function getCharacter(id) {
  let response = await axios.get(`${BASE_URI}/character?id=${id}`);
  return response;
}

async function createCharacter() {

}

async function getMe() {
  let data = await axios.get(`${BASE_URI}/user/getMe`);
  return data;
}

async function grantToken() {
  let data = await axios.post(`${BASE_URI}/user/grantToken`);
  return data;
}

async function loginUser(dtoIn) {
  let data = await axios.post(`${BASE_URI}/user/login`, {
    username: dtoIn.username, password: dtoIn.password
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return data;
}

async function logoutUser() {
  let {data} = await axios.post(`${BASE_URI}/user/logout`, {}, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return data;
}

async function update(updatedData){
  let {data} = await axios.post(`${BASE_URI}/user/update`, updatedData, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return data;
}

async function listNotes() {
  let response = await axios.get(`${BASE_URI}/note/list`);
  return response;
}

async function createNote(noteData) {
  let data = await axios.post(`${BASE_URI}/note/create`, {
    noteData
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return data;
}

export {
  register,
  listCharacters,
  getCharacter,
  createCharacter,
  getMe,
  grantToken,
  loginUser,
  logoutUser,
  update,
  listNotes,
  createNote
}