import React from "react";
import styles from "./Order.module.css";

type orderProps = {
  ing: string;
  price: number;
};

const Order = (props: orderProps) => (
  <div className={styles.Order}>
    <p>
      Ingredients:
      {props.ing}
    </p>
    <p>
      Price: <strong>{"USD " + props.price.toFixed(2)}</strong>{" "}
    </p>
  </div>
);

export default Order;
