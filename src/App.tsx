import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import CheckOut from "./containers/CheckOut/CheckOut";
import Orders from "./containers/Orders/Orders";

import { Route } from "react-router-dom";

class App extends Component {
  state = {
    ingredients: {},
    showCheckOut: false,
  };

  // openCheckOut(ing) {
  //   this.setState({ ingredients: ing, showCheckOut: true });
  // }

  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={CheckOut} />
          <Route path="/orders" component={Orders} />
          {/* <BurgerBuilder /> */}
          {/* <CheckOut /> */}
        </Layout>
      </div>
    );
  }
}

export default App;
