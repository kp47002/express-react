import React, { Component } from "react";
import { withCookies, Cookies } from "react-cookie";

class ProductSingle extends Component {
  constructor(props) {
    super(props);

    const { cookies } = props;
    this.state = {
      id_product: -1,
      activeUser: cookies.get("loginCookie") || "",
      password: "",
      email: ""
    };
  }
  buy = () => {
    console.log("this.post");

    fetch("http://localhost:3001/product/buy", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id_product: this.props.product.id_product,
        username: this.state.activeUser
      })
    }).then(response => {
      console.log(response);
      window.location.reload();
      //this.forceUpdate();
    });
  };

  render() {
    console.log(this.props.product.buyer);
    let buy;
    if (this.props.mode == "buy") {
      if (this.state.activeUser == "") {
        buy = "Login to buy";
      } else {
        buy = <button onClick={() => this.buy()}>Buy</button>;
      }
    }
    console.log(this.props);
    return (
      <div>
        ProductSingle
        {this.props.product.name} - - {this.props.product.description} - -
        {this.props.product.price} - -{this.props.product.username} - -
        {this.props.product.buyer} - -{buy}
      </div>
    );
  }
}

export default withCookies(ProductSingle);
