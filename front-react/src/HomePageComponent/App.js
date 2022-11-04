import React from "react";
import { Zoom } from "react-slideshow-image";
import image1 from "./1.png";
import image2 from "./2.png";
import image3 from "./3.png";
import image4 from "./4.png";
import image5 from "./5.png";
import 'bootstrap/dist/css/bootstrap.min.css';

const images = [image1, image2, image3, image4, image5];

const zoomOutProperties = {
    duration: 5000,
    transitionDuration: 800,
    infinite: true,
    indicators: true,
    scale: 1,
    arrows: true
};

const Slideshow = () => {
    return (
        <div className="slide-container img-fluid ">
            <Zoom {...zoomOutProperties}>
                {images.map((each, index) => (
                    <img key={index} style={{ width: "100%" }} src={each} />
                ))}
            </Zoom>
        </div>
    );
};

function App() {
    return (
        <div className="App">
            <Slideshow />
        </div>
    );
}

export default App;
