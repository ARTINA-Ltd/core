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
import SimpleInput from "./Inputs/SimpleInput";

const UploadItem = () => {
  const user = useContext(UserContext);

  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const hanndleNumberChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setOploadObj({ ...upladObj, last_price: e.target.value });
    }
  };

  const address = useAddress();
  const [upladObj, setOploadObj] = useState({
    image: "",
    item_name: "",
    description: "",
    external_link: "",
    creator: "",
    last_price: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    Notify.info("در حال آپلود اطلاعات. ممکن است کمی طول بکشد...");

    axios
      .post("https://api.artina.org/api/transaction/NFTViewSet/", {
        name: upladObj.item_name,
        owner: user ? user.data.id : "",
        creator: upladObj.creator,
        last_price: upladObj.last_price,
        image_url: imageUrl,
        description: upladObj.description,
        external_link: upladObj.external_link,
        author_address: address,
      })
      .then(() => {
        Notify.success("درخواست شما با موفقیت ثبت شد");
        setIsLoading(false);
      })
      .catch((e) => {
        Notify.failure("خطا");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (image) {
      Notify.info("در حال آپلود عکس");
      const formData = new FormData();
      formData.append("image", image, image.name);
      axios
        .post("https://api.artina.org/api/transaction/images/", formData)
        .then((res) => {
          Notify.success("با موفقیت آپلود شد");
          setImageUrl(res.data.image);
        })
        .catch(() => Notify.failure("خطا در آپلود"));
    }
  }, [image]);

  return (
    <div className="flex gap-16">
      <SimpleCard className="bg-[#4e45d0] w-[45%] flex flex-col relative gap-12 items-center overflow-hidden">
        <Button variant="contained" component="label">
          انتخاب تصویر
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={(e) => {
              setImage(() => e.target.files[0]);
            }}
          />
        </Button>
        <img className="w-full h-[400px] mt-5 rounded-xl" src={imageUrl} />
      </SimpleCard>
      <SimpleCard className={"flex flex-col gap-12 bg-white w-full"}>
        <div className="text-[24px]">آپلود فایل</div>
        <div className="flex gap-12">
          <SimpleInput
            type="text"
            title="نام اثر"
            placeholder="مثلا: تابلو نقاشی"
            // isValid={formValues.first_name != ""}
            onChange={(e) =>
              setOploadObj({ ...upladObj, item_name: e.target.value })
            }
            defaultValue={null}
          />
          <SimpleInput
            type="text"
            title="نام هنرمند"
            placeholder="مثلا: علیرضا موسوی"
            // isValid={formValues.first_name != ""}
            onChange={(e) =>
              setOploadObj({ ...upladObj, creator: e.target.value })
            }
            defaultValue={null}
          />
        </div>
        <div className="w-full">
          <SimpleInput
            type="text"
            title="توضیحات"
            placeholder=""
            // isValid={formValues.first_name != ""}
            onChange={(e) =>
              setOploadObj({ ...upladObj, description: e.target.value })
            }
            defaultValue={null}
          />
        </div>
        <div className="w-full">
          <SimpleInput
            type="text"
            title="لینک خارجی"
            placeholder="مثلا:https://www.artina.org"
            // isValid={formValues.first_name != ""}
            onChange={(e) =>
              setOploadObj({ ...upladObj, external_link: e.target.value })
            }
            defaultValue={null}
          />
        </div>
        <div className="w-full">
          <SimpleInput
            type="text"
            title="قیمت پایه"
            placeholder="مثلا: 129"
            // isValid={formValues.first_name != ""}
            onChange={(e) => hanndleNumberChange(e)}
            defaultValue={null}
          />
        </div>
        <div className="flex justify-end">
          {!isLoading ? (
            <div
              className=" text-white text-[14px] bg-[#4e45d0] py-5 px-[6rem] rounded-lg cursor-pointer transition-all hover:bg-[#372fac]"
              onClick={handleSubmit}
            >
              آپلود
            </div>
          ) : (
            <div className=" text-white text-[14px] bg-[#302c66] py-5 px-[6rem] rounded-lg cursor-not-allowed transition-all flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-10 h-10 animate-bounce"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <div className="whitespace-nowrap"> در حال آپلود...</div>
            </div>
          )}
        </div>
      </SimpleCard>
    </div>
  );
};

export default UploadItem;
