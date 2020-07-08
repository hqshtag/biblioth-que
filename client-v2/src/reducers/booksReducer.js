import { bookTypes } from "../constants/apiConsts";

const initialState = {
  publicBooks: [],
  error: undefined,

  loading: false,
};

export default function booksReducer(state = initialState, action) {
  //console.log(action);
  let books = [];
  switch (action.type) {
    case bookTypes.GET_REQUEST:
    case bookTypes.GET_ONE_REQUEST:
    case bookTypes.UPDATE_REQUEST:
    case bookTypes.DELETE_REQUEST:
    case bookTypes.POST_REQUEST:
    case bookTypes.MAKE_FAVOURITE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case bookTypes.GET_SUCCESS:
      //console.log(action.payload);
      return {
        ...state,
        publicBooks: action.payload.books,
        loading: false,
      };
    case bookTypes.POST_SUCCESS:
      books = state.publicBooks;
      // console.log(action.payload);
      books.push(action.payload.book);
      return {
        ...state,
        publicBooks: books,
        loading: false,
      };
    case bookTypes.MAKE_FAVOURITE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case bookTypes.DELETE_SUCCESS:
      books = state.publicBooks.filter((book) => {
        return book._id !== action.payload.removedBookID;
      });
      return {
        ...state,
        publicBooks: books,
        loading: false,
      };
    case bookTypes.UPDATE_SUCCESS:
      //let  lib = state.library;
      //lib.map((book)=>{if(book._id == action.payload.book._id) });
      return {
        ...state,
        loading: false,
      };

    case bookTypes.DELETE_FAILURE:
    case bookTypes.GET_FAILURE:
    case bookTypes.MAKE_FAVOURITE_FAILURE:
    case bookTypes.POST_FAILURE:
    case bookTypes.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
