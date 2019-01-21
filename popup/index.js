// function setLocale(locale) {
//   chrome.storage.local.set({ locale: locale });
// }

// var enUS = document.getElementById("en-US");
// var deDE = document.getElementById("de-DE");
// var frFR = document.getElementById("fr-FR");

// enUS.addEventListener("click", function() {
//   setLocale("en-US");
// });
// deDE.addEventListener("click", function() {
//   setLocale("de-DE");
// });
// frFR.addEventListener("click", function() {
//   setLocale("fr-FR");
// });

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
