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
      activeUser: cookies.get("loginCookie") || "",
      formSell: false,
      name: "",
      description: "",
      price: 0.0
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
  }

  handleChangeName(event) {
    console.log("handleChange");
    console.log(event);
    this.setState({ name: event.target.value });
  }
  handleChangeDescription(event) {
    console.log("handleChange");
    console.log(event);
    this.setState({ description: event.target.value });
  }
  handleChangePrice(event) {
    console.log("handleChange");
    console.log(event);
    this.setState({ price: event.target.value });
  }
  componentDidMount() {
    this.getProducts();
  }
  formSell = () => {
    this.setState({ formSell: true });
  };

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
        name: this.state.name,
        description: this.state.description,
        price: this.state.price,
        username: this.state.activeUser
      })
    }).then(response => {
      console.log(response);
      this.setState({ formSell: false });
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
      if (this.state.formSell == false) {
        sell = <button onClick={() => this.formSell()}>Add</button>;
      } else {
        sell = (
          <div>
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleChangeName}
            />
            <input
              type="text"
              value={this.state.description}
              onChange={this.handleChangeDescription}
            />
            <input
              type="text"
              value={this.state.price}
              onChange={this.handleChangePrice}
            />
            <button onClick={() => this.addProduct()}>Add</button>;
          </div>
        );
      }
    }
    console.log("sell: " + sell);
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
