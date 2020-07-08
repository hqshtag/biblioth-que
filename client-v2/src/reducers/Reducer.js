import { combineReducers } from "redux";

import authReducer from "./authReducer";
import bookReducer from "./booksReducer";
import contactsReducer from "./contactsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  books: bookReducer,
  contacts: contactsReducer,
});

export default rootReducer;
