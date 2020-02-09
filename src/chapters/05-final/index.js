// ####################
//        Final
// ####################

import React from "react";
import AppProviders from "./context";
import NavBar from "./components/navbar";
import Inbox from "./components/inbox";

export default function App() {
  return (
    <AppProviders>
      <NavBar />
      <Inbox />
    </AppProviders>
  );
}
