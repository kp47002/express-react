import React, { Component } from "react";
import Product from "../Product/Product";
import "./Buy.css";

import { withCookies, Cookies } from "react-cookie";

class Buy extends Component {
  constructor(props) {
    super(props);

    const { cookies } = props;
    console.log("ck: " + cookies);
    this.state = {
      products: [],
      productId: this.props.match.params.productId | ""
    };
  }
  componentDidMount() {
    this.getProducts();
  }

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
    return (
      <div className="buy">
        Buy
        <Product products={this.state.products} mode="buy" />
      </div>
    );
  }
}

export default withCookies(Buy);
