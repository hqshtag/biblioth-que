import { bookTypes } from "../constants/apiConsts";
import { apiServices } from "../api/bookApiServices";

const createBook = (token, book) => {
  let request = () => {
    return { type: bookTypes.POST_REQUEST };
  };
  let success = (book) => {
    return { type: bookTypes.POST_SUCCESS, payload: { book } };
  };
  let failure = (error) => {
    return { type: bookTypes.POST_FAILURE, payload: { error } };
  };
  return (dispatch) => {
    dispatch(request({ token }));
    apiServices.createBook(token, book).then(
      (book) => {
        //console.log(licence);
        dispatch(success(book));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };
};

const getAllBooks = (token) => {
  let request = () => {
    return {
      type: bookTypes.GET_REQUEST,
    };
  };
  let success = (books) => {
    return {
      type: bookTypes.GET_SUCCESS,
      payload: {
        books,
      },
    };
  };
  let failure = (error) => {
    return { type: bookTypes.GET_FAILURE, payload: { error } };
  };
  return (dispatch) => {
    dispatch(request());
    apiServices.getAllBooks(token).then(
      (books) => {
        dispatch(success(books));
      },
      (error) => dispatch(failure(error))
    );
  };
};

const getOneBook = (token, id) => {
  let request = () => {
    return {
      type: bookTypes.GET_ONE_REQUEST,
    };
  };
  let success = (book) => {
    return {
      type: bookTypes.GET_ONE_SUCCESS,
      payload: book,
    };
  };

  let failure = (error) => {
    return {
      type: bookTypes.GET_ONE_FAILURE,
      payload: { error },
    };
  };

  return (dispatch) => {
    dispatch(request());
    apiServices.getBook(token, id).then(
      (book) => {
        dispatch(success(book));
      },
      (error) => dispatch(failure(error))
    );
  };
};

function updateBook(token, id, data) {
  let request = () => {
    return { type: bookTypes.UPDATE_REQUEST };
  };
  let success = (updatedBook) => {
    return {
      type: bookTypes.UPDATE_SUCCESS,
      payload: { ...updatedBook },
    };
  };
  let failure = (error) => {
    return { type: bookTypes.UPDATE_FAILURE, payload: { error } };
  };

  return (dispatch) => {
    dispatch(request({ id }));
    apiServices.updateBook(token, id, data).then(
      (updatedBook) => {
        dispatch(success(updatedBook));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };
}

function makeFavourite(token, id) {
  let request = () => {
    return { type: bookTypes.MAKE_FAVOURITE_REQUEST };
  };
  let success = (favouriteBook) => {
    return {
      type: bookTypes.MAKE_FAVOURITE_SUCCESS,
      payload: { favouriteBook },
    };
  };
  let failure = (error) => {
    return { type: bookTypes.MAKE_FAVOURITE_FAILURE, payload: { error } };
  };

  return (dispatch) => {
    dispatch(request({ id }));
    apiServices.makeFavourite(token, id).then(
      (favouriteBook) => {
        dispatch(success(favouriteBook));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };
}

function removeBook(token, id) {
  let request = () => {
    return { type: bookTypes.DELETE_REQUEST };
  };
  let success = (id) => {
    return {
      type: bookTypes.DELETE_SUCCESS,
      payload: { removedBookID: id },
    };
  };
  let failure = (error) => {
    return { type: bookTypes.DELETE_FAILURE, payload: { error } };
  };

  return (dispatch) => {
    dispatch(request({ id }));
    apiServices.removeBook(token, id).then(
      (removedBook) => {
        dispatch(success(id));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };
}

const apiActions = {
  createBook,
  getAllBooks,
  getOneBook,
  updateBook,
  makeFavourite,
  removeBook,
};

export default apiActions;
