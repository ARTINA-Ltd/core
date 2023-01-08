import './index.css';
import {Link} from "react-router-dom";

function UnNav() {
    return <>

        <div className="share  flex justify-end  ml-[80px] mb-4 mt-2 opacity-50">

            <a href="#"><img src={require("./images/share icon.png")} alt="" width={"20px"} height={"20px"} className={"ml-[15px] "}/></a>

            <Link to={"/Un-nav"}><img src={require("./images/refresh.png")} alt="" width={"20px"} height={"20px"} className={""} /></Link>
        </div>

    </>

}

export default UnNav;