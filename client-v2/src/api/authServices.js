import axios from "axios";

export const authServices = {
  login,
  logout,
  signup,
  verifyToken,
};

const baseurl = "http://localhost:5000/api";

async function login(email, password) {
  const requestOptions = {
    method: "POST",
    url: `${baseurl}/auth`,
    data: {
      email,
      password,
    },
  };
  const res = await axios(requestOptions);
  //localStorage.setItem("jwt-token", res.data["auth-token"]);

  return res;
}

function logout() {
  localStorage.removeItem("jwt-token");
  localStorage.removeItem("username");
  localStorage.removeItem("id");
}

async function verifyToken(token) {
  const requestOptions = {
    method: "POST",
    url: `${baseurl}/auth/__verify_token`,
    data: {
      token: token,
    },
  };

  const res = await axios(requestOptions);
  return res;
}

async function signup(name, email, password) {
  const requestOptions = {
    method: "POST",
    url: `${baseurl}/users`,
    data: {
      name,
      email,
      password,
    },
  };
  const res = await axios(requestOptions);
  return res;
}
