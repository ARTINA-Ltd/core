import { useParams } from "react-router";
import Header from "../components/AdminPageNavbar/Header.js";
import Footer from "../components/Footer/Footer.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import SimpleSlider from "../components/Slider/Slider.jsx";
import BorderButton from "./../components/Buttons/BorderButton";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const ExhibitionApproval = () => {
  const { id } = useParams();
  const [nfts, setNfts] = useState(null);
  const [exhibition, setExhibition] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [edndDate, setEndDate] = useState(null);
  const [deadline, setDeadline] = useState(null);

  function updateTimeCounter() {
    const now = new Date();

    const startDate = new Date("2023-07-07T00:39:43+03:30");
    const elapsedTime = now.getTime() - startDate.getTime();

    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    setDeadline(`${hours} ساعت ${minutes} دقیقه ${seconds} ثانیه`);
  }
  setInterval(updateTimeCounter, 1000);

  function separateDate(dateTimeString) {
    const date = new Date(dateTimeString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth returns zero-based month, so add 1
    const day = date.getDate();

    return {
      year: year,
      month: month,
      day: day,
    };
  }

  useEffect(() => {
    axios
      .get(
        `https://api.artina.org/api/exhibition/nfts-by-exhibition/${id}/get_nfts/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((e) => {
        console.log(e.data);
        setNfts(e.data);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get(`https://api.artina.org/api/exhibition/nfts-by-exhibition/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((e) => {
        console.log(e.data);
        setExhibition(e.data);
        setStartDate(e.data.start_date);
        setEndDate(e.data.end_date);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleMetaverse = (id) => {
    axios
      .post(
        "https://api.artina.org/api/account/ticket/",
        {
          subject: "درخواست متاورس",
          text: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      )
      .then((res) => {
        console.log(res);
        Notify.success(
          "درخواست شما با موفقیت ثبت شد. پشتیبانی ما در اسرع وقت به تیکت شما پاسخ خواهند داد."
        );
      })
      .catch((e) => console.log(e));
  };

  return (
    <div dir="rtl">
      <Header />
      {exhibition ? (
        <div
          className={` ${'bg-[#f9f9f9] bg-[length:300px] bg-[url("https://artina.org/12.png")] '} min-h-full overflow-hidden pb-8`}
        >
          <div className="w-[90vw] mx-auto bg-white my-4 py-4 rounded-lg shadow-md">
            <h3 className="mr-8 text-3xl font-bold">{exhibition.marketName}</h3>
            <div className="my-4 w-full mx-auto">
              <div className="carousel w-full">
                {nfts
                  ? nfts.map((nft, index) => {
                      return (
                        <div
                          key={index}
                          id={`s${index}`}
                          className="py-4 carousel-item relative w-full"
                        >
                          <div className="container mx-auto w-full h-full ">
                            <img
                              src={nft.image_url}
                              alt={nft.name}
                              className="max-h-[50vh] rounded-md border-4 border-[#4e45d0] border-b-8 block  object-cover mx-auto "
                            />
                          </div>
                          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a
                              href={
                                index === nfts.length - 1
                                  ? `#s0`
                                  : `#s${index + 1}`
                              }
                              className="btn btn-circle"
                            >
                              ❮
                            </a>
                            <a
                              href={
                                index === 0
                                  ? `#s${nfts.length - 1}`
                                  : `#s${index - 1}`
                              }
                              className="btn btn-circle"
                            >
                              ❯
                            </a>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
          <div className="flex lg:block gap-4 w-[90vw] mx-auto">
            <div className=" bg-white lg:w-[90vw] w-1/2 p-8 shadow-md my-4  rounded-lg">
              <p className="-mr-4 text-gray-600 mb-5 font-bold">توضیحات</p>
              <p className=" text-gray-600">{exhibition.description}</p>
            </div>
            <div className="bg-white lg:w-[90vw] w-1/2 p-8 shadow-md my-4 rounded-lg">
              <h2 className="text-lg font-bold">تاریخ شروع</h2>
              <h2 className="text-lg mr-4">{`${separateDate(startDate).year}/${
                separateDate(startDate).month
              }/${separateDate(startDate).day}`}</h2>
              <h2 className="text-lg font-bold">تاریخ پایان</h2>
              <h2 className="text-lg mr-4">{`${separateDate(edndDate).year}/${
                separateDate(edndDate).month
              }/${separateDate(edndDate).day}`}</h2>
              <h2 className="text-lg font-bold">فروش بلیط تا</h2>
              <h2 className="text-lg mr-4">{deadline}</h2>
              <div className="flex gap-4 justify-end">
                <BorderButton
                  onClick={handleMetaverse}
                  className={`font-bold w-32`}
                >
                  تایید
                </BorderButton>
                <BorderButton className={`font-bold w-32`}>
                  عدم تایید
                </BorderButton>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  );
};
export default ExhibitionApproval;
