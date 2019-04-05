import React, { Component } from "react";
import Product from "../Product/Product";

import { withCookies, Cookies } from "react-cookie";

class Sell extends Component {
  constructor(props) {
    super(props);

    const { cookies } = props;
    console.log("ck: " + cookies);
    this.state = {
      products: [],
      productId: this.props.match.params.productId | "",
      activeUser: cookies.get("loginCookie") || ""
    };
  }
  componentDidMount() {
    this.getProducts();
  }

  addProduct = () => {
    console.log("this.post");

    fetch("http://localhost:3001/product/create", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "req.body.name",
        description: "req.body.description",
        price: 2,
        username: this.state.activeUser
      })
    }).then(response => {
      console.log(response);

      this.getProducts();
      //this.forceUpdate();
    });
  };

  getProducts = () => {
    console.log("getProducts: ");
    let location = "http://localhost:3001/product";
    if (this.state.productId != "") {
      location += "/" + this.state.productId;
    }
    console.log(location);
    fetch(location, { credentials: "include" })
      .then(response => {
        console.log("response ");
        return response.json();
      })
      .then(response => {
        console.log(response.products);
        this.setState({ products: response.products });
      })

      .catch(error => console.log(error));
  };

  render() {
    let sell;
    if (this.state.activeUser == "") {
      sell = <p>Login to sell</p>;
    } else {
      sell = <button onClick={() => this.addProduct()}>Add</button>;
    }
    return (
      <div>
        Buy
        <Product products={this.state.products} />
        {sell}
      </div>
    );
  }
}

export default withCookies(Sell);
