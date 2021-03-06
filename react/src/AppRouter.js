import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import App from "./App";
import Add from "./components/Add";
import Buy from "./components/Buy";
import Sell from "./components/Sell";
import Register from "./components/Register";
import Login from "./components/Login";
import Product from "./components/Product";
import Header from "./components/Header";
import Profile from "./components/Profile/Profile";

function AppRouter() {
  return (
    <Router>
      <Header>
        <Route path="/" exact component={App} />
        <Route path="/add" exact component={Add} />
        <Route path="/product/:productId?" exact component={Product} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/buy/:productId?" exact component={Buy} />
        <Route path="/sell/:productId?" exact component={Sell} />
        <Route path="/profile" exact component={Profile} />
      </Header>
    </Router>
  );
}

export default AppRouter;
