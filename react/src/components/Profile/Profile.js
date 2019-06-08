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
      purchases: [],
      activeUser: cookies.get("loginCookie") || "",
      productId: this.props.match.params.productId | ""
    };
  }
  componentDidMount() {
    this.getSales();
    this.getPurchases();
  }

  getPurchases = () => {
    console.log("getPurchases: ");
    let location =
      "http://localhost:3001/profile/purchases/" + this.state.activeUser;

    console.log(location);
    fetch(location, { credentials: "include" })
      .then(response => {
        console.log("response ");
        return response.json();
      })
      .then(response => {
        console.log("purchases: " + response.purchases);
        this.setState({ purchases: response.purchases });
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
    let sales;
    let purchases;
    if (this.state.sales.length == 0)
      sales = <p className="empty-list-msg">Your sales list is currently empty.</p>;
    else sales = <Product products={this.state.sales} mode="view" />;
    if (this.state.purchases.length == 0)
    purchases = <p className="empty-list-msg">Your purchases list is currently empty.</p>;
    else purchases = <Product products={this.state.purchases} mode="view" />;
    return (
      <div className="profile">
        <p className="profile-header">Profile Sales</p>
        <div>{sales}</div>
        <p className="profile-header">Profile Purchases</p>
        <div>{purchases}</div>
      </div>
    );
  }
}

export default withCookies(Profile);
