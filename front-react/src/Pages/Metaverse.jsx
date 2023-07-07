import React from "react";
import TestLayout from "../Layouts/TestLayout";

const Metaverse = () => {
  return (
    <TestLayout
      className={`flex flex-col items-center transition-all`}
      wfull={true}
    >
      <iframe src="https://metaverse.artina.org/" className="w-full h-[100vh]" frameBorder={0}></iframe>
    </TestLayout>
  );
};

export default Metaverse;
