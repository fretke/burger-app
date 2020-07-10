import React, { Component } from "react";
import Aux from "../../hoc/Auxillary";
import styles from "./Layout.module.css";

import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

type layoutProps = {
  children?: React.ReactNode;
};

type stateProps = {
  showSideDrawer: boolean;
};

class Layout extends Component<layoutProps> {
  state: stateProps = {
    showSideDrawer: false,
  };

  sideDrawerHandler = (): void => {
    const prevValue = this.state.showSideDrawer;
    this.setState({ showSideDrawer: !prevValue });
  };

  render() {
    return (
      <Aux>
        <Toolbar open={this.sideDrawerHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          toggle={this.sideDrawerHandler}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
