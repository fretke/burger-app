import React, { Component } from "react";

import Aux from "../../hoc/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

export interface ingrInterface {
  salad: number;
  bacon: number;
  cheese: number;
  meat: number;
}

// interface ingredients {
//   [key: string]: number;
// }

const INGREDIENT_PRICES: { [key: string]: number } = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

export type burgerIngredients = "salad" | "bacon" | "cheese" | "meat";

interface burgerState {
  ingredients: {
    [key in burgerIngredients]: number;
  };
  totalPrice: number;
  purchaseable: boolean;
}

class BurgerBuilder extends Component {
  state: burgerState = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchaseable: false,
  };

  updatePurchaseState = (ingredients: ingrInterface) => {
    for (const ing in this.state.ingredients) {
      if (this.state.ingredients[ing as burgerIngredients] > 0) {
        this.setState({ purchaseable: true });
        return;
      }
    }
    this.setState({ purchaseable: false });
  };

  addIngredientHandler = (type: burgerIngredients): void => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type: burgerIngredients): void => {
    const oldCount = this.state.ingredients[type];
    if (oldCount === 0) return;

    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = oldCount - 1;

    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  render() {
    const disabledInfo: { [item: string]: boolean }[] = [];

    for (let key in this.state.ingredients) {
      if (this.state.ingredients[key as burgerIngredients] === 0) {
        disabledInfo.push({ key: true });
      } else {
        disabledInfo.push({ key: false });
      }
    }

    console.log(disabledInfo);

    // this.updatePurchaseState();

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientsRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          checkOut={this.state.purchaseable}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
