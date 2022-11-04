import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import '../ProductPageComponent/index.css';
import MainImage from "../ProductPageComponent/MainImage";
import UnNav from "../ProductPageComponent/Un-nav";
import Footer from "../ProductPageComponent/Footer";
import Price from "../ProductPageComponent/Price";
import Navbar from "../ProductPageComponent/Navbar";
import Properties from "../ProductPageComponent/Properties";
import Activity from "../ProductPageComponent/Activity";

function ProductPage(){

return<>
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
</>
} export default ProductPage;

