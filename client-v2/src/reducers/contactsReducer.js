import { contactTypes } from "../constants/apiConsts";

const initialState = {
  contacts: [],
  error: false,
  loading: false,
};

export default function contactsReducer(state = initialState, action) {
  let con = [];
  // console.log(action);
  switch (action.type) {
    case contactTypes.POST_REQUEST:
    case contactTypes.DELETE_REQUEST:
    case contactTypes.CLEAR_REQUEST:
    case contactTypes.UPDATE_REQUEST:
    case contactTypes.GET_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case contactTypes.POST_SUCCESS:
      con = state.contacts;
      con.push(action.payload.contact);
      return {
        ...state,
        loading: false,
        contacts: con,
      };

    case contactTypes.GET_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: action.payload.contacts,
      };

    case contactTypes.UPDATE_SUCCESS:
      //window.location.reload(false);
      con = state.contacts.map((c) => {
        if (c._id == action.payload._id) {
          return action.payload;
        } else return c;
      });
      //console.log(action.payload);
      return {
        ...state,
        loading: false,
        contacts: con,
      };

    case contactTypes.DELETE_SUCCESS:
      con = state.contacts.filter((contact) => {
        return contact._id !== action.payload.deletedID;
      });
      console.log(con);
      return {
        ...state,
        contacts: con,
        loading: false,
      };
    case contactTypes.CLEAR_SUCCESS: {
      return {
        ...state,
        contacts: [],
        loading: false,
      };
    }
    case contactTypes.GET_FAILURE:
    case contactTypes.CLEAR_FAILURE:
    case contactTypes.DELETE_FAILURE:
    case contactTypes.POST_FAILURE:
    case contactTypes.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
