import React, { Component, ChangeEvent } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

import Spinner from "../../../components/UI/Spinner/Spinner";
import { RouteComponentProps } from "react-router-dom";

interface dataProps extends RouteComponentProps {
  ingredients: { [key: string]: number };
  total: number;
}

type contactDataState = {
  orderForm: { [key: string]: any };
  loading: boolean;
  isValidForm: boolean;
};

class ContactData extends Component<dataProps> {
  state: contactDataState = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        valid: true,
        validation: {
          required: true,
          minLength: 5,
        },
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        valid: true,
        validation: {
          required: true,
        },
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
        valid: true,
        validation: {
          required: true,
        },
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        valid: true,
        validation: {
          required: true,
        },
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        valid: true,
        validation: {
          required: true,
        },
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", display: "Fastest" },
            { value: "cheapest", display: "Cheapest" },
          ],
        },
        value: "fastest",
        valid: true,
        validation: {
          required: false,
        },
        touched: true,
      },
    },
    isValidForm: false,
    loading: false,
  };

  orderHandler = () => {
    // event.preventDefault();

    // console.log(this.props.ingredients, "ingredients passed to contact data");

    const formData: { [key: string]: string } = {};

    for (let element in this.state.orderForm) {
      formData[element] = this.state.orderForm[element].value;
    }

    console.log(formData, "formData");

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.total,
      customer: formData,
    };
    axios
      .post("orders.json", order)
      .then((res) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  };

  manageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.name, "name");
    // console.log(event.target.value, "value");
    const { name, value } = event.target;
    const orderForm = { ...this.state.orderForm };
    const updatedElement = { ...orderForm[name] };
    updatedElement.value = value;
    updatedElement.valid = this.checkValidity(name, value);
    updatedElement.touched = true;
    orderForm[name] = updatedElement;
    // console.log(orderForm, "updatedOrderForm");

    let isFormValid = true;
    for (let formElement in orderForm) {
      if (!orderForm[formElement].touched || !orderForm[formElement].valid) {
        isFormValid = false;
        break;
      }
    }

    // orderForm[event.target.name].value = event.target.value;
    this.setState({ orderForm: orderForm, isValidForm: isFormValid });
  };

  checkValidity(name: string, value: string): boolean {
    let isValid = true;
    let validataionParams = this.state.orderForm[name].validation;
    // if (!this.state.orderForm[name].touched) return true;
    if (validataionParams.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (validataionParams.minLength) {
      isValid = value.trim().length > 5 && isValid;
    }
    return isValid;
  }

  render() {
    const formElementsArr = [];

    console.log(this.state.isValidForm);

    for (let key in this.state.orderForm) {
      formElementsArr.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <React.Fragment>
        <form>
          {formElementsArr.map((formElement) => {
            return (
              <Input
                key={formElement.id}
                inputtype={formElement.config.elementType}
                value={formElement.config.value}
                name={formElement.id}
                placeholder={formElement.config.elementConfig.placeholder}
                type={formElement.config.elementConfig.type}
                options={formElement.config.elementConfig.options}
                iscorrect={formElement.config.valid}
                onChange={this.manageChange}
              />
            );
          })}
        </form>
        <Button
          button="Success"
          clicked={this.orderHandler}
          disable={!this.state.isValidForm}
        >
          Order
        </Button>
      </React.Fragment>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
