import React from 'react';
import '../ProductPageComponent/index.css';
import MainImage from "../ProductPageComponent/MainImage";
import UnNav from "../ProductPageComponent/Un-nav";
import Footer from "../ProductPageComponent/footer-component";
import Price from "../ProductPageComponent/Price";
import Navbar from "../ProductPageComponent/nav-bar";
import Properties from "../ProductPageComponent/Properties";
import Activity from "../ProductPageComponent/Activity";
import Recomendition from "../ProductPageComponent/Recomendition";
function ProductPage(){

return<>
<Navbar/>
        <div dir='rtl'>
            
            {/* <UnNav /> */}
            <div className={"grid lg:grid-cols-2 md:grid-cols-1  sm:grid-cols-1"} >
                <MainImage />
                <Price />



            </div>
            <Properties/>
            <Activity/>
            <Recomendition/>
        </div>
        <Footer/>
</>
} export default ProductPage;

