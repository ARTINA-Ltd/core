import "./section-cart-component_style.css";

import section_3_1 from "../images/section-3-1.png";
import section_3_2 from "../images/section-3-2.png";
import section_3_3 from "../images/section-3-3.png";
import section_3_4 from "../images/section-3-4.png";
import section_3_5 from "../images/section-3-5.png";

const Section_5_cart = () => {
  return (
    <div className="section-main-container-main">
      <h1 className="section-cart-main-header">دسته بندی‌ها</h1>
      <div className="section-cart-main-container">
        <div className="section-cart-container    special-image-section-cart-1">
          <img className="section-cart-pic" src={section_3_1}></img>
          <button className="section-cart-button">نستعلیق</button>
        </div>
        <div className="section-cart-container    special-image-section-cart-2">
          <img className="section-cart-pic" src={section_3_2}></img>
          <button className="section-cart-button">صوفی</button>
        </div>
        <div className="section-cart-container   special-image-section-cart-3">
          <img className="section-cart-pic" src={section_3_3}></img>
          <button className="section-cart-button">ثلث</button>
        </div>
        <div className="section-cart-container   special-image-section-cart-4">
          <img className="section-cart-pic" src={section_3_4}></img>
          <button className="section-cart-button">رنگی</button>
        </div>
        <div className="section-cart-container   special-image-section-cart-5">
          <img className="section-cart-pic   " src={section_3_5}></img>
          <button className="section-cart-button">انتزاعی</button>
        </div>
      </div>
    </div>
  );
};
export default Section_5_cart;

// {cart_information.map((item) => {
//   const { title, image } = item;
//   return (
//     <div className="section-cart-container">
//       <img className="section-cart-pic" src={image}></img>
//       <button className="section-cart-button">{title}</button>
//     </div>
//   );
// })}
