import React from "react";

import styles from "./NavigationItems.module.css";

const navigationItems = () => (
  <ul className={styles.NavItems}>
    <li className={styles.NavItem}>
      <a href="/" className={styles.active}>
        Burger Builder
      </a>
    </li>
    <li className={styles.NavItem}>
      <a href="/">Checkout</a>
    </li>
  </ul>
);

export default navigationItems;
