import React from "react";

import styles from "./NavigationItems.module.css";
import { NavLink } from "react-router-dom";

const navigationItems = () => (
  <ul className={styles.NavItems}>
    <li className={styles.NavItem}>
      <NavLink activeClassName={styles.active} exact to="/">
        Burger Builder
      </NavLink>
    </li>
    <li className={styles.NavItem}>
      <NavLink activeClassName={styles.active} to="/orders">
        Orders
      </NavLink>
    </li>
  </ul>
);

export default navigationItems;
