import React, { Component, createContext } from "react";
import { generateEmail, emails } from "../../../utils/email";

export const AppContext = createContext();
export const AppConsumer = AppContext.Consumer;

export default class AppProvider extends Component {
  state = {
    isAuthenticated: this.props.isAuthenticated || false,
    emails: emails
  };

  componentDidMount() {
    this.polling = setInterval(() => {
      const { emails } = this.state;
      if (emails.length < 5) {
        this.setState({
          emails: [...emails, generateEmail()]
        });
      }
    }, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.polling);
  }

  removeEmail = id => {
    const filteredEmails = this.state.emails.filter(email => {
      return email.id !== id;
    });

    this.setState({ emails: filteredEmails });
  };

  login = () => {
    this.setState({ isAuthenticated: true });
  };

  logout = () => {
    this.setState({ isAuthenticated: false });
  };

  render() {
    const value = {
      isAuthenticated: this.state.isAuthenticated,
      login: this.login,
      logout: this.logout,
      emails: this.state.emails,
      removeEmail: this.removeEmail
    };

    return <AppContext.Provider value={value} {...this.props} />;
  }
}
