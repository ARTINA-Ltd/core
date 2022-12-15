import "./footer-component_style.css";
import SocialMedia5 from "../images/footer/social-media5.png";
import SocialMedia1 from "../images/footer/social-media1.png";
import SocialMedia2 from "../images/footer/social-media2.png";
import SocialMedia3 from "../images/footer/social-media4.png";
import Logo from "../images/footer/logo.png"
// import { images } from "../images/footer";
import {Link} from "react-router-dom";
// function importAll(r) {
//   let images = {};
//   r.keys().forEach((item, index) => {
//     images[item.replace("./", "")] = r(item);
//   });
//   return images;
// }
// export const images = importAll(
//   require.context("./../images/footer", false, /\.(png|jpe?g|svg)$/)
// );
const link_content = [
  {
    link_1: "نویسنده ها",
    link_2: "کالکشن ها",
    link_3: "ایجاد یک آیتم",
  },
 
  {
    link_2: "ارتباط با ما",
    link_4: "سوالات",
  },
];

// const social_media = [
//   images["social-media5.png"],
//   images["social-media2.png"],
//   images["social-media1.png"],
//   images["social-media4.png"],
// ];

const Footer = () => {
  return (
//     <div className="footer">
//       <div className="footer-section">
//         <div className="footer-conent">
//           <div className="footer-about">
//             <div className="about-us">
//               <img className="logo" src={Logo} alt="" />
//               <p className="footer-title">آرتینا</p>
//             </div>
//             <p className="desc1">
// راهی تازه به دنیای هنر            </p>
//           </div>

//           <div className="footer-links">
//               <div className="links-box">
//                   <div classname="sublinks ">
//                     <div className="row">
//                     <div className="col">
                    
//                   <Link to={"/artistpage"} className="links"><p className="desc">نویسنده</p></Link>
//                   <Link to={"/artistpage"} className="links"><p className="desc">کالکشن ها</p></Link>
//                   <Link to={"/artistpage"} className="links"><p className="desc">ایجاد یک آیتم</p></Link>

//                   </div>
//                   <div className="col links1">
//                   <p className="link-title">دسته بندی ها </p>
//            

//                   </div>
//                   </div>
//                   </div>
//               </div>
//           </div>

//           <div className=" footer-contact">
//             <div className="social-media">
//      
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="copyright">Copyright @ 2022 by Artina-All rights reserved</div>
//     </div>
<>
<div className="content"  dir="rtl">



<footer dir="rtl">
  <div  className="footer-content-wrapper">
  <div className="footer-col large-25 small-50 tiny-100  flt">
     <div className="row socialmedia flex justify-content-center align-items-center mt-20 " dir="ltr">
     <img className="sm-icon" src={SocialMedia1} />
                <img className="sm-icon" src={SocialMedia2} />
                <img className="sm-icon" src={SocialMedia3} />
                <img className="sm-icon" src={SocialMedia5} />
                </div>
   </div>
    
    <div className="section footer-col large-25 small-50 tiny-100  flt">
      <p className="link-title">دسته بندی ها</p>
      <Link to={"/artistpage"} className="links"><p className="desc">ارتباط با ما</p></Link>
                   <Link to={"/artistpage"} className="links"><p className="desc">سوالات</p></Link>
                 <Link to={"/artistpage"} className="links"><p className="desc">درباره آرتینا</p></Link>
    </div>
    <div className="footer-col large-25 small-50 tiny-100  flt">
    <div className="footer-section">
        {/* <div className="footer-conent">
           <div className="footer-about"> */}
             <div className="about-us">
             <p className="footer-title">آرتینا</p>

               <img className="logo" src={Logo} alt="" />
             </div>
             <p className="desc1">
 راهی تازه به دنیای هنر            </p>
           </div>
    </div>
  </div>
  <div className="clearfix"></div>
         <div className="copyright">Copyright @ 2022 by Artina-All rights reserved</div>

</footer>
</div>
</>




  );
};
export default Footer;
