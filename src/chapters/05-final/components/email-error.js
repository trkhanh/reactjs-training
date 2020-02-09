import React, { Component } from "react";
import Modal from "./modal";

export default class EmailError extends Component {
  state = {
    error: false
  };

  static getDerivedStateFromError() {
    return { error: true };
  }

  componentDidCatch(error) {
    console.log(error);
  }

  render() {
    if (this.state.error) {
      return (
        <Modal
          onClose={() => {
            this.props.onClear();
            this.setState({ error: false })
          }}
        />
      );
    }

    return this.props.children;
  }
}
