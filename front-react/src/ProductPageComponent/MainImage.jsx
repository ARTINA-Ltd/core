import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
function MainImage() {
  // const image=require("./images/image_2022-08-15_19-57-46.png").default
  const [Like, setLike] = useState(0);

  return (
    <div className="grid   p-4 mt-8 ">
      <div className="box-content lg:col-6  sborder-b-2 border-gray-400 rounded-lg lg:mr-8 ">
        <div className="like flex     ">
          <img
            src={require("./images/image_2022-08-15_19-57-46.png")}
            alt="tablovo"
            className={
              " w-full  "
            }
          />
        </div>

        <div className=" grid  flex  mt-4 lg:col-6  w-full  align-items-center justify-content-center  lg:w-full     h-auto p-4 ">
          <Button
            className="pi pi-heart  mt-4    col-12 lg:w-full sm:w-full md:w-full  w-full   md:col-4 lg:col-4    align-items-center justify-content-center 
"
            onClick={() => setLike(Like + 1)}
            style={{ fontSize: "2.5rem" }}
          >
            <span className="" style={{ fontFamily: " B Nazanin" }}>
              {" "}
              {Like}
            </span>
          </Button>

          <Button
            className="pi    pi-eye  m-4    lg:w-full sm:w-full md:w-full  w-4   col-12   md:col-4 lg:col-4 "
            style={{ fontSize: "2.5rem" }}
          >
            <span style={{ fontFamily: " B Nazanin" }}> 12.605</span>
          </Button>

          <Button
            className="pi m-4    pi-share-alt lg:w-full sm:w-full md:w-full  w-4 col-12   md:col-4 lg:col-4   "
            style={{ fontSize: "2.5rem" }}
          >
            <span style={{ fontFamily: " B Nazanin" }}> 8255</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
export default MainImage;
