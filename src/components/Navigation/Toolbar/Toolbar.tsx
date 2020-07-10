import React from "react";
import styles from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

type toolbarProps = {
  open: () => void;
};

const toolbar = (props: toolbarProps) => (
  <header className={styles.Toolbar}>
    <DrawerToggle toggle={props.open} />
    {/* <div onClick={props.open}>MENU</div> */}
    <div style={{ height: "80%" }}>
      <Logo />
    </div>
    <nav className={styles.Desktop}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
