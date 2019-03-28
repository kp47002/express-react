import React, { Component, Children } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div>
        Header
        <Link to="/login">Login </Link>
        <Link to="/register">Register </Link>
        <Link to="/buy">Buy </Link>
        <Link to="/sell">Sell </Link>
        <Link to="/">Home </Link>
        {this.props.children}
      </div>
    );
  }
}

export default Header;
