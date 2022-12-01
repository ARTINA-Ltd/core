import "./header-styles.css";
import React, { useState } from "react";
import Form from "../../create-exhibition-page/form/form";
const Section_1 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="section-1-background-image-main-header">
      <div className="section-1-header-main-container">
        <p className="section-1-header-main-title">
          نمایشگاه خود را ایجاد کنید
        </p>
        <p className="section-1-header-detail-title">
          نمایشگاه خود را در زمان دلخواه ایجاد <br /> و آثار هنرمندان مختلف را در آن
          گردآوری کنید
        </p>
        <div className="header-btn-container">
          <button className="section-1-header-button">بیشتر بدانید</button>
          <button onClick={togglePopup} className="section-1-header-button">
            {" "}
            ایجاد کردن
          </button>
          {isOpen && <Form handleClose={togglePopup} />}
        </div>
      </div>
    </div>
  );
};
export default Section_1;
