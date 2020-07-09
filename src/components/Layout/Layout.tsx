import React from "react";
import Aux from "../../hoc/Auxillary";
import styles from "./Layout.module.css";

import BurgerIngredient from "../Burger/BurgerIngredients/BurgerIngredient";

type layoutProps = {
  children?: React.ReactNode;
};

const layout = (props: layoutProps) => (
  <Aux>
    <div>Toolbar, SedeDrawer, Backdrop</div>
    <main className={styles.Content}>{props.children}</main>
  </Aux>
);

export default layout;
