// ####################
//        Context
// ####################

import React from "react";
import NavBar from "./components/navbar";
import Inbox from "./components/inbox";

import { generateEmail, fetchEmails } from "../../utils/email";

export default class App extends React.Component {
  state = {
    isAuthenticated: false,
    emails: fetchEmails(5)
  };

  componentDidMount() {
    this.polling = setInterval(() => {
      this.setState(({ emails }) => {
        if (emails.length < 5) {
          return { emails: [...emails, generateEmail()] };
        }
        return {};
      });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.polling);
  }

  login = () => this.setState({ isAuthenticated: true });

  logout = () => this.setState({ isAuthenticated: false });

  removeEmail = id => {
    this.setState(({ emails }) => {
      const filteredEmails = emails.filter(email => email.id !== id);
      return { emails: filteredEmails };
    });
  };

  render() {
    return (
      <>
        <NavBar
          isAuthenticated={this.state.isAuthenticated}
          login={this.login}
          logout={this.logout}
        />
        <Inbox
          isAuthenticated={this.state.isAuthenticated}
          emails={this.state.emails}
          removeEmail={this.removeEmail}
        />
      </>
    );
  }
}
