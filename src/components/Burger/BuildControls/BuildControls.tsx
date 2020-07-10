import React from "react";

import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import { burgerIngredients } from "../../../containers/BurgerBuilder/BurgerBuilder";

const control = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

type mainControls = {
  ingredientAdded: (type: burgerIngredients) => void;
  ingredientsRemoved: (type: burgerIngredients) => void;
  disabled: { [key: string]: boolean }[];
  price: number;
  checkOut: boolean;
  purchasing: () => void;
};

const buildControls = (props: mainControls) => {
  const shouldDisable = false;

  return (
    <div className={styles.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {control.map((item, index) => {
        return (
          <BuildControl
            key={item.label}
            label={item.label}
            added={() => props.ingredientAdded(item.type as burgerIngredients)}
            removed={() =>
              props.ingredientsRemoved(item.type as burgerIngredients)
            }
            disable={props.disabled[index]}
          />
        );
      })}
      <button
        onClick={props.purchasing}
        className={styles.OrderButton}
        disabled={!props.checkOut}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
