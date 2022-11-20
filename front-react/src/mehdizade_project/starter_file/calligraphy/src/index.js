import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./font/B-Nazanin.ttf";
import "./font/Iran-Nastaliq.ttf";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import StarterFile from "../../../../Pages/StarterFile";
import LoginPage from "../../../../Pages/LoginPage";
{
  /* <html
  dir="rtl"
  lang="fa"
></html>; /* nemidunam daghighan chegune bayad anjam beshe rastChin kardan */
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/*<App />*/}

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
