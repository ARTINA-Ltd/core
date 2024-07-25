import React, { Suspense, lazy } from "react";
import AboutUs from "../components/Home/AboutUs";
import ExhebitionList from "../components/Home/ExhebitionList";
import NFTList from "../components/Home/NFTList";
import TestLayout from "../Layouts/TestLayout";
import AboutMetaverse from "../components/Home/AboutMetaverse";
import AboutAI from "../components/Home/AboutAI";
import Innovations from "../components/Home/Innovations";
import MostFrequentQuestions from "../components/Home/MostFreQuestions";
import GasPrice from "../components/Home/GasPrice";
import Milesone from "./../components/Milestones/Milesone";

const HeroBanner = lazy(() => import("../components/HeroBanner/HeroBanner.jsx"));

const Home = () => {
  return (
    <TestLayout wfull={true}>
      <Suspense fallback={<span className="loading loading-spinner loading-lg"></span>}>
        <HeroBanner />
      </Suspense>
      <NFTList className={"my-12"} />
      <ExhebitionList className="mt-12" />
      <AboutUs className={"mt-20"} />
      <AboutMetaverse className="" />
      <AboutAI />
      <Innovations className={"my-10"} />
      <MostFrequentQuestions className={""} />
      <GasPrice className={"mt-10 sm:m-3"} />
      <Milesone className={"mx-auto container "} />
      
      {/* <Features className={"my-20"} /> */}
    </TestLayout>
  );
};

export default Home;
