import React from "react";
import AboutUs from "../components/Home/AboutUs";
import ExhebitionList from "../components/Home/ExhebitionList";
import Features from "../components/Home/Features";
import MainSlider from "../components/Home/MainSlider";
import NFTList from "../components/Home/NFTList";
import TestLayout from "../Layouts/TestLayout";

const Home = () => {
  return (
    <TestLayout className="w-full">
      <MainSlider />
      <NFTList className={"-mt-44 z-10 relative"} />
      <ExhebitionList className="mt-12" />
      <AboutUs className={"mt-20"} />
      <Features className={"my-20"} />
    </TestLayout>
  );
};

export default Home;
