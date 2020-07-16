import React, { Component, Dispatch } from "react";

import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import { actionType } from "../../store/reducer";

import { burgerBuilderState, ingrType } from "../../store/reducer";

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
// type RouterProps = RouteComponentProps;

interface RouterProps extends RouteComponentProps {
  burgerIng: { [name: string]: number };
  totalPrice: number;
  onIngredientAdded: (name: string) => void;
  onIngredientRemoved: (name: string) => void;
}

///////////////////////

// export interface ingrInterface {
//   [name: string]: number;
// }

export type burgerIngredients = "salad" | "bacon" | "cheese" | "meat";

interface burgerState {
  purchaseable: boolean;
  purchasing: boolean;
  loading: boolean;
  error: boolean;
}

class BurgerBuilder extends Component<RouterProps, burgerState> {
  state = {
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

  updatePurchaseState = (ingredients: ingrType) => {
    for (const ing in ingredients) {
      if (ingredients[ing as burgerIngredients] > 0) {
        return true;
      }
    }
    return false;
  };

  updatePurchasing = (): void => {
    const prevValue = this.state.purchasing;
    this.setState({ purchasing: !prevValue });
  };

  purchaseContinueHandler = (): void => {
    this.props.history.push({ pathname: "/checkout" });
  };

  addIngredientHandler = (type: burgerIngredients): void => {
    // this.props.onIngredientAdded(type);
    // console.log(this.props.burgerIng, "burgerState from redux");

    // const oldCount = this.state.ingredients[type];
    // const updatedCount = oldCount + 1;
    // const updatedIngredients = {
    //   ...this.state.ingredients,
    // };
    // updatedIngredients[type] = updatedCount;
    // const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    // this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(this.props.burgerIng);
  };

  removeIngredientHandler = (type: burgerIngredients): void => {
    // this.props.onIngredientRemoved(type);
    // const oldCount = this.state.ingredients[type];
    // if (oldCount === 0) return;
    // const updatedIngredients = { ...this.state.ingredients };
    // updatedIngredients[type] = oldCount - 1;
    // const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    // this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    // this.updatePurchaseState(updatedIngredients);
  };

  render() {
    const disabledInfo: { [item: string]: boolean }[] = [];

    for (let key in this.props.burgerIng) {
      if (this.props.burgerIng[key as burgerIngredients] === 0) {
        disabledInfo.push({ key: true });
      } else {
        disabledInfo.push({ key: false });
      }
    }

    let orderSummary = null;
    // let burger;

    let burger = this.state.error ? <p>Ingredients not loaded</p> : <Spinner />;

    if (this.props.burgerIng) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.burgerIng} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientsRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            checkOut={this.updatePurchaseState(this.props.burgerIng)}
            purchasing={this.updatePurchasing}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          totalPrice={this.props.totalPrice}
          continueWithOrder={this.purchaseContinueHandler}
          cancelOrder={this.updatePurchasing}
          ing={this.props.burgerIng}
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

const mapStateToProps = (state: burgerBuilderState) => {
  return {
    burgerIng: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<actionType>) => {
  return {
    onIngredientAdded: (name: string): void => {
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        payload: name,
      });
    },
    onIngredientRemoved: (name: string): void => {
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        payload: name,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
