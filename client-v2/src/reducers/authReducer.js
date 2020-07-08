import { auth } from "../constants/apiConsts";

const initialState = {
  loading: false,
  isAuthenticated: false,
  error: undefined,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    //Requests
    case auth.TOKEN_REQUEST:
    case auth.SIGNUP_REQUEST:
    case auth.LOGIN_REQUEST:
      return { ...state, loading: true };

    case auth.LOGIN_SUCCESS:
    case auth.SIGNUP_SUCCESS:
    case auth.TOKEN_SUCCESS:
      //console.log(action.payload);
      localStorage.setItem("jwt-token", action.payload.token);

      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      };

    case auth.TOKEN_FAILURE:
    case auth.LOGIN_FAILURE:
    case auth.SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case auth.LOGOUT: {
      localStorage.removeItem("jwt-token");
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    default:
      return state;
  }
}
