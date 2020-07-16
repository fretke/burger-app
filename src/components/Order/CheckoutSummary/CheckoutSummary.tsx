import React from "react";

import Burger from "../../Burger/Burger";
import { burgerIngredients } from "../../Burger/Burger";
import { ingrType } from "../../../store/reducer";

import Button from "../../UI/Button/Button";
import styles from "./CheckoutSummary.module.css";

type checkoutProps = {
  ingredients: ingrType;
  goBack: () => void;
  continue: () => void;
};

const checkoutSummary = (props: checkoutProps) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>Some text about taste</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button clicked={props.goBack} button="Danger">
        CANCEL
      </Button>
      <Button clicked={props.continue} button="Success">
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
