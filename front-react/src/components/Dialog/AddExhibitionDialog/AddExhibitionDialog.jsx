import { Dialog } from "primereact/dialog";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import BorderButton from "../../Buttons/BorderButton";
import { Button } from "primereact/button";
import axios from "axios";
import SimpleInput from "../../Inputs/SimpleInput";
import { Notify } from "notiflix";
import NftRequestsCard from "./../../Cards/UserDashboardCards/NftRequestsCard";

const AddExhibitionDialog = ({ user, nfts = [], description, exhibition }) => {
  const [visible, setVisible] = useState(false);
  const [ticket, setTicket] = useState(false);
  const [ticketPrice, setTicketPrice] = useState(false);
  const [contract, setContract] = useState(false);
  const [categories, setCtegories] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [options, setOptions] = useState([]);

  const [pdf, setPdf] = useState();

  const [values, setValues] = useState({
    marketName: "",
    image: "",
    start_date: "",
    end_date: "",
    description: "",
    application_deadline: "",
  });

  const [validate, setValidate] = useState({
    marketName: false,
    image: false,
    start_date: false,
    end_date: false,
    description: false,
    application_deadline: false,
  });

  const inputFile = useRef(null);
  const handleCategoryChange = e => {
    setSelectedCategory(e.value);
  };
  const [profileImage, setProfileImage] = useState();
  const [profileImageUrl, setProfileImageUrl] = useState();

  useEffect(
    () => {
      if (categories != undefined) {
        setOptions([]);

        categories.forEach(element => {
          setOptions(e => [...e, { value: element.id, label: element.name }]);
        });
      }
    },
    [categories]
  );

  useEffect(() => {
    if (pdf) {
      Notify.info("در حال آپلود فایل");
      const formData = new FormData();
      console.log("pdf");
      console.log(pdf);
      console.log("pdf");
      formData.append("file", pdf);
      formData.append("title", pdf.name);
      axios
        .post("https://api.artina.org/api/transaction/pdfs/", formData)
        .then((res) => {
          Notify.success("با موفقیت آپلود شد");
          setContract(res.data.url);
        })
        .catch((res) => console.log(res));
    }
  }, [pdf]);

  const handleSubmit = () => {
    axios
      .post(
        `https://api.artina.org/api/exhibition/exhibitions/`,

        {
          marketName: values.marketName,
          image: profileImageUrl,
          start_date: values.start_date,
          end_date: values.end_date,
          description: values.description,
          ticket: ticket,
          ticketPrice: ticket ? ticketPrice : 0,
          contract: contract,
          application_deadline: values.application_deadline,
          category: selectedCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((res) => {
        setVisible(false)
Notify.success("نمایشگاه با موفقت افزوده شد")
        window.location.reload(true)

      }).catch(()=>{Notify.failure("خطا")});
  };

  useEffect(() => {
    axios
      .get(`https://api.artina.org/api/exhibition/categories/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((res) => {
        console.log("_____________________");
        console.log("categories");
        console.log(res.data);
        console.log("_____________________");
        setCtegories(res.data);
      });
  }, []);
  useEffect(() => {
    if (profileImage) {
      Notify.info("در حال آپلود عکس");
      const formData = new FormData();
      formData.append("image", profileImage, profileImage.name);
      axios
        .post("https://api.artina.org/api/transaction/images/", formData)
        .then((res) => {
          Notify.success("با موفقیت آپلود شد");
          setProfileImageUrl(res.data.image);
        })
        .catch((res) => {Notify.failure("خطا در آپلود");
      console.log(res)
      });
    }
  }, [profileImage]);

  const Footer = (
    <div className="flex gap-5">
      <BorderButton
        onClick={() => setVisible(false)}
        className="w-full font-b4 text-center"
      >
        لغو
      </BorderButton>
      <BorderButton
        onClick={() => handleSubmit()}
        className="w-full font-b4 text-center"
      >
        ثبت
      </BorderButton>
      {/* <BorderButton
        className={"w-full font-b4 text-center"}
       
      >
        شارژ کیف پول
      </BorderButton> */}
    </div>
  );

  const Header = (
    <div>
      <p className="font-b9">افزودن نمایشگاه</p>
    </div>
  );

  return <div className="card flex justify-content-center">
      <div className="h-[420px] w-full bg-[#0000aa05] hover:bg-[#0000aa08] rounded-2xl group flex items-center justify-center cursor-pointer  transition-all md:h-[300px] sm:h-[250px]" onClick={() => setVisible(true)}>
        <div className="text-[#000022] opacity-20 group-hover:opacity-40 transition-all group-hover:scale-105 ease-out duration-150 flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.6" stroke="currentColor" width={"4em"}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="font-b6">افزودن نمایشگاه</div>
        </div>
      </div>
      <Dialog header={Header} visible={visible} style={{ width: "35vw", direction: "rtl" }} onHide={() => setVisible(false)} footer={Footer}>
        <div className="font-b4">
          <div className="flex-shrink-0 relative group items-center flex justify-center">
            <img src={profileImageUrl ? profileImageUrl : `${"https://api.artina.org/static/images/No_Image_Available.jpg"}`} className="pointer-events-none rounded-2xl overflow-hidden object-cover h-auto flex-shrink-0 w-1/2" />
            <div className="group-hover:opacity-80 opacity-0 cursor-pointer duration-300 bg-black transition-all w-1/2 h-full absolute inset-0 m-auto items-center justify-center flex rounded-2xl" onClick={() => inputFile.current.click()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.5" stroke="currentColor" className="text-white " width="3em">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
              </svg>
            </div>
            <input hidden accept="image/*" type="file" onChange={e => {
                setProfileImage(() => e.target.files[0]);
              }} ref={inputFile} />
          </div>
          <div className="flex flex-col gap-8 mt-8">
            <SimpleInput type="text" title="نام نمایشگاه" placeholder="مثلا: نمایشگاه تست" isValid={validate.marketName} validationError="نمی‌تواند خالی باشد" onChange={e => {
                setValues(prev => ({ ...prev, marketName: e.target.value }));
                setValidate(prev => ({
                  ...prev,
                  marketName: e.target.value != ""
                }));
              }} defaultValue={null} disabled={false} />

            <SimpleInput type="text" title="توضیحات نمایشگاه" placeholder="مثلا: نمایشگاه تست" isValid={validate.description} validationError="نمی‌تواند خالی باشد" onChange={e => {
                setValues(prev => ({ ...prev, description: e.target.value }));
                setValidate(prev => ({
                  ...prev,
                  description: e.target.value != ""
                }));
              }} defaultValue={null} disabled={false} />

            <SimpleInput type="date" title="تاریخ شروع" isValid={validate.start_date} validationError="نمی‌تواند خالی باشد" onChange={e => {
                setValues(prev => ({ ...prev, start_date: e.value }));
                setValidate(prev => ({ ...prev, start_date: e.value != "" }));
              }} defaultValue={null} disabled={false} />

            <SimpleInput type="date" title="تاریخ پایان" isValid={validate.end_date} validationError="نمی‌تواند خالی باشد" onChange={e => {
                setValues(prev => ({ ...prev, end_date: e.value }));
                setValidate(prev => ({ ...prev, end_date: e.value != "" }));
              }} defaultValue={null} disabled={false} />

            <SimpleInput type="date" title=" آخرین مهلت ثبت نام" isValid={validate.application_deadline} validationError="نمی‌تواند خالی باشد" onChange={e => {
                setValues(prev => ({
                  ...prev,
                  application_deadline: e.value
                }));
                setValidate(prev => ({
                  ...prev,
                  application_deadline: e.value != ""
                }));
              }} defaultValue={null} disabled={false} />

            <div className={`border-[1px] rounded-full px-3 py-1 cursor-pointer text-center transition-all ${ticket ? "border-green-500 text-green-600 bg-green-50" : "border-red-600 text-red-700 bg-red-50"}`} onClick={() => setTicket(prev => !prev)}>
              {ticket ? "تیکت دارد" : "تیکت ندارد"}
            </div>
            {ticket ? <SimpleInput type="number" title=" قیمت تیکت" isValid={ticketPrice !== ""} validationError="نمی‌تواند خالی باشد" onChange={e => {
                    setTicketPrice(e.target.value);
                  }} defaultValue={null} disabled={false} /> : ""}
            <div className="flex gap-3 items-center">
              <div>انتخاب فایل قرارداد</div>
              <input type="file" accept="application/pdf, application/doc" onChange={e => {
                  setPdf(() => e.target.files[0]);
                }} />
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="w-full">
                <SimpleInput options={options} type="dropdown" menuPlacement={"top"} onChange={handleCategoryChange} />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>;
};

export default AddExhibitionDialog;
