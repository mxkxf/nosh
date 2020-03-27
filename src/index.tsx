import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./styles/index.css";
import App from "./components/App";
import AnalyticsProvider from "./components/AnalyticsProvider";
import store from "./state/store";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AnalyticsProvider>
        <App />
      </AnalyticsProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
