import React, { useState } from "react";
import EditIcon from "../../icons/EditIcon";
import TrashIcon from "../../icons/TrashIcon";
import DeleteIcon from "../../icons/DeleteIcon";

const Book = ({ book, deletor, manage, selector }) => {
  const { _id, title, description, author, pages, year, language } = book;

  const [deleteState, setDeleteState] = useState(false);

  const deleteStateOff = () => setDeleteState(false);

  const deleteStateOn = () => {
    setDeleteState(true);
    setTimeout(() => {
      deleteStateOff();
    }, 1500);
  };

  return (
    <div className="card book-card">
      <div className="spans">
        {manage ? (
          <>
            {deleteState ? (
              <span className="delete-span" onClick={() => deletor(_id)}>
                <DeleteIcon />
              </span>
            ) : (
              <span className="delete-span" onClick={deleteStateOn}>
                <TrashIcon />
              </span>
            )}
            <span className="edit-span" onClick={() => selector(_id)}>
              <EditIcon />
            </span>
          </>
        ) : null}
      </div>
      <div className="card-header">
        <h4 className="book-title">{title}</h4>
        <p className="book-author">by {author}</p>
      </div>
      <div className="card-info">
        <p>
          <b>Description: </b> <em>{description}</em>{" "}
        </p>
        <p>
          <b>Year Published</b>: {year}
        </p>
        <p>
          <b>Language: </b>
          {language}
        </p>
      </div>
      <div className="card-footer">
        <span className="pages">
          <p>{pages}</p>
        </span>
      </div>
    </div>
  );
};

export default Book;
