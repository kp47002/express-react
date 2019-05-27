import React, { Component } from "react";
import image from "../../assets/product.jpg";
import { object } from "prop-types";

class Details extends Component {
  constructor(props) {
    super(props);

    const { cookies } = props;
    console.log("ck: " + cookies);
    this.state = {
      product: {}
    };
  }
  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    console.log("getProducts: ");
    let location =
      "http://localhost:3001/product/" +
      window.location.pathname.split("/").slice(-1)[0];

    console.log(location);
    fetch(location, { credentials: "include" })
      .then(response => {
        console.log("response ");
        return response.json();
      })
      .then(response => {
        console.log(response.products);
        response.products.forEach(element => {
          console.log("product:");
          this.setState({ product: element });
          console.log(this.state.product);
        });
      })

      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className="product-single">
        <p className="product-name">{this.state.product.name}</p>
        <img className="product-img" src={image} />
        <div className="product-details">
          <div className="product-info">
            <p className="product-seller">
              Seller: <b>{this.state.product.username}</b>
            </p>
            <p className="product-buyer">
              Buyer: <b>{this.state.product.buyer}</b>
            </p>
            <p className="??">
              Description: <b>{this.state.product.description}</b>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
