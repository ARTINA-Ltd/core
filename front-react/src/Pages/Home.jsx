import React, { Suspense, lazy, useState } from "react";
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
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const HeroBanner = lazy(() => import("../components/HeroBanner/HeroBanner.jsx"));
const Home = () => {
  const [values, setValues] = useState("");
  return (
    <TestLayout wfull={true}>
      <Suspense fallback={<span className="loading loading-spinner loading-lg"></span>}>
        <HeroBanner />
      </Suspense>
      <NFTList className={"my-12"} />
      <DatePicker calendar={persian} locale={persian_fa} range dateSeparator=" to " onChange={setValues} />
      <button onClick={() => console.log(values[0].format())}>123</button>
      <ExhebitionList className="mt-12" />
      <AboutUs className={"mt-20"} />
      <AboutMetaverse className="" />
      <AboutAI />
      <Innovations className={"my-10"} />
      <MostFrequentQuestions className={""} />
      <Milesone className={"mx-auto container "} />
      <GasPrice className={"mt-10 sm:m-3"} />
      {/* <Features className={"my-20"} /> */}
    </TestLayout>
  );
};

export default Home;
