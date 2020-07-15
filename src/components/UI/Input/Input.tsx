import React, { ChangeEvent } from "react";
import styles from "./Input.module.css";

type inputProps = {
  name?: string;
  type?: string;
  placeholder?: string;
  inputtype: string;
  value: string;
  options?: any[];
  iscorrect: boolean;
  onChange?: (event: any) => void;
  //   label?: string;
};

const input = (props: inputProps) => {
  let inputElement: null | JSX.Element = null;

  let style = props.iscorrect
    ? styles.InputElement
    : styles.InputElement + " " + styles.Invalid;

  switch (props.inputtype) {
    case "input":
      inputElement = (
        <input
          onChange={props.onChange}
          className={style}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          // {...props}
        ></input>
      );
      break;
    case "textarea":
      inputElement = <textarea {...props} />;
      break;
    case "select":
      inputElement = (
        <select
          className={style}
          value={props.value}
          onChange={props.onChange}
          name={props.name}
        >
          {props.options?.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.display}
              </option>
            );
          })}
        </select>
      );
    default:
      break;
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.name}</label>
      {inputElement}
    </div>
  );
};

export default input;
