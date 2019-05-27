import React, { Component } from "react";
import { withCookies, Cookies } from "react-cookie";
import "./ProductSingle.css";
import image from "../../assets/product.jpg";
import { Link } from "react-router-dom";

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
    console.log("buyer: " + this.props.product.buyer);
    let buy;
    if (this.props.mode == "buy") {
      if (this.state.activeUser == "") {
        buy = <p className="buy-msg">Login to buy</p>;
      } else {
        buy = (
          <button className="buy-btn" onClick={() => this.buy()}>
            Buy
          </button>
        );
      }
    }
    console.log(this.props);
    return (
      <div className="product-single">
        <Link to={"/product/" + this.props.product.id_product}>
          <p className="product-name">{this.props.product.name}</p>
          <img className="product-img" src={image} />
          <div className="product-details">
            <div className="product-info">
              <p className="product-seller">
                Seller: <b>{this.props.product.username}</b>
              </p>
              <p className="product-buyer">
                Buyer: <b>{this.props.product.buyer}</b>
              </p>
            </div>
            <div className="product-buy">{buy}</div>
          </div>
        </Link>
      </div>
    );
  }
}

export default withCookies(ProductSingle);
