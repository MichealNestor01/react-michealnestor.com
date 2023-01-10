// standard react imports
import React from "react";
//import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

// get the styling so it is available globally
import "./styles/index.css";

// retrieve the app component on which everything sits
import App from "./App";

// provider gives the app access to the data in the store
import { Provider } from "react-redux";
import store from "./store/index";

// browser router enables react router
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
