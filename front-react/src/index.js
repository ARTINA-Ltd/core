import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./App";
import {BrowserRouter as Router} from "react-router-dom"
import './App.css';

import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import ArtistPage from "./Pages/ArtistPage";
import ExhibitionLists from "./Pages/ExhibitionLists";
import ExhibitionSignForm from "./Pages/ExhibitionSignForm";
import LoginPage from "./Pages/LoginPage";
import StarterFile from "./Pages/StarterFile";

// eslint-disable-next-line import/no-anonymous-default-export



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
        <App />
        </Router>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
