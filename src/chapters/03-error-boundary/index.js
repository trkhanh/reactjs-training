// ###############################
//   Error Boundaries and Portals
// ###############################

import React from "react";
import AppProvider from "./context";
import NavBar from "./components/navbar";
import Inbox from "./components/inbox";

export default function App() {
  return (
    <AppProvider>
      <NavBar />
      <Inbox />
    </AppProvider>
  );
}
