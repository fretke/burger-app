import React, { Component } from "react";

import Aux from "../../hoc/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { RouteComponentProps } from "react-router-dom";

// react router prop setup

// interface RouterProps extends RouteComponentProps {}
type RouterProps = RouteComponentProps;

///////////////////////

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
  loading: boolean;
  error: boolean;
}

class BurgerBuilder extends Component<RouterProps, burgerState> {
  state = {
    ingredients: {
      bacon: 0,
      cheese: 0,
      meat: 0,
      salad: 0,
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  async componentDidMount() {
    console.log(this.props, "passedProps");

    // try {
    //   const res = await axios.get(
    //     "https://my-burger-5a1c0.firebaseio.com/orders/ingredients.json"
    //   );
    //   const updatedPrice = this.calculateTotalPrice(res.data);
    //   const isEmpty = updatedPrice > 4 ? false : true;
    //   this.setState({
    //     ingredients: res.data,
    //     totalPrice: updatedPrice,
    //     purchaseable: !isEmpty,
    //   });
    // } catch (err) {
    //   this.setState({ error: true });
    //   console.log(err, "error in burgerbuilder");
    // }

    // axios
    //   .get("https://my-burger-5a1c0.firebaseio.com/orders/ingredients.json")
    //   .then((res) => this.setState({ ingredients: res.data }))
    //   .catch((err) => {
    //     console.log("is this catch block excuted at all?");

    //     this.setState({ error: true });
    //   });
  }

  calculateTotalPrice(
    serverIng: { [key in burgerIngredients]: number }
  ): number {
    let totalPrice: number = this.state.totalPrice;
    for (let ing in serverIng) {
      totalPrice +=
        serverIng[ing as burgerIngredients] * INGREDIENT_PRICES[ing];
    }

    return totalPrice;
  }

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
    const queryParams = [];

    for (let ing in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(ing) +
          "=" +
          encodeURIComponent(this.state.ingredients[ing as burgerIngredients])
      );
    }

    queryParams.push("price=" + this.state.totalPrice);
    this.props.history.push({
      pathname: "/checkout",
      search: `?${queryParams.join("&")}`,
    });
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

    let orderSummary = null;
    // let burger;

    let burger = this.state.error ? <p>Ingredients not loaded</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
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
      orderSummary = (
        <OrderSummary
          totalPrice={this.state.totalPrice}
          continueWithOrder={this.purchaseContinueHandler}
          cancelOrder={this.updatePurchasing}
          ing={this.state.ingredients}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    // this.updatePurchaseState();

    return (
      <Aux>
        <Modal modalClosed={this.updatePurchasing} show={this.state.purchasing}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

// export default WithErrorHandler(BurgerBuilder, axios);
export default BurgerBuilder;
