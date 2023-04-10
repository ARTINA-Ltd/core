import React from "react";
import TestLayout from "../Layouts/TestLayout";
import "../LoginComponent/formInput-style.css";

const Support = () => {
  return (
    <TestLayout>
      <div className="form-input">
        <div className="support-form">
          <h1>پشتیبانی</h1>

          <div className="input" style={{ direction: "ltr" }}>
            <label>ایمیل</label>
            <input type="email" className="" />
          </div>

          <div className="input">
            <label>متن درخواست</label>
            <textarea name="" id="" cols="30" rows="10" />
          </div>

          <button className="form-btn">ارسال</button>
        </div>
      </div>
    </TestLayout>
  );
};

export default Support;
