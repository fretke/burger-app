import React, { Component } from "react";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { RouteComponentProps } from "react-router-dom";
import burger, { burgerIngredients } from "../../components/Burger/Burger";

class CheckOut extends Component<RouteComponentProps> {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0,
    },
    totalPrice: 0,
  };

  componentDidMount() {
    const parameters = this.props.location.search
      .replace(/\?/g, "")
      .split("&")
      .reverse();

    const ing = { ...this.state.ingredients };
    let burgerPrice: number = 0;

    parameters.forEach((parameter) => {
      const arr = parameter.split("=");
      if (arr[0] === "price") {
        burgerPrice = parseInt(arr[1]);
        return;
      }
      ing[arr[0] as burgerIngredients] = parseInt(arr[1]);
    });

    this.setState({ ingredients: ing, totalPrice: burgerPrice });

    console.log(parameters, "parameters");
  }

  quitCheckOut = () => {
    this.props.history.goBack();
  };

  continueToForm = () => {
    this.props.history.push("/checkout/contact-data");
  };

  render() {
    // console.log(this.props, "props in CheckOut");

    return (
      <div>
        <CheckoutSummary
          continue={this.continueToForm}
          goBack={this.quitCheckOut}
          ingredients={this.state.ingredients}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              total={this.state.totalPrice}
              {...props}
            />
          )}
          // component={ContactData}
        />
      </div>
    );
  }
}

export default CheckOut;
