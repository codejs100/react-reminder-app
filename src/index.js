import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import "./index.css";

import remainders from "./reducers/index";

import App from "./components/App";

const store = createStore(remainders);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
