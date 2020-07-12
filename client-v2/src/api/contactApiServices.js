import axios from "axios";
import { setAuthHeader } from "../utils";

export const apiServices = {
  createContact,
  getAllContacts,
  updateContact,
  removeContact,
  clearContacts,
};

const baseurl = "http://localhost:5000/api";

async function createContact(token, data) {
  const requestOptions = {
    method: "POST",
    url: `${baseurl}/contacts`,
    data,
  };
  setAuthHeader(token);
  const res = await axios(requestOptions);
  return res.data;
}

async function getAllContacts(token) {
  const requestOptions = {
    method: "GET",
    url: `${baseurl}/contacts`,
  };
  setAuthHeader(token);
  const res = await axios(requestOptions);
  //console.log(res);
  return res.data;
}

async function updateContact(token, id, data) {
  const requestOptions = {
    method: "PUT",
    url: `${baseurl}/contacts/${id}`,
    data,
  };
  setAuthHeader(token);
  const res = await axios(requestOptions);
  return res.data;
}

async function removeContact(token, id) {
  const requestOptions = {
    method: "DELETE",
    url: `${baseurl}/contacts/${id}`,
  };
  setAuthHeader(token);
  const res = await axios(requestOptions);
  return res.data;
}

async function clearContacts(token) {
  const requestOptions = {
    method: "DELETE",
    url: `${baseurl}/contacts`,
  };
  setAuthHeader(token);
  const res = await axios(requestOptions);
  return res.data;
}
