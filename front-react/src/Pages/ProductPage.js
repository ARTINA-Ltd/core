import React from 'react';
import '../ProductPageComponent/index.css';
import MainImage from "../ProductPageComponent/MainImage";
import UnNav from "../ProductPageComponent/Un-nav";
import Footer from "../components/Footer/Footer";
import Price from "../ProductPageComponent/Price";
import Navbar from "../components/LandingPageNavBar/Header";
import Properties from "../ProductPageComponent/Properties";
import Activity from "../ProductPageComponent/Activity";
import Recomendition from "../ProductPageComponent/Recomendition";
function ProductPage(){

return<>
<div style={{direction:"rtl"}}>
<Navbar/>   
</div>

        <div dir='rtl' >
            
           
            <div className={"grid lg:grid-cols-2 md:grid-cols-1  sm:grid-cols-1"} >
                <MainImage />
                <Price />



            </div>
            <Properties/>
            <Activity/>
            <Recomendition/>
        </div>
        <div style={{direction:"rtl"}}>
        <Footer/>
        </div>
    
</>
} export default ProductPage;

