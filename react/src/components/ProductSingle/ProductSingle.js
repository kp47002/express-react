import React, { Component } from "react";

class ProductSingle extends Component {
  constructor(props) {
    super(props);

    this.state = { username: "", password: "", email: "" };
  }

  render() {
    console.log(this.props);
    return (
      <div>
        ProductSingle
        {this.props.product.name} - - {this.props.product.description} - -
        {this.props.product.price} - -{this.props.product.username} - -
      </div>
    );
  }
}

export default ProductSingle;
