import React, { useEffect, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import "./NightSky.css"
const NightSky = () => {
  const [num, setNum] = useState(60);
  const [vw, setVw] = useState(Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
  const [vh, setVh] = useState(Math.max(document.documentElement.clientHeight, window.innerHeight || 0));

  useEffect(() => {
    const starryNight = () => {
      anime({
        targets: ["#sky .star"],
        opacity: [
          { duration: 700, value: "0" },
          { duration: 700, value: "1" }
        ],
        easing: "linear",
        loop: true,
        delay: (el, i) => 50 * i
      });
    };

    const shootingStars = () => {
      anime({
        targets: ["#shootingstars .wish"],
        easing: "linear",
        loop: true,
        delay: (el, i) => 1000 * i,
        opacity: [{ duration: 700, value: "1" }],
        width: [{ value: "150px" }, { value: "0px" }],
        translateX: 350
      });
    };

    starryNight();
    shootingStars();
  }, []);

  const randomRadius = () => Math.random() * 0.7 + 0.6;
  const getRandomX = () => Math.floor(Math.random() * Math.floor(vw)).toString();
  const getRandomY = () => Math.floor(Math.random() * Math.floor(vh)).toString();

  return (
    <div className="">
      <div id="App">
        <svg id="sky">
          {[...Array(num)].map((_, index) => (
            <circle cx={getRandomX()} cy={getRandomY()} r={randomRadius()} stroke="none" strokeWidth="0" fill="white" key={index} className="star" />
          ))}
        </svg>
        <div id="shootingstars">
          {[...Array(num)].map((_, index) => (
            <div key={index} className="wish" style={{ left: `${getRandomY()}px`, top: `${getRandomX()}px` }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NightSky