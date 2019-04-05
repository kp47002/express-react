import React, { Component } from "react";
import ProductSingle from "../ProductSingle/ProductSingle";

class Product extends Component {
  render() {
    let products = [];
    this.props.products.forEach(element => {
      products.push(<ProductSingle product={element} />);
    });
    return (
      <div>
        Product
        {products}
      </div>
    );
  }
}

export default Product;
