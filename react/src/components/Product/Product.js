import React, { Component } from "react";
import ProductSingle from "../ProductSingle/ProductSingle";
import "./Product.css";

class Product extends Component {
  render() {
    let products = [];
    this.props.products.forEach(element => {
      products.push(<ProductSingle product={element} mode={this.props.mode} />);
    });
    return (
      <div className="products">
        {products}
      </div>
    );
  }
}

export default Product;

