import { useState } from "react";
import { Link } from "react-router-dom";

function MainImage() {
    // const image=require("./images/image_2022-08-15_19-57-46.png").default
    const [Like, setLike] = useState(0)


    return <>
        <div className="box-content border-b-2 border-gray-400 rounded-lg ">
            <div className="like flex justify-center lg:mt-[50px] md:mt-[20px] sm:mt-[0px]">
                <img src={require("./images/image_2022-08-15_19-57-46.png")} alt="tablovo" className={" lg:w-[90%] lg:h-[80%] md:w-[75%] md:h-[60%] sm:w-[70%] sm:h-[45%]"} />
            </div>
            <div className="mt-4">
                <p className={"mr-4 inline text-3xl"}> {Like} </p>
                <button onClick={() => setLike(Like + 1)}
                    className={" mr-[10px] lg:w-[30px] lg:h-[30px] md:w-[20px] md:h-[20px] sm:w-[18px] sm:h-[18px]"}><img
                        src={require("./images/pngwing.com (94).png")} alt=""  /></button>
                {/* <a href="#"><img src={require("./images/share icon.png")} alt="" width={"20px"} height={"20px"} className={"ml-[15px] "} /></a>
                <Link to={"/Un-nav"}><img src={require("./images/refresh.png")} alt="" width={"20px"} height={"20px"} className={""} /></Link> */}

            </div>
        </div>
    </>

} export default MainImage;