import React from "react";
import AboutUs from "../components/Home/AboutUs";
import ExhebitionList from "../components/Home/ExhebitionList";
import Features from "../components/Home/Features";
import MainSlider from "../components/Home/MainSlider";
import NFTList from "../components/Home/NFTList";
import TestLayout from "../Layouts/TestLayout";
import AboutMetaverse from "../components/Home/AboutMetaverse";
import AboutAI from "../components/Home/AboutAI";
import Innovations from "../components/Home/Innovations";
import MostFrequentQuestions from "../components/Home/MostFreQuestions";
import GasPrice from "../components/Home/GasPrice";

const Home = () => {
  return (
    <TestLayout wfull={true}>
      <MainSlider />
      <NFTList className={"-mt-96 z-10 relative lg:mt-0 "} />
      <ExhebitionList className="mt-12" />
      <AboutUs className={"mt-20"} />
      <AboutMetaverse className="" />
      <AboutAI />
      <Innovations className={"my-10"} />
      <MostFrequentQuestions className={""} />
      <GasPrice className={"mt-10"} />
      {/* <Features className={"my-20"} /> */}
    </TestLayout>
  );
};

export default Home;
