import React, { Component } from "react";
import { instanceOf } from "prop-types";
import { Redirect } from "react-router-dom";

import { withCookies, Cookies } from "react-cookie";

class Register extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = { username: "", password: "", email: "" };

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }
  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { cookies } = this.props;

    if (this.state.username == "") {
      this.setState({ password: "" });
      alert("Username is required");
      return;
    }
    if (this.state.email == "") {
      this.setState({ password: "" });
      alert("E-Mail is required");
      return;
    }
    if (this.state.password == "") {
      alert("Password is required");
      return;
    }
    let message;
    ///window.location.reload();
    //event.preventDefault();
    console.log("this.post");

    fetch("http://localhost:3001/register", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        message = response.message;
        if (response.status == "error") {
          this.setState({ password: "" });
        } else {
          cookies.set("loginCookie", this.state.username);
          this.props.history.push("/");
        }
        console.log(response);
        alert(message);
        //event.preventDefault();
        //this.forceUpdate();
      });
  }

  render() {
    return (
      <div>
        Register
        <form onSubmit={this.handleSubmit}>
          <label>
            E-mail:
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleChangeEmail}
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleChangeUsername}
            />
          </label>
          <label>
            Password:
            <input
              type="text"
              value={this.state.password}
              onChange={this.handleChangePassword}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default withCookies(Register);
