import React, { useState, useCallback, useEffect, useContext } from "react";
import Dropzone from "./Dropzone";
import "./UploadItem.css";
import axios from "axios";
import NFTupload from "./Uploaders/NFTupload";
import { useAddress } from "@thirdweb-dev/react";
import UploadCard from "./Cards/UserDashboardCards/UploadCard";
import SimpleCard from "./Cards/UserDashboardCards/SimpleCard";
import { Button } from "@mui/material";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { UserContext } from "../App";

const UploadItem = () => {
  const user = useContext(UserContext);

  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const hanndleNumberChange = e => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setOploadObj({ ...upladObj, last_price: e.target.value });
    }
  };

  const UploadImage = files => {
    setOploadObj({ ...upladObj, image: files });
  };

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.map(file => {
      const reader = new FileReader();
      reader.onload = function(e) {
        UploadImage(e.target.result);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);
  // const config = {
  //     headers: {
  //       Authorization: `Bearer ${Token}`,
  //     },
  //   };
  // const getOwner =()=>{
  //     axios
  //     .get("http://localhost:8000/api/transaction/Nfts/",{config})
  //     .then((res) => {

  //         setOwner(res.owner)
  //       // TODO: Redirection
  //     });
  // }
  const address = useAddress();
  const [upladObj, setOploadObj] = useState({
    image: "",
    item_name: "",
    description: "",
    external_link: "",
    creator: "",
    date_created: "",
    last_price: 0,
    owner: user ? user.data.user : ""
  });

  useEffect(() => {
    //getOwner()
    const today = new Date();
    setOploadObj({
      ...upladObj,
      date_created: today.toISOString().slice(0, 10)
    });
  }, []);

  var Token = localStorage.getItem("authTokens");

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8000/api/transaction/NFTViewSet/",
        {
          name: upladObj.item_name,
          owner: upladObj.owner,
          creator: upladObj.creator,
          last_price: upladObj.last_price,
          image_url: imageUrl,
          description: upladObj.description,
          external_link: upladObj.external_link,
          author_address: address
        },
        { headers: { Authorization: `Bearer ${Token}` } }
      )
      .then(res => {
        Notify.success("درخواست شما با موفقیت ثبت شد");
      })
      .catch(() => {
        Notify.failure("خطا");
      });
  };

  useEffect(
    () => {
      if (image) {
        Notify.info("در حال آپلود عکس");
        const formData = new FormData();
        formData.append("image", image, image.name);
        axios
          .post("https://api.artina.org/api/transaction/images/", formData)
          .then(res => {
            Notify.success("با موفقیت آپلود شد");
            setImageUrl(res.data.image);
          })
          .catch(() => Notify.failure("خطا در آپلود"));
      }
    },
    [image]
  );

  return (
    <div className="main__div ">
      <div className="header__div">
        <h1 className="header__name">بخش آپلود فایل</h1>
      </div>
      <div className="upload__nft__container flex gap-4">
        {/* <div
          className="upload__nft lg:col-6    col-12     "
          style={{ marginTop: "11rem", marginBottom: "8rem" }}
        >
          {!upladObj.image && <NFTupload onDrop={onDrop} />}
          {upladObj.image && (
            <div className="image__container">
              <div
                className="image__close__btn"
                onClick={() => setOploadObj({ ...upladObj, image: "" })}
              >
                <img
                  src={require("../assets/icons/cancel_button.png")}
                  alt="close"
                />
              </div>
              <img
                src={upladObj.image}
                style={{ height: "100%", justifyContent: "center" }}
                alt=""
              />
            </div>
          )}
        </div> */}
        <SimpleCard className={`bg-white w-1/3`}>
          <Button variant="contained" component="label">
            انتخاب تصویر
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={e => {
                setImage(() => e.target.files[0]);
              }}
            />
          </Button>
          <img className="w-full h-[400px] mt-5" src={imageUrl} />
        </SimpleCard>
        <div className="name__input__container w-full">
          <div className="nft__name">نام اثر</div>
          <input
            className="nft__name__input"
            value={upladObj.item_name}
            onChange={e =>
              setOploadObj({ ...upladObj, item_name: e.target.value })}
          />
        </div>
      </div>
      <div className="a1">
        <div className="a2">توضیحات</div>
        <textarea
          className="a3"
          value={upladObj.description}
          onChange={e =>
            setOploadObj({ ...upladObj, description: e.target.value })}
        />
      </div>
      <div className="a1">
        <div className="a2">لینک خارجی</div>
        <input
          className="a3_2"
          value={upladObj.external_link}
          onChange={e =>
            setOploadObj({ ...upladObj, external_link: e.target.value })}
        />
      </div>
      <div className="a4">
        <div className="a4_2">
          <div className="a2">نام هنرمند</div>
          <input
            className="a3"
            value={upladObj.creator}
            onChange={e =>
              setOploadObj({ ...upladObj, creator: e.target.value })}
          />
        </div>
        <div className="a4_2">
          <div className="a2">تاریخ ایجاد اثر</div>
          <input
            style={{ direction: "rtl", textAlign: "center" }}
            className="a3"
            value={upladObj.date_created}
            onChange={e =>
              setOploadObj({ ...upladObj, date_created: e.target.value })}
            type={"date"}
          />
        </div>
      </div>
      <div className="a4">
        <div className="a4_2">
          <div className="a2">قیمت پایه</div>
          <input
            className="a3_2"
            value={upladObj.last_price}
            onChange={e => hanndleNumberChange(e)}
          />
        </div>
        <div className="a4_2">
          <div className="a2" style={{ color: "transparent" }}>
            a
          </div>
          <div
            className="a3"
            style={{
              fontSize: "2.5em",
              background:
                "linear-gradient(to bottom right, rgba(100, 100, 255, 0.8), rgba(100, 100, 255, 0.84))",
              color: "white",
              cursor: "pointer",
              textAlign: "center"
            }}
            onClick={e => handleSubmit(e)}
          >
            آپلود
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadItem;
