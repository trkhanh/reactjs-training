// ####################
//       State
// ####################

import React from "react";
import NavBar from "./components/navbar";
import Inbox from "./components/inbox";
import { emails /*, generateEmail, fetchEmails */ } from "../../utils/email";

export default function App() {
  return (
    <>
      <NavBar />
      <Inbox emails={emails} />
    </>
  );
}
