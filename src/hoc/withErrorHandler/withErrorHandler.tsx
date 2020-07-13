import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxillary";
import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

const withErrorHandler = (
  WrappedComponent: typeof React.Component,
  axios: AxiosInstance
) => {
  return class extends Component {
    reqInterceptor: any;
    resInterceptor: any;
    state = {
      error: null,
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(
        (req: AxiosRequestConfig) => {
          this.setState({ error: null });
          return req;
        }
      );
      this.resInterceptor = axios.interceptors.response.use(
        (res: AxiosResponse) => res,
        (err: AxiosError) => {
          this.setState({ error: err.message });
          //   console.log(err.message, "received error");

          return err;
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    closeErr = () => {
      this.setState({ error: null });
    };

    render() {
      let showErr = false;
      let info = null;
      if (this.state.error) {
        info = this.state.error;
        showErr = true;
      }

      return (
        <Aux>
          <Modal show={showErr} modalClosed={this.closeErr}>
            {info}
          </Modal>
          <WrappedComponent />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
