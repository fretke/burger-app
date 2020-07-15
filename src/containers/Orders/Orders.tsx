import React, { Component } from "react";

import Order from "../../components/Order/Order";

import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

interface orders {
  customer: { [key: string]: string };
  email: string;
  name: string;
  deliveryMethod: string;
  ingredients: { [key: string]: number };
  price: number;
}

type ordersState = {
  orders: orders[];
  loading: boolean;
};

class Orders extends Component {
  state: ordersState = {
    orders: [],
    loading: true,
  };

  async componentWillMount() {
    try {
      const orders = await axios.get("/orders.json");

      const ordersArr = [];
      for (let key in orders.data) {
        ordersArr.push(orders.data[key]);
      }

      console.log(ordersArr);

      this.setState({ loading: false, orders: ordersArr });
      //   console.log(orders.data);
    } catch (err) {
      this.setState({ loading: false });
    }
  }

  render() {
    let allOrders;
    if (this.state.loading) {
      allOrders = <Spinner />;
    } else {
      allOrders = this.state.orders.map((order, index) => {
        let ingredientString = "";
        for (let ing in order.ingredients) {
          ingredientString += " " + ing + " (" + order.ingredients[ing] + ")  ";
        }
        return <Order key={index} ing={ingredientString} price={order.price} />;
      });
    }
    return <div>{allOrders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
