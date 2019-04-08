import React, { Component } from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import "./Login.css";

class Login extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = { username: "", password: "" };

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    if (this.state.password == "") {
      alert("Password is required");
      return;
    }

    let message;
    ///window.location.reload();
    //event.preventDefault();
    console.log("this.post");

    fetch("http://localhost:3001/login", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
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
          window.location.reload();
        }
        console.log(response);
        alert(message);
        //event.preventDefault();
        //this.forceUpdate();
      });
  }

  render() {
    return (
      <div className="login">
        <form className="submit-form" onSubmit={this.handleSubmit}>
          <input
            className="input-form"
            type="text"
            value={this.state.username}
            onChange={this.handleChangeUsername}
            placeholder="Username"
          />
          <input
            className="input-form"
            type="text"
            value={this.state.password}
            onChange={this.handleChangePassword}
            placeholder="Password"
          />
          <input className="submit-button" type="submit" value="Log in" />
        </form>
      </div>
    );
  }
}

export default withCookies(Login);
