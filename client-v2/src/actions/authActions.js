import { auth } from "../constants/apiConsts";
import { authServices } from "../api/authServices";

const login = (loginData) => {
  let { email, password } = loginData;

  let request = () => {
    return { type: auth.LOGIN_REQUEST };
  };

  let success = (result) => {
    return { type: auth.LOGIN_SUCCESS, payload: { ...result.data } };
  };

  let failure = (error) => {
    return { type: auth.LOGIN_FAILURE, payload: { ...error } };
  };

  return (dispatch) => {
    dispatch(request());
    authServices.login(email, password).then(
      (user) => {
        dispatch(success(user));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };
};

const signup = (signupData) => {
  let { name, email, password } = signupData;
  let request = () => {
    return { type: auth.SIGNUP_REQUEST };
  };

  let success = (result) => {
    return { type: auth.SIGNUP_SUCCESS, payload: { ...result.data } };
  };

  let failure = (error) => {
    return { type: auth.SIGNUP_FAILURE, payload: { ...error } };
  };

  return (dispatch) => {
    dispatch(request());
    authServices.signup(name, email, password).then(
      (user) => {
        dispatch(success(user));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };
};

function verifyToken(token) {
  let request = () => {
    return { type: auth.TOKEN_REQUEST };
  };
  let success = (result) => {
    //console.log(result);
    return { type: auth.TOKEN_SUCCESS, payload: { ...result.data } };
  };
  let failure = (error) => {
    return { type: auth.TOKEN_REQUEST, payload: { ...error } };
  };
  return (dispatch) => {
    dispatch(request());

    authServices.verifyToken(token).then(
      (res) => {
        dispatch(success(res));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };
}

function logout() {
  authServices.logout();
  return { type: auth.LOGOUT };
}

const authActions = {
  login,
  signup,
  logout,
  verifyToken,
};

export default authActions;
