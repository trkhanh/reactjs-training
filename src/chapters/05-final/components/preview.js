import React from "react";
import { useEmail } from "../context/email-context";
import trash from "../../../assets/trash.png";

export default function Preview({ id, name, title, body }) {
  const { removeEmail } = useEmail();

  // Comment out this if statement to avoid throwing an error
  // if (name === "Taylor Swift") {
  //   throw new Error("Bad Blood");
  // }

  return (
    <li className="preview">
      <h3 className="preview-name">{name}</h3>
      <div className="preview-content">
        <h3 className="preview-title">{title}</h3>
        <p className="preview-body">{body}</p>
      </div>
      <img
        className="preview-delete"
        src={trash}
        alt="remove"
        onClick={() => removeEmail(id)}
      />
    </li>
  );
}
