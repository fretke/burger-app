import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import styles from "./SideDrawer.module.css";
import BackDrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxillary";

type sideDrawerProps = {
  toggle: () => void;
  open: boolean;
};

const sideDrawer = (props: sideDrawerProps) => {
  let attacedClasses = [styles.SideDrawer, styles.Close];
  if (props.open) {
    attacedClasses = [styles.SideDrawer, styles.Open];
  }
  return (
    <Aux>
      <BackDrop show={props.open} clicked={props.toggle} />
      <div className={attacedClasses.join(" ")}>
        <div style={{ height: "11%", margin: "32px" }}>
          <Logo />
        </div>
        <NavigationItems />
      </div>
    </Aux>
  );
};

export default sideDrawer;
