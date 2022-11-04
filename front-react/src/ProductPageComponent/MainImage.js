import {useState} from "react";



function MainImage() {
    // const image=require("./images/image_2022-08-15_19-57-46.png").default
    const [Like, setLike] = useState(0)


    return<>
        <div className="like flex justify-center mt-2">
            <img src={require("./images/image_2022-08-15_19-57-46.png")} alt="tablovo" width={"450px"} height={"450px"} className={""}/>

            <p className={"mr-2 inline"}> {Like} </p>
            <button onClick={() => setLike(Like + 1)}
                    className={"flex justify-center"}><img
                src={require("./images/pngwing.com (94).png")} alt="" width={"20px"} height={"20px"} /></button>

        </div>
    </>

}export default MainImage;