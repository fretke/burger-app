import React from "react";

import burgerLogo from "../../assests/images/burger-logo.png";
import styles from "./Logo.module.css";

const logo = () => (
  <div className={styles.Logo}>
    <img src={burgerLogo} alt="myBurger" />
  </div>
);

export default logo;
