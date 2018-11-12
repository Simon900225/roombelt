import { ErrorBoundary } from "./bugsnag";

import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import i18n from "./i18n";
import "./index.css";
import "./fonts/index.css";

i18n().then(() => {
  ReactDOM.render(
    <ErrorBoundary>
      <BrowserRouter children={<Router/>}/>
    </ErrorBoundary>,
    document.querySelector("#root"));
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js"));
}
