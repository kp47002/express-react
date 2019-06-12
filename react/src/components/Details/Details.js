import React, { Component } from "react";
import image from "../../assets/product3.jpg";
import { object } from "prop-types";
import "./Details.css";

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
      <div className="details">
        <p className="details-header">{this.state.product.name}</p>
        <div className="details-details">
          <img className="details-img" src={image} />
          <div className="details-info">
            <p className="details-seller">
              Seller: <b>{this.state.product.username}</b>
            </p>
            <p className="details-buyer">
              Buyer: <b>{this.state.product.buyer}</b>
            </p>
            <p className="details-description">
              Description: <b>{this.state.product.description}</b>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
