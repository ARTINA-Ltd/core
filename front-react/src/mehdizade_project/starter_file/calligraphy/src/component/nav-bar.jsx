import "./nav-bar-styles.css";
import {Fragment} from "react";
import {Outlet, Link} from "react-router-dom";
import {images} from "../../../../../ExhabitionComponent/src/component/images";
import React, {useState} from "react";
import Logo from "../images/footer/logo.png"
import { ConnectWallet } from "@thirdweb-dev/react";
// import Footer from "../footer/footer-component";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const menu = ["خانه ", "در باره ما", "پروفایل من"];

const Navbar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
//     <Fragment>
//       <div>
//         <img
//           className="menu-icon"
//           src={images["menue-icon.png"]}
//           onClick={showSidebar}
//         />
//         <p>salam</p>
//         <div className={sidebar ? "navbar-section  ac" : "navbar-section  d1"}>
//           <img
//             className="close-navbar"
//             src={images["close-icon.png"]}
//             onClick={showSidebar}
//           />
//           <div className="menu">
//             <Link to="/" className="menu-item">
//               خانه
//             </Link>

//             <Link to="/loginpage" className="menu-item">

// ورود
//             </Link>
//             <Link to="/requests" className="menu-item">
//               درخواست ها
//             </Link>
//           </div>
//           <div className="inner-addon">
//             {/* <input type="text" />
//             <i class="icon-bar"></i> */}
//            <Link to={"/"} > <button className="walletconnect">اتصال به کیف پول</button></Link>
//                           <img className="logo" src={Logo} alt="" />

//           </div>
//         </div>

//       </div>
//       <Outlet />
//     </Fragment>


        <Fragment>
            <div>
                <img
                    className="menu-icon"
                    src={images["menue-icon.png"]}
                    onClick={showSidebar}
                />
                <div className={sidebar ? "navbar-section ac " : "navbar-section dl"}>
                    <img
                        className="close-navbar"
                        src={images["close-icon.png"]}
                        onClick={showSidebar}
                    />
                    <div className="menu">
                        <Link to="/" className="menu-item">
                            خانه
                        </Link>

                        <Link to="/loginpage" className="menu-item">
                            ورود
                        </Link>
                        <Link to="/requests" className="menu-item">
                            درخواست ها
                        </Link>
                    </div>
                    <div className="inner-addon">
                        <ConnectWallet accentColor="#7c73e6" colorMode="light"/>
                        <img className="logo" src={Logo} alt=""/>
                    </div>
                </div>
            </div>
            <Outlet/>
        </Fragment>


    );
};

export default Navbar;
