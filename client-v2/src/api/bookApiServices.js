import axios from "axios";
import { setAuthHeader } from "./utils";

export const apiServices = {
  getAllBooks,
  getBook,
  updateBook,
  createBook,
  removeBook,
  makeFavourite,
};

const baseurl = "http://localhost:5000/api";

async function createBook(token, data) {
  const requestOptions = {
    method: "POST",
    url: `${baseurl}/books`,
    data,
  };
  setAuthHeader(token);
  const res = await axios(requestOptions);
  return res.data.book;
}

async function getAllBooks(token) {
  const requestOptions = {
    method: "GET",
    url: `${baseurl}/books`,
  };
  setAuthHeader(token);
  const res = await axios(requestOptions);
  return res.data.books;
}

async function getBook(token, id) {
  const requestOptions = {
    method: "GET",
    url: `${baseurl}/books/${id}`,
  };
  setAuthHeader(token);
  const res = await axios(requestOptions);
  return res.data.book;
}

async function updateBook(token, id, data) {
  const requestOptions = {
    method: "PUT",
    url: `${baseurl}/books/${id}`,
    data,
  };
  setAuthHeader(token);
  const res = await axios(requestOptions);
  return res.data.result;
}

async function removeBook(token, id) {
  const requestOptions = {
    method: "DELETE",
    url: `${baseurl}/books/${id}`,
  };
  setAuthHeader(token);
  const res = await axios(requestOptions);
  return res.data;
}

async function makeFavourite(token, id) {
  const requestOptions = {
    method: "PATCH",
    url: `${baseurl}/books/${id}`,
  };
  setAuthHeader(token);
  const res = await axios(requestOptions);
  return res.data;
}
