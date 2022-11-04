import {Component} from "react";
import './index.css';
import {Link} from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg  bg-gradient-to-r from-[#A9A5DC] via-[#7D74E8] to-[#A9A5DC]">
                <div className={"flex "}>
                    <a className="navbar-brand" href="#">Logo</a>
                    <ul className=" navbar-nav mr-4 flex items-center">
                        <li className="nav-item mr-4">
                            <a className="text-decoration-none text-white font-bold mr-9" href="#">خانه</a>
                        </li>
                        <li className=" ">
                            <a className="text-decoration-none text-white font-bold mr-9" href="#">ثبت نام </a>
                        </li>
                        <li className="">
                            <a className="text-decoration-none text-white font-bold mr-9" href="#">ورود</a>
                        </li>

                    </ul>
                </div>

                {/*<div className=" flex justify-center" >*/}

                {/*    <form className="form-inline my-2 my-lg-0 flex justify-center">*/}
                {/*        <input className=" mr-sm-2 w-[200px]" type="search" placeholder="Search" aria-label="Search"/>*/}
                {/*            <button className="btn  my-2 my-sm-0" type="submit">Search</button>*/}
                {/*    </form>*/}
                {/*</div>*/}
            </nav>


        )
    }
}

export default Navbar;







