import React from 'react';
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
        <div>
            <Navbar/>
            <UnNav />
            <div className={"grid grid-cols-2 divide-x"} >
                <MainImage />
                <Price />



            </div>
            <Properties/>
            <Activity/>
            <Footer/>
        </div>
</>
} export default ProductPage;

