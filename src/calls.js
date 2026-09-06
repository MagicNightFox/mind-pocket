import axios, {AxiosError} from "axios";
import {SERVER_BASE_URI as BASE_URI} from "./Constants.js";
axios.defaults.withCredentials = true;
async function register(dtoIn){
  let data;
  try {
    data = await axios.post(`${BASE_URI}/user/register`, {
      ...dtoIn
    }, {
      headers: {
        'Content-Type': 'application/json',
        credentials: "include"
      }
    });
  } catch (e) {
    if(e instanceof AxiosError){
      data = {error: e.response.data};
    }
  }
  return data;
}

async function listCharacters() {

  let response = await axios.get(`${BASE_URI}/character/list`);
  return response;
}

async function getCharacter(id) {
  let response = await axios.get(`${BASE_URI}/character/get?id=${id}`);
  return response;
}

async function createCharacter() {

}

async function getMe() {

  let data = await axios.get(`${BASE_URI}/user/getMe`, {credentials: "include"});

  return data;
}

async function grantToken() {
  let data = await axios.post(`${BASE_URI}/user/grantToken`, {credentials: "include"});
  return data;
}

async function loginUser(dtoIn) {
  let data;
  try{
    data = await axios.post(`${BASE_URI}/user/login`, {
      username: dtoIn.username, password: dtoIn.password
    }, {
      headers: {
        'Content-Type': 'application/json',
        credentials: "include"
      }
    });
  } catch (e){
    if(e instanceof AxiosError){
      data = {error: e.response.data};
    }
  }
  return data;
}

async function logoutUser() {
  let {data} = await axios.post(`${BASE_URI}/user/logout`, {}, {
    headers: {
      'Content-Type': 'application/json',
      credentials: "include"
    }
  })
  return data;
}

async function update(updatedData){
  let {data} = await axios.post(`${BASE_URI}/user/update`, updatedData, {
    headers: {
      'Content-Type': 'application/json',
      credentials: "include"
    }
  })
  return data;
}

//* NOTES *//

async function listNotes() {
  let response = await axios.get(`${BASE_URI}/note/list`);
  return response;
}

async function createNote(noteData) {
  let data = await axios.post(`${BASE_URI}/note/create`, noteData, {
    headers: {
      'Content-Type': 'application/json',

    }
  })
  return data;
}

async function deleteNote(noteData) {
  let data = await axios.post(`${BASE_URI}/note/delete`, noteData, {
    headers: {
      'Content-Type': 'application/json',

    }
  });
  return data;
}

//*  PRODUCTS  *//
async function createProduct(productData) {
  let data = await axios.post(`${BASE_URI}/product/create`, productData, {
    headers: {
      'Content-Type': 'application/json',

    }
  });
  return data;
}
async function updateProduct(productData) {
  let data = await axios.post(`${BASE_URI}/product/update`, productData, {
    headers: {
      'Content-Type': 'application/json',

    }
  });
  return data;
}
async function getProduct(productData) {
  let data = await axios.get(`${BASE_URI}/product/get?id=${productData}`, {
    headers: {
      'Content-Type': 'application/json',
      credentials: "include"
    }
  });
  return data;
}

async function listProducts(productData) {
  let data = await axios.get(`${BASE_URI}/product/list`, {
    headers: {
      'Content-Type': 'application/json',
      credentials: "include"
    }
  });
  return data;
}

async function deleteProduct(productData) {
  let data = await axios.post(`${BASE_URI}/product/delete`, productData, {
    headers: {
      'Content-Type': 'application/json',

    }
  });
  return data;
}

//*  INVENTORY ITEMS  *//
async function createInventoryItem(dtoIn) {
  let data = await axios.post(`${BASE_URI}/inventoryItem/create`, dtoIn, {
    headers: {
      'Content-Type': 'application/json',

    }
  });
  return data;
}
async function updateInventoryItem(dtoIn) {
  let data = await axios.post(`${BASE_URI}/inventoryItem/update`, dtoIn, {
    headers: {
      'Content-Type': 'application/json',

    }
  });
  return data;
}
async function getInventoryItem(dtoIn) {
  let data = await axios.get(`${BASE_URI}/inventoryItem/get?code=${dtoIn}`, {
    headers: {
      'Content-Type': 'application/json',

    }
  });
  return data;
}

async function listInventoryItems(dtoIn) {
  let data = await axios.post(`${BASE_URI}/inventoryItem/list`, dtoIn, {
    headers: {
      'Content-Type': 'application/json',
      credentials: "include"
    }
  });
  return data;
}

async function deleteInventoryItem(dtoIn) {
  let data = await axios.post(`${BASE_URI}/inventoryItem/delete`, dtoIn, {
    headers: {
      'Content-Type': 'application/json',

    }
  });
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
  createNote,
  deleteNote,
  createProduct,
  getProduct,
  listProducts,
  updateProduct,
  deleteProduct,
    createInventoryItem,
    getInventoryItem,
    listInventoryItems,
    updateInventoryItem,
    deleteInventoryItem
}