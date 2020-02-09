import React from "react";
import { useEmail } from "../context/email-context";
import undo from "../../../assets/undo.png";

const Undo = () => {
  const { undoRemoveEmail } = useEmail();
  return (
    <div className="undo">
      <button className="undo-button" onClick={undoRemoveEmail}>
        <h3 className="undo-title">UNDO</h3>
        <img src={undo} className="undo-image" alt="undo" />
      </button>
    </div>
  );
};

export default Undo;
