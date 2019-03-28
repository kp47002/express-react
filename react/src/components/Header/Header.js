import React, { Component, Children } from "react";
import { Link } from "react-router-dom";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";

class Header extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      activeUser: cookies.get("loginCookie") || ""
    };
    this.logout = this.logout.bind(this);
  }

  logout() {
    const { cookies } = this.props;
    cookies.remove("loginCookie");
    alert("Logout successfull!");
    window.location.reload();
  }
  render() {
    let userLogin;
    if (this.state.activeUser == "") {
      userLogin = (
        <div>
          <Link to="/login">Login </Link>
          <Link to="/register">Register </Link>
        </div>
      );
    } else {
      userLogin = (
        <div>
          <p>{this.state.activeUser} </p>
          <button onClick={() => this.logout()}>Logout</button>
        </div>
      );
    }

    return (
      <div>
        Header
        <Link to="/buy">Buy </Link>
        <Link to="/sell">Sell </Link>
        <Link to="/">Home </Link>
        {userLogin}
        {this.props.children}
      </div>
    );
  }
}

export default withCookies(Header);
