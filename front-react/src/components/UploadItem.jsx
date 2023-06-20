import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef,
} from "react";
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
import BorderButton from "./Buttons/BorderButton";

const UploadItem = () => {
  const user = useContext(UserContext);
  const inputFile = useRef(null);

  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const [tokenId, setTokenId] = useState();

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

    if (address) {
      setIsLoading(true);
      Notify.info("در حال ضرب اثر. ممکن است کمی طول بکشد...");

      axios
        .post(
          "https://api.artina.org/api/transaction/NFTViewSet/",
          {
            nft_name: upladObj.item_name,
            creator: upladObj.creator,
            last_price: upladObj.last_price,
            image_nft: imageUrl,
            description_nft: upladObj.description,
            external_link: upladObj.external_link,
            author_address: address,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
            },
            mode: "cors",
          }
        )
        .then((res) => {
          setTokenId(res.data);
          Notify.success("درخواست شما با موفقیت ثبت شد");
          setIsLoading(false);
          setIsUploaded(true);
        })
        .catch((e) => {
          Notify.failure("خطا");
          setIsLoading(false);
        });
    } else {
      Notify.failure("به کانکت والت متصل شوید");
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText("0x2a18fecb3579238cda960b5977f46e500fb6e735");
    Notify.success("کپی شد!");
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
    <div>
      <div className="flex gap-5 items-start">
        <SimpleCard className="bg-[#4e45d0] w-[45%] flex flex-col relative gap-5 items-center overflow-hidden">
          <div className="relative group w-full">
            <img
              className="w-full h-auto max-h-[800px] rounded-2xl"
              src={
                imageUrl
                  ? imageUrl
                  : "https://api.artina.org/static/images/No_Image_Available.jpg"
              }
            />

            <div
              className="group-hover:opacity-80 opacity-0 cursor-pointer duration-300 bg-black transition-all h-full w-full absolute inset-0 m-auto items-center justify-center flex rounded-2xl"
              onClick={() => inputFile.current.click()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="0.5"
                stroke="currentColor"
                className="text-white "
                width="3em"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                />
              </svg>
            </div>

            <input
              hidden
              accept="image/*"
              type="file"
              onChange={(e) => {
                setImage(() => e.target.files[0]);
              }}
              ref={inputFile}
            />
          </div>
        </SimpleCard>
        <SimpleCard className={"flex flex-col gap-12 bg-white w-full"}>
          <div className="text-[24px]">ضرب اثر</div>
          <div className="flex gap-12">
            <SimpleInput
              type="text"
              title="نام اثر"
              placeholder="مثلا: تابلو نقاشی"
              onChange={(e) =>
                setOploadObj(
                  // isValid={formValues.first_name != ""}
                  { ...upladObj, item_name: e.target.value }
                )
              }
              defaultValue={null}
            />
            <SimpleInput
              type="text"
              title="نام هنرمند"
              placeholder="مثلا: علیرضا موسوی"
              onChange={(e) =>
                setOploadObj(
                  // isValid={formValues.first_name != ""}
                  { ...upladObj, creator: e.target.value }
                )
              }
              defaultValue={null}
            />
          </div>
          <div className="w-full">
            <SimpleInput
              type="text"
              title="توضیحات"
              placeholder=""
              onChange={(e) =>
                setOploadObj(
                  // isValid={formValues.first_name != ""}
                  { ...upladObj, description: e.target.value }
                )
              }
              defaultValue={null}
            />
          </div>
          <div className="w-full">
            <SimpleInput
              ltr={true}
              type="text"
              title="لینک خارجی"
              placeholder="مثلا:https://www.artina.org"
              onChange={(e) =>
                setOploadObj(
                  // isValid={formValues.first_name != ""}
                  { ...upladObj, external_link: e.target.value }
                )
              }
              defaultValue={null}
            />
          </div>
          <div className="w-full">
            <SimpleInput
              type="text"
              title="قیمت پایه(اتریوم)"
              placeholder="مثلا: 129"
              onChange={
                (e) => hanndleNumberChange(e) // isValid={formValues.first_name != ""}
              }
              defaultValue={null}
            />
          </div>
          <div className="flex justify-end">
            {!isLoading ? (
              <BorderButton className="" onClick={handleSubmit}>
                ضرب اثر
              </BorderButton>
            ) : (
              <BorderButton className=" text-[14px] bg-[#302c66] py-5 px-[6rem] rounded-lg cursor-not-allowed transition-all flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 animate-bounce"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <div className="whitespace-nowrap"> در حال ضرب...</div>
              </BorderButton>
            )}
          </div>
        </SimpleCard>
      </div>
      {isUploaded ? (
        <SimpleCard className={"bg-green-50 mt-12 flex gap-12"}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.1"
              stroke="currentColor"
              className="w-40 h-40 text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
              />
            </svg>
          </div>
          <div className="text-right leading-[40px]">
            <div className="text-[20px] text-green-600">
              اثر شما با موفقیت تبدیل به ان اف تی شد و حالا میتونید رو کیف
              پولتون ببینیدش
            </div>
            <div className="text-[16px] text-green-900">
              وارد کیف پولتون شید روی تب nft روی import بزنید در قسمت contract
              کد زیر رو کپی کنید و در قسمت TokenId عدد {tokenId} را وارد کنید و
              ثبت رو بزنید.
            </div>
            <div
              className="text-[16px] text-green-900 bg-green-100 rounded-full w-min whitespace-nowrap px-7 cursor-pointer flex gap-12 items-center"
              onClick={handleCopy}
            >
              <div>کد:</div>
              0x2A18FECb3579238CdA960B5977f46E500Fb6e735
            </div>
          </div>
        </SimpleCard>
      ) : (
        ""
      )}
    </div>
  );
};

export default UploadItem;
