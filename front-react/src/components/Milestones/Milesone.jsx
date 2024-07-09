import Path from "./Path.jsx";
import Step from "./Step.jsx";

const Milesone = ({ className = "" }) => {
  return (
    <div
      className={`${className} h-56
         container`}
    >
      <div className="">
        <Path />
      </div>
    </div>
  );
};
export default Milesone;
