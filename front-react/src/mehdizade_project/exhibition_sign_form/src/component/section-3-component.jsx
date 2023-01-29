// import React from "react";
import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
import "./section-3-component_style.css";
import image from "./../images/section-3-1.png";

// ----------------for importing images-----------
function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
export const images = importAll(
  require.context("./../images", false, /\.(png|jpe?g|svg)$/)
);
const Section_3 = () => {
  // ------for getting data from back----------
  const [requests, setRequests] = useState([""]);

  useEffect(() => {
    const fetchRequest = async () => {
      const res = await fetch("http://127.0.0.1:8000/transaction/Nfts/12/");
      // "http://127.0.0.1:8000/account/artists/6/get_nfts/"
      const requests = await res.json();
      setRequests(requests);
    };

    fetchRequest();
  }, []);
  console.log(requests);
let array=[];
array.push(requests);
  // for getting the data from form and send it to the back

  const [fname, setfName] = useState([]);
  const [lname, setlName] = useState([]);
  const [isChoosed, setIsChoosed] = useState([]);
  const collections = {
    nfts: [...isChoosed],
    ex: 2,
    commission: 50,
  };

  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
  };

  const handleName = (event) => {
    setfName({ json_post_fname: event.target.value });
    console.log(event.target.value);
  };

  const handlelName = (event) => {
    setlName({ json_post_lname: event.target.value });
  };

  const choosing_nft = (event) => {
    // REMOVING CHOOSEN NFT

    if (event.currentTarget.style.backgroundColor) {
      event.currentTarget.style.backgroundColor = null;
      event.currentTarget.style.color = null;

      const isBigEnough = (value) => {
        return value !== event.currentTarget.id;
      };
      setIsChoosed(isChoosed.filter(isBigEnough));
    } else {
      // ADDING CHOOSING NFT

      event.currentTarget.style.backgroundColor = "#d1fae5";
      setIsChoosed([...isChoosed, event.currentTarget.id]);
    }
  };
  console.log(collections);

  const onSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(collections),
    };
    fetch("http://78.38.35.249:8000/api/exhibition/nftexs/", requestOptions).then(
      (response) => console.log(response.json())
    );
  };

  return (
    <form className="the-main-continer" onSubmit={onSubmit}>
      <p className="formtitle">فرم زیر را پر کنید</p>
      <div className="main-container-form">
        <div className="image-container">
          <img className="image-paisley-edit" src={image} alt="paisley" />
        </div>
        <div className="input-fields-container-main ">
          <div className="input-fields-container-main ">
            <div className="name-and-familyname-form ">
              <input
                onChange={handleName}
                value={fname.json_post_fname}
                dir="rtl"
                className="input-fields-main"
                type="text"
                placeholder="نام خانوادگی "
              />
              <input
                onChange={handlelName}
                value={lname.json_post_lname}
                dir="rtl"
                className="input-fields-main"
                type="text"
                placeholder="نام"
              />
            </div>
            <input
              // size="57"
              dir="rtl"
              className="input-fields-main"
              type="text"
              placeholder="ایمیل خود را وارد کنید"
            />
            <div className="name-and-familyname-form">
              <input
                dir="rtl"
                className="input-fields-main"
                type="text"
                placeholder="استان"
              />
              <input
                dir="rtl"
                className="input-fields-main"
                type="text"
                placeholder="شهر"
              />
            </div>
            <input
              dir="rtl"
              className="input-fields-main"
              type="text"
              placeholder="تاریخ تولد"
            />
          </div>
          <div className="name-and-familyname-form">
            <a
              href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
              className="button-submit-form1 flex justify-center align-items-center"
            >
              مشاهده قرارداد
            </a>

            <button className="button-submit-form" onClick={handleClick}>
              رزومه خود را اپلود کنید
            </button>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
      {/*==================== nft choosing part======================= */}
      <p className="nftchooise">ان‌اف‌‌تی های خود را انتخاب کنید</p>
      <div className="nft-choose-main-container">
      {
      // request[""]=requests
        array.map((items) => {
          return (
            <div
              id={items.id}
              onClick={choosing_nft}
              className="section-3-nft-flexing-cart"
            >
              <img
                className="section-3-nft-choosing-images"
                src={"https://media.mehrnews.com/d/2017/10/11/4/2601895.jpg"}
                alt=""
              />
              <div className="detais-cart-nft-choosed">
                <p className="category-special-editing">{items.category}</p>
                <p className="title-special-editing">{items.name}</p>
                <p className="creator-special-editing">
                  {items.creator}
                  {items.first_name}
                </p>
                <div className="price-special-editing-container">
                  <p className="price-special-editing">
                    {items.lastPrice}
                    <span className="price-special-editini-details">:قیمت</span>
                  </p>               
                </div>
                <button
                    // onClick={choosing_nft}
                    className="price-special-editing-button"
                  >
                    انتخاب
                  </button>
              </div>
            </div>
          );
        })}
      </div>
      <button type="submit" className=" last-submit-button">
  تکمیل و ارسال درخواست
      </button>
    </form>
  );
};
export default Section_3;
