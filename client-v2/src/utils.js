import jwt_decode from "jwt-decode";
import axios from "axios";

export const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export const decode = (token) => {
  return jwt_decode(token);
};

export const isEmptyObject = (o) => {
  return Object.entries(o).length === 0;
};
