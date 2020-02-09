import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  return ReactDOM.createPortal(
    (<div className="modal">
      <h3>Email Error</h3>
      <button
        className="modal-close"
        onClick={props.onClose}
      >
          Close
      </button>
    </div>),
    document.getElementById("modal-root")
  );
}

export default Modal;
