import React from "react";

import Empty from "./empty";
import Preview from "./preview";
// import Denied from "./denied";

export default function Inbox({ emails }) {
  if (!emails.length) {
    return <Empty />;
  }

  return (
    <ul className="inbox">
      {emails.map(email => {
        return <Preview key={email.id} {...email} />;
      })}
    </ul>
  );
}
