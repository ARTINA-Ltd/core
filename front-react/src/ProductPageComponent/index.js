import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import './index.css';
import reportWebVitals from './reportWebVitals';
import MainImage from "./MainImage";
import UnNav from "./Un-nav";
import Footer from "./Footer";
import Price from "./Price";
import Navbar from "./Navbar";
import Properties from "./Properties";
import Activity from "./Activity";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
        <Navbar/>
        <UnNav />
        <div className={"grid grid-cols-2 divide-x"} >
            <MainImage />
            <Price />



        </div>
            <Properties/>
            <Activity/>
        <Footer/>
        </Router>
    </React.StrictMode>
);


reportWebVitals();
