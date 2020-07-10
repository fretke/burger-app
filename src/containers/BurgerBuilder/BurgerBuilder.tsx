import React, { Component } from "react";

import Aux from "../../hoc/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

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
  purchasing: boolean;
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
    purchasing: false,
  };

  // getIngrArray = () => {
  //   const ingArr: { [key: string]: number }[] = [];
  //   for (let ing in this.state.ingredients) {
  //     // console.log(ing, "ingreident in getIngrArray");

  //     ingArr.push({ [ing]: this.state.ingredients[ing as burgerIngredients] });
  //   }
  //   console.log(ingArr, "array in getIngrArray");

  //   return ingArr;
  // };

  updatePurchaseState = (ingredients: ingrInterface) => {
    for (const ing in ingredients) {
      if (ingredients[ing as burgerIngredients] > 0) {
        this.setState({ purchaseable: true });
        return;
      }
    }
    this.setState({ purchaseable: false });
  };

  updatePurchasing = (): void => {
    const prevValue = this.state.purchasing;
    this.setState({ purchasing: !prevValue });
  };

  purchaseContinueHandler = (): void => {
    alert("To be continued");
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

    // this.updatePurchaseState();

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <Modal modalClosed={this.updatePurchasing} show={this.state.purchasing}>
          <OrderSummary
            totalPrice={this.state.totalPrice}
            continueWithOrder={this.purchaseContinueHandler}
            cancelOrder={this.updatePurchasing}
            ing={this.state.ingredients}
          />
        </Modal>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientsRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          checkOut={this.state.purchaseable}
          purchasing={this.updatePurchasing}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
