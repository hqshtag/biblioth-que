import React from "react";
import "../styles/modal.scss";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <button className="close-modal-btn" onClick={handleClose}>
        Close
      </button>
      <section className="modal-main">{children}</section>
    </div>
  );
};

export default Modal;
