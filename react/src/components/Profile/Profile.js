import React, { Component } from "react";
import "./Profile.css";

import { withCookies, Cookies } from "react-cookie";
import Product from "../Product";

class Profile extends Component {
  constructor(props) {
    super(props);

    const { cookies } = props;
    console.log("ck: " + cookies);
    this.state = {
      sales: [],
      purcheses: [],
      activeUser: cookies.get("loginCookie") || "",
      productId: this.props.match.params.productId | ""
    };
  }
  componentDidMount() {
    this.getSales();
    this.getPurcheses();
  }

  getPurcheses = () => {
    console.log("getPurcheses: ");
    let location =
      "http://localhost:3001/profile/purcheses/" + this.state.activeUser;

    console.log(location);
    fetch(location, { credentials: "include" })
      .then(response => {
        console.log("response ");
        return response.json();
      })
      .then(response => {
        console.log("purcheses: " + response.purcheses);
        this.setState({ purcheses: response.purcheses });
      })

      .catch(error => console.log(error));
  };

  getSales = () => {
    console.log("sales: ");
    let location =
      "http://localhost:3001/profile/sales/" + this.state.activeUser;

    fetch(location, { credentials: "include" })
      .then(response => {
        console.log("response ");
        return response.json();
      })
      .then(response => {
        this.setState({ sales: response.sales });
      })

      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className="profile">
        <p className="profile-header">Profile Sales</p>
        <Product products={this.state.sales} mode="wiew" />
        <p className="profile-header">Profile Purcheses</p>
        <Product products={this.state.purcheses} mode="wiew" />
      </div>
    );
  }
}

export default withCookies(Profile);
