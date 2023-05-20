import "./price.css";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Price({ name, writer, date,description,price }) {
  return (
    <>
      <div className="  items-center">
        <div className="">
          <h2
            className={
              "flex lg:justify-start sm:justify-center lg:text-5xl font-bold mb-8 lg:mt-[100px] md:mt-[30px] md:text-4xl sm:mt-[15px] sm:text-3xl font"
            }
          >
            نام اثر:
          </h2>
          <h1 className="lg:text-8xl font-bold lg:mt-[-60px] md:text-6xl sm:text-6xl font">
            {name}
          </h1>

          <h2
            className={
              "flex lg:justify-start sm:justify-center lg:text-4xl font-bold mb-8 lg:mt-[40px] md:text-3xl sm:text-3xl sm:mt-[25px] font"
            }
          >
            {writer}
          </h2>
          <h1 className="lg:text-6xl font-bold lg:mt-[-50px] sm:text-4xl font"></h1>

          <h2
            className={
              "flex lg:justify-start sm:justify-center lg:text-4xl font-bold mb-8 lg:mt-[40px] md:text-3xl sm:text-3xl sm:mt-[25px] font"
            }
          >
            تاریخ ساخت :
          </h2>
          <h1 className="lg:text-6xl font-bold lg:mt-[-50px] sm:text-4xl font">
            {date}
          </h1>

          <h2
            className={
              "flex lg:justify-start sm:justify-center lg:text-4xl font-bold mb-8 lg:mt-[40px] md:text-3xl sm:text-3xl sm:mt-[20px] font"
            }
          >
            توضیحات:
          </h2>
          <p className="lg:text-3xl sm:text-2xl text-right flex justify-start font">
            {description}
          </p>

          <h2
            className={
              "flex lg:justify-start lg:text-4xl sm:justify-center font-bold mb-8 lg:mt-[40px] sm:text-3xl font"
            }
          >
            قیمت پایه:
          </h2>
          <h1 className="flex justify-center lg:text-6xl font-bold lg:mt-[-50px] border-b-2 border-gray-500 sm:text-3xl font">
            {price}
          </h1>
        </div>
      </div>
    </>
  );
}

export default Price;
