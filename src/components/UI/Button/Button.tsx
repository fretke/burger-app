import React, { ReactNode } from "react";

import styles from "./Button.module.css";

type customButtonProps = {
  children: ReactNode;
  clicked?: () => void;
  disable?: boolean;
  button: string;
};

const button = (props: customButtonProps) => (
  <button
    className={styles.Button + " " + styles[props.button]}
    onClick={props.clicked}
    disabled={props.disable}
  >
    {props.children}
  </button>
);

export default button;
