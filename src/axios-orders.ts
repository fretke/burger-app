import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-burger-5a1c0.firebaseio.com/",
});

export default instance;
