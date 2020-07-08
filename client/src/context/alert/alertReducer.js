import { SET_ALERT, REMOVE_ALERT } from "../types";

export default function (state, { type, payload }) {
  switch (type) {
    case SET_ALERT:
      return { ...state, showAlert: true };
    case REMOVE_ALERT:
      return { ...state, showAlert: false };
    default:
      return state;
  }
}
