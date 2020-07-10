import React from "react";
import styles from "./DrawerToggle.module.css";

const drawerToggle = (props: { toggle: () => void }) => (
  <div className={styles.DrawerToggle} onClick={props.toggle}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;
