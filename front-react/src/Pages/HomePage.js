import React from 'react';
import ReactDOM from 'react-dom/client';
import '../HomePageComponent/index.css';
import App from "../HomePageComponent/App.js";
import WhyUs from "../HomePageComponent/WhyUs";
import NavBar from "../HomePageComponent/NavBar";
import Expensive from "../HomePageComponent/Expensive";
import Footer from "../HomePageComponent/footer";
import ArtNft from "../HomePageComponent/ArtNft";
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {

    return <>
        <NavBar />

        <div>
            <App />
        </div>
        <WhyUs />
        <ArtNft />
        <Expensive />
        <Footer />
    </>
}

export default HomePage;