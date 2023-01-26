import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import register from "./serviceWorkerRegistration";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

register();
