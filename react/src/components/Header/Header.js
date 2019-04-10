import React, { Component, Children } from "react";
import { Link } from "react-router-dom";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import header from "../../assets/header2.png";
import "./Header.css";

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
    // window.location.reload();
    this.setState({ activeUser: "" });
  }
  render() {
    let userLogin;
    if (this.state.activeUser == "") {
      userLogin = (
        <div className="navbar">
          <div className="navbar-left">
            <Link className="img-link" to="/">
              <img className="img-header" src={header} />
            </Link>
            <Link className="link" to="/buy">
              Buy
            </Link>
            <Link className="link" to="/login">
              Login
            </Link>
            <Link className="link" to="/register">
              Register
            </Link>
          </div>
          <div className="navbar-right">
            <p className="user">Guest user</p>
          </div>
        </div>
      );
    } else {
      userLogin = (
        <div className="navbar">
          <div className="navbar-left">
            <Link className="link" to="/">
              <img src={header} />
            </Link>
            <Link className="link" to="/buy">
              Buy
            </Link>
            <Link className="link" to="/sell">
              Sell
            </Link>
          </div>
          <div className="navbar-right">
            <p className="user">Hello {this.state.activeUser}!</p>
            <Link className="link logout" onClick={() => this.logout()}>
              Logout
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div>
        {userLogin}
        {this.props.children}
      </div>
    );
  }
}

export default withCookies(Header);
