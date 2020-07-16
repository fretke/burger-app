import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { RouteComponentProps } from "react-router-dom";
import burger, { burgerIngredients } from "../../components/Burger/Burger";
import { burgerBuilderState, ingrType } from "../../store/reducer";

interface checkOutProps extends RouteComponentProps {
  ingredients: ingrType;
  totalPrice: number;
}

class CheckOut extends Component<checkOutProps> {
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
          ingredients={this.props.ingredients}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={(props) => (
            <ContactData
              // ingredients={this.props.ingredients}
              // total={this.props.totalPrice}
              {...props}
            />
          )}
          // component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: burgerBuilderState) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

export default connect(mapStateToProps)(CheckOut);
