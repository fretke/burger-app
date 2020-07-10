import React from "react";
import styles from "./BuildControl.module.css";
import { burgerIngredients } from "../../../../containers/BurgerBuilder/BurgerBuilder";

type buildInterface = {
  label: string;
  disable: { [key: string]: boolean };
  added: () => void;
  removed: () => void;
};

const buildControl = (props: buildInterface) => {
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
