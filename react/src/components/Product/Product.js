import React, { Component } from "react";
import ProductSingle from "../ProductSingle/ProductSingle";
import "./Product.css";
import Details from "../Details/Details";

class Product extends Component {
  render() {
    let products = [];
    if (this.props.products) {
      this.props.products.forEach(element => {
        if (this.props.mode == "buy" && element.buyer == null) {
          products.push(
            <ProductSingle product={element} mode={this.props.mode} />
          );
        } else if (this.props.mode == "sell" && element.buyer == null) {
          products.push(
            <ProductSingle product={element} mode={this.props.mode} />
          );
        }
      });
    } else {
      products.push(<Details />);
    }

    return <div className="products">{products}</div>;
  }
}

export default Product;
