import React, { Component } from "react";

import Aux from "../../hoc/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

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
    loading: false,
    error: false,
  };

  async componentDidMount() {
    try {
      const res = await axios.get(
        "https://my-burger-5a1c0.firebaseio.com/orders/ingredients.json"
      );
      this.setState({ ingredients: res.data });
    } catch (err) {
      this.setState({ error: true });
      console.log(err, "error in burgerbuilder");
    }

    // axios
    //   .get("https://my-burger-5a1c0.firebaseio.com/orders/ingredients.json")
    //   .then((res) => this.setState({ ingredients: res.data }))
    //   .catch((err) => {
    //     console.log("is this catch block excuted at all?");

    //     this.setState({ error: true });
    //   });
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
    // alert("To be continued");
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Alfred",
        address: {
          street: "random street 1",
          zipCode: "2134",
          country: "LTU",
        },
        email: "whatever@ever.com",
      },
      deliveryMethod: "fast",
    };
    axios
      .post("/orders.json", order)
      .then((res) => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch((err) => {
        this.setState({ loading: false, purchasing: false });
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

export default WithErrorHandler(BurgerBuilder, axios);
