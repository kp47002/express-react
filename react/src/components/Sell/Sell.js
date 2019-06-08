import React, { Component } from "react";
import Product from "../Product/Product";
import "./Sell.css";
import Images from "../Images/Images";
import Buttons from "../Buttons/Buttons";

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
      price: 0.0,
      uploading: false,
      images: []
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
  }

  onChange = e => {
    const files = Array.from(e.target.files);
    this.setState({ uploading: true });

    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(i, file);
    });

    fetch(`http://localhost:3001/image-upload`, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(images => {
        this.setState({
          uploading: false,
          images
        });
      });
  };

  removeImage = id => {
    this.setState({
      images: this.state.images.filter(image => image.public_id !== id)
    });
  };

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
    const { uploading, images } = this.state;

    const content = () => {
      switch (true) {
        case uploading:
          return <p>spinner</p>;
        case images.length > 0:
          return <Images images={images} removeImage={this.removeImage} />;
        default:
          return <Buttons onChange={this.onChange} />;
      }
    };

    let sell;
    if (this.state.activeUser == "") {
      sell = <p>Login to sell</p>;
    } else {
      if (this.state.formSell == false) {
        sell = (
          <button className="sell-btn" onClick={() => this.formSell()}>
            Add product to sell
          </button>
        );
      } else {
        sell = (
          <div className="sell-form">
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleChangeName}
              className="sell-input"
              placeholder="Name"
            />
            <input
              type="text"
              value={this.state.description}
              onChange={this.handleChangeDescription}
              className="sell-input"
              placeholder="Description"
            />
            <input
              type="text"
              value={this.state.price}
              onChange={this.handleChangePrice}
              className="sell-input"
              placeholder="Price"
            />
            <button className="sell-btn" onClick={() => this.addProduct()}>
              Add
            </button>
            ;
          </div>
        );
      }
    }
    console.log("sell: " + sell);
    return (
      <div className="sell">
        <p className="sell-header">Sell</p>
        <div className="buttons">{content()}</div>
        <div className="sell-div">{sell}</div>
        <Product products={this.state.products} mode="sell" />
      </div>
    );
  }
}

export default withCookies(Sell);
