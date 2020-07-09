import React from "react";
import styles from "./BuildControl.module.css";
import { burgerIngredients } from "../../../../containers/BurgerBuilder/BurgerBuilder";

type buildInterface = {
  label: string;
  disable: { [key: string]: boolean };
  added: any; //need to change
  removed: any; //need to change
  //   added: (type: burgerIngredients) => any;
};

const buildControl = (props: buildInterface) => {
  console.log(props.disable, "shoud the less button be disabled?");

  return (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{props.label}</div>
      <button
        onClick={props.removed}
        className={styles.Less}
        disabled={props.disable.key}
      >
        Less
      </button>
      <button onClick={props.added} className={styles.More}>
        More
      </button>
    </div>
  );
};

export default buildControl;
