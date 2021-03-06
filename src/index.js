import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./assets/Style/scss/main/main.css"
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// redux
import { Provider } from "react-redux";
import { store } from "./store/config-store";
// material
import { themes } from "../src/assets/Style/Themes/My-themes";
import { ThemeProvider } from "@material-ui/core";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={themes}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
