import React from "react";
import { AppConsumer } from "../context";
import trash from "../../../assets/trash.png";

export default function Preview({ id, name, title, body }) {
  // Comment out this if statement to avoid throwing an error
  // if (name === "Taylor Swift") {
  //   throw new Error("Bad Blood");
  // }

  return (
    <AppConsumer>
      {({ removeEmail }) => (
        <div className="preview">
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
        </div>
      )}
    </AppConsumer>
  );
}
