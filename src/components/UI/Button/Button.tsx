import React, { ReactNode } from "react";

import styles from "./Button.module.css";

type customButtonProps = {
  children: ReactNode;
  clicked?: () => void;
  button: string;
};

const button = (props: customButtonProps) => (
  <button
    className={styles.Button + " " + styles[props.button]}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
