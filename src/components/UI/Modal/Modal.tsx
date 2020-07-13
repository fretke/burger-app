import React, { Component } from "react";
import styles from "./Modal.module.css";
import Aux from "../../../hoc/Auxillary";
import BackDrop from "../Backdrop/Backdrop";

type modalProps = {
  children?: React.ReactNode;
  show: boolean;
  modalClosed: () => void;
};

class Modal extends Component<modalProps> {
  shouldComponentUpdate(nextProps: modalProps) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <Aux>
        <BackDrop clicked={this.props.modalClosed} show={this.props.show} />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
