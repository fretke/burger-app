import React from "react";
import styles from "./Backdrop.module.css";

type backdropProps = {
  show: boolean;
  clicked: () => void;
};

const backDrop = (props: backdropProps) =>
  props.show ? (
    <div onClick={props.clicked} className={styles.Backdrop}></div>
  ) : null;

export default backDrop;
