import React, { Component } from "react";

import Aux from "../../../hoc/Auxillary";
import { burgerIngredients } from "../../../containers/BurgerBuilder/BurgerBuilder";
import Button from "../../UI/Button/Button";

type summaryProps = {
  //   ing: { [key: string]: number }[];
  totalPrice: number;
  // ing: { [key in burgerIngredients]: number };
  ing: { [ing: string]: number };
  cancelOrder?: () => void;
  continueWithOrder?: () => void;
};

class orderSummary extends Component<summaryProps> {
  // componentDidUpdate() {
  //   console.log("Order summary updated");
  // }

  render() {
    const ingredients: any = [];
    for (let ing in this.props.ing) {
      ingredients.push(
        <li key={ing}>
          {ing.toUpperCase() + " " + this.props.ing[ing as burgerIngredients]}
        </li>
      );
    }
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>Delicous burger with:</p>
        <ul>{ingredients}</ul>
        <p>
          <strong>Total price: {this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Continue to check out?</p>
        <Button clicked={this.props.cancelOrder} button="Danger">
          CANCEL
        </Button>
        <Button clicked={this.props.continueWithOrder} button="Success">
          CONTINUE
        </Button>
      </Aux>
    );
  }
}
export default orderSummary;
