import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
function MainImage() {
  // const image=require("./images/image_2022-08-15_19-57-46.png").default
  const [Like, setLike] = useState(0);

  return (
    <>
      <div className="box-content border-b-2 border-gray-400 rounded-lg ">
        <div className="like flex justify-center lg:mt-[50px] md:mt-[20px] sm:mt-[0px]">
          <img
            src={require("./images/image_2022-08-15_19-57-46.png")}
            alt="tablovo"
            className={
              " lg:w-[90%] lg:h-[80%] md:w-[75%] md:h-[60%] sm:w-[70%] sm:h-[45%]"
            }
          />
        </div>

        <div className=" grid  flex  m-4   w-auto  align-items-center justify-content-center     h-auto p-4 " >
         
            <Button
              className="pi pi-heart  m-4    col-12     md:col-3 lg:col-3    align-items-center justify-content-center 
"
              onClick={() => setLike(Like + 1)}
              style={{ fontSize: "2.5rem" }}
            >
                <span className="" style={{fontFamily:' B Nazanin'}} >  {Like}</span>
            
            </Button>

           
              <Button
                className="pi    pi-eye  m-4       col-12   md:col-3 lg:col-3 "
                style={{ fontSize: "2.5rem"  }}
              >
                  <span style={{fontFamily:' B Nazanin', }} >                 12.605 
</span>
              </Button>
          
            
              <Button
                className="pi m-4    pi-share-alt  col-12   md:col-3 lg:col-3   "
                style={{ fontSize: "2.5rem" }}
              >
                  <span style={{fontFamily:' B Nazanin'}} >  8255</span>
              
              </Button>
            
          
        </div>
      </div>
    </>
  );
}
export default MainImage;
