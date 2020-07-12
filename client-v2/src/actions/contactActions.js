import { contactTypes } from "../constants/apiConsts";
import { apiServices } from "../api/contactApiServices";

const createContact = (token, contact) => {
  let request = () => {
    return { type: contactTypes.POST_REQUEST };
  };
  let success = (contact) => {
    return { type: contactTypes.POST_SUCCESS, payload: { contact } };
  };
  let failure = (error) => {
    return { type: contactTypes.POST_FAILURE, payload: { error } };
  };
  return (dispatch) => {
    dispatch(request({ token }));
    apiServices.createContact(token, contact).then(
      (contact) => {
        //console.log(licence);
        dispatch(success(contact));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };
};

const getAllContacts = (token) => {
  let request = () => {
    return {
      type: contactTypes.GET_REQUEST,
    };
  };
  let success = (contacts) => {
    return {
      type: contactTypes.GET_SUCCESS,
      payload: {
        contacts,
      },
    };
  };
  let failure = (error) => {
    return { type: contactTypes.GET_FAILURE, payload: { error } };
  };
  return (dispatch) => {
    dispatch(request());
    apiServices.getAllContacts(token).then(
      (contacts) => {
        dispatch(success(contacts));
      },
      (error) => dispatch(failure(error))
    );
  };
};

function updateContact(token, id, data) {
  let request = (id) => {
    return { type: contactTypes.UPDATE_REQUEST, payload: { userID: id } };
  };
  let success = (contact) => {
    return {
      type: contactTypes.UPDATE_SUCCESS,
      payload: { ...contact },
    };
  };
  let failure = (error) => {
    return { type: contactTypes.UPDATE_FAILURE, payload: { error } };
  };

  return (dispatch) => {
    dispatch(request({ id }));
    apiServices.updateContact(token, id, data).then(
      (updatedcontact) => {
        dispatch(success(updatedcontact));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };
}

function removeContact(token, id) {
  let request = () => {
    return { type: contactTypes.DELETE_REQUEST };
  };
  let success = (id) => {
    return {
      type: contactTypes.DELETE_SUCCESS,
      payload: { deletedID: id },
    };
  };
  let failure = (error) => {
    return { type: contactTypes.DELETE_FAILURE, payload: { error } };
  };

  return (dispatch) => {
    dispatch(request({ id }));
    apiServices.removeContact(token, id).then(
      () => {
        dispatch(success(id));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };
}

function clearContacts(token) {
  let request = () => {
    return { type: contactTypes.CLEAR_REQUEST };
  };
  let success = () => {
    return {
      type: contactTypes.CLEAR_SUCCESS,
      payload: null,
    };
  };
  let failure = (error) => {
    return { type: contactTypes.CLEAR_FAILURE, payload: { error } };
  };

  return (dispatch) => {
    dispatch(request());
    apiServices.clearContacts(token).then(
      (res) => {
        dispatch(success(res));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };
}

const apiActions = {
  createContact,
  getAllContacts,
  updateContact,
  removeContact,
  clearContacts,
};

export default apiActions;
