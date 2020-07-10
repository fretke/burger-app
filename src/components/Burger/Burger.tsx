import React from "react";
import styles from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredient";

// type burgerProps = {
//   ingredients: ingrInterface;
// };

type burgerIngredients = "salad" | "bacon" | "cheese" | "meat";

type burgerProps = {
  ingredients: { [key in burgerIngredients]: number };
};

const burger = (props: burgerProps) => {
  let hasIngredients = false;

  const transformedIngredients = Object.keys(props.ingredients).map((igKey) => {
    if (
      igKey === "salad" ||
      igKey === "bacon" ||
      igKey === "cheese" ||
      igKey === "meat"
    ) {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    }
  });

  transformedIngredients.forEach((ingredient) => {
    if (ingredient && ingredient.length > 0) hasIngredients = true;
  });

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {hasIngredients ? (
        transformedIngredients
      ) : (
        <h1>Please add some ingredients</h1>
      )}
      {/* {transformedIngredients} */}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
