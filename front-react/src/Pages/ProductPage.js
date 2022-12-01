import React from 'react';
import '../ProductPageComponent/index.css';
import MainImage from "../ProductPageComponent/MainImage";
import UnNav from "../ProductPageComponent/Un-nav";
import Footer from "../ProductPageComponent/footer-component";
import Price from "../ProductPageComponent/Price";
import Navbar from "../ProductPageComponent/nav-bar";
import Properties from "../ProductPageComponent/Properties";
import Activity from "../ProductPageComponent/Activity";

function ProductPage(){

return<>
<Navbar/>
        <div dir='rtl'>
            
            <UnNav />
            <div className={"grid grid-cols-2 divide-x"} >
                <MainImage />
                <Price />



            </div>
            <Properties/>
            <Activity/>
            
        </div>
        <Footer/>
</>
} export default ProductPage;

