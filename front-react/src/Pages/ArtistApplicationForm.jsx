import { Block, Notify } from "notiflix";
import React, { useState } from "react";
import BorderButton from "../components/Buttons/BorderButton";
import SelectNftCard from "../components/Cards/UserDashboardCards/SelectNftCard";
import SimpleInput from "../components/Inputs/SimpleInput";
import TestLayout from "../Layouts/TestLayout";
import SimpleCard from "./../components/Cards/UserDashboardCards/SimpleCard";
import { useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router";

const ArtistApplicationForm = () => {
  const [getNfts, setNfts] = useState();
  const [value, setValue] = useState("");
  const [isChecekd, setIsChecekd] = useState(false);
  const [selectedNfts, setSelectedNfts] = useState([]);
  const user = useContext(UserContext);
  const { id } = useParams();
  const [getExhibitions, setExhibitions] = useState();

  const formatDate = inputDate => {
    return Intl.DateTimeFormat("fa", {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    }).format(new Date(inputDate));
  };
  const formatTime = inputDate => {
    return Intl.DateTimeFormat("fa", {
      minute: "numeric",
      hour: "numeric"
    }).format(new Date(inputDate));
  };
  const handleClickNft = nftId => {
    var newArr = [];
    var temp = 0;
    selectedNfts.forEach(val => {
      if (val !== nftId) {
        newArr.push(val);
      } else temp = 1;
    });
    if (temp == 0) newArr.push(nftId);
    setSelectedNfts(newArr);
  };

  const handleSubmit = () => {
    isChecekd
      ? axios
          .post(
            "https://api.artina.org/api/exhibition/applications/",
            {
              exhibition: id,
              contract_accepted: "True",
              nft: selectedNfts,
              description: value
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authTokens")}`
              }
            }
          )
          .then(() => Notify.success("با موفقیت ثبت شد"))
          .catch(() => Notify.failure("خطا"))
      : Notify.failure("برای ثبت درخواست ابتدا میبایست قراردار را بپذیرید");
  };

  useEffect(
    () => {
      axios
        .get(
          `https://api.artina.org/api/transaction/collection/${user
            ? user.data.username
            : 0}/nfts/`
        )
        .then(res => {
          setNfts(res.data);
        });

      // axios
      // .get(
      //   `https://api.artina.org/api/exhibition/ExhibitionInfoView/`
      // ),{
      //   exhibition_id:id,
      // },
      // {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
      //   },
      // }
      // .then((res) => {
      //   console.log(res);
      // });
      axios
        .get("https://api.artina.org/api/exhibition/exhibitions/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`
          },
          mode: "cors"
        })
        .then(res => {
          setExhibitions(res.data);
        });
    },
    [user]
  );

  return (
    <TestLayout wfull={true}>
      {getExhibitions
        ? getExhibitions.map(
            (item, index) =>
              item.id == id
                ? <span key={index}>
                    <img
                      src={item.image}
                      className="w-full h-[700px] object-cover"
                      alt=""
                    />
                    <div className="w-full rounded-xl z-20 flex justify-center inset-0 m-auto">
                      <div className="bg-white w-1/3  h-min  font-b7 -mt-[400px] rounded-2xl shadow-lg text-center p-3 opacity-70 flex flex-col gap-2">
                        <div className="text-2xl font-b9">
                          {item.marketName}
                        </div>
                        <div className="flex items-center gap-5 justify-center py-3 rounded-lg bg-gray-50 hover:bg-gray-100">
                          <div>
                            تاریخ شروع :{formatDate(item.start_date)}
                          </div>
                          <div>
                            ساعت :{formatTime(item.start_date)}
                          </div>
                        </div>
                        <hr />
                        <div className="flex items-center gap-5 justify-center py-3 rounded-lg hover:bg-gray-100">
                          <div>
                            تاریخ پایان :{formatDate(item.end_date)}
                          </div>
                          <div>
                            ساعت :{formatTime(item.end_date)}
                          </div>
                        </div>
                        <hr />
                        <div className="flex items-center gap-5 justify-center py-3 rounded-lg hover:bg-gray-100">
                          <div>
                            تاریخ پایان ثبت نام :
                            {formatDate(item.application_deadline)}
                          </div>
                          <div>
                            ساعت :{formatTime(item.application_deadline)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full justify-center mt-5">
                      <SimpleCard
                        className={
                          "bg-white  min-h-[200px] justify-center w-2/3 text-center flex flex-col gap-5"
                        }
                      >
                        <div className="font-b9 text-4xl">توضیحات نمایشگاه</div>
                        <div className=" text-2xl">
                          {item.description}
                        </div>
                      </SimpleCard>
                    </div>

                    <div className="flex w-full justify-center mt-5">
                      <SimpleCard className={"bg-white w-2/3 text-center"}>
                        <div className="font-b9 text-3xl mb-2">پیام هنرمند</div>
                        <div className="flex items-center gap-4 mb-4">
                          <SimpleInput
                            title={"متن پیام"}
                            onChange={e => setValue(e.target.value)}
                          />
                        </div>
                        <div className="font-b9 text-3xl mb-2">
                          ان اف تی های خود را انتخاب کنید
                        </div>
                        <div className="d-grid grid-cols-4 gap-3">
                          {getNfts
                            ? getNfts.map(
                                (item, index) =>
                                  !item.is_for_sale
                                    ? <SelectNftCard
                                        onClick={() => {
                                          if (
                                            selectedNfts.length >= 5 &&
                                            !selectedNfts.includes(item.id)
                                          ) {
                                            Notify.failure(
                                              "به سقف تعداد ممکن رسیده اید"
                                            );
                                          } else {
                                            handleClickNft(item.id);
                                          }
                                        }}
                                        name={item.name}
                                        key={index}
                                        price={item.last_price}
                                        image={item.image_url}
                                        isSelected={selectedNfts.includes(
                                          item.id
                                        )}
                                      />
                                    : ""
                              )
                            : ""}
                        </div>
                        <div className="w-full flex justify-end items-center gap-4">
                          <a
                            href="/"
                            className="text-gray-400 hover:text-gray-500 hover:bg-gray-50 px-2 py-1 transition-all duration-100 font-b2 rounded-md"
                          >
                            مشاهده قوانین
                          </a>
                          <div
                            className={`cursor-pointer rounded-full flex items-center gap-3 ${!isChecekd
                              ? "hover:bg-rose-50  hover:scale-105 transition-all border-[1px] border-rose-400 text-rose-400"
                              : "hover:bg-green-50 hover:scale-105 transition-all text-green-600 border-[1px] border-green-600"} transition-all px-3 py-2`}
                            onClick={() => setIsChecekd(prev => !prev)}
                          >
                            <div
                              className={`h-4 w-4 ${isChecekd
                                ? "bg-green-600"
                                : "bg-rose-50 border-[1px] border-rose-400"} rounded-full`}
                            />
                            <div> با قوانین موافقم</div>
                          </div>
                          <BorderButton
                            className={"px-6 py-3"}
                            onClick={handleSubmit}
                          >
                            ثبت
                          </BorderButton>
                        </div>
                      </SimpleCard>
                    </div>
                  </span>
                : ""
          )
        : ""}
    </TestLayout>
  );
};

export default ArtistApplicationForm;

// import { Block, Notify } from "notiflix";
// import React, { useState } from "react";
// import BorderButton from "../components/Buttons/BorderButton";
// import SelectNftCard from "../components/Cards/UserDashboardCards/SelectNftCard";
// import SimpleInput from "../components/Inputs/SimpleInput";
// import TestLayout from "../Layouts/TestLayout";
// import SimpleCard from "./../components/Cards/UserDashboardCards/SimpleCard";
// import { useContext } from "react";
// import { UserContext } from "../App";
// import axios from "axios";
// import { useEffect } from "react";
// import { useParams } from "react-router";

// const ArtistApplicationForm = () => {
//   const [getNfts, setNfts] = useState();
//   const [value, setValue] = useState("");
//   const [isChecekd, setIsChecekd] = useState(false);
//   const [selectedNfts, setSelectedNfts] = useState([]);
//   const user = useContext(UserContext);
//   const { id } = useParams();
//   const [getExhibitions, setExhibitions] = useState();

//   const formatDate = (inputDate) => {
//     return Intl.DateTimeFormat("fa", {
//       year: "numeric",
//       month: "numeric",
//       day: "numeric",
//     }).format(new Date(inputDate));
//   };
//   const formatTime = (inputDate) => {
//     return Intl.DateTimeFormat("fa", {
//       minute: "numeric",
//       hour: "numeric",
//     }).format(new Date(inputDate));
//   };
//   const handleClickNft = (nftId) => {
//     var newArr = [];
//     var temp = 0;
//     selectedNfts.forEach((val) => {
//       if (val !== nftId) {
//         newArr.push(val);
//       } else temp = 1;
//     });
//     if (temp == 0) newArr.push(nftId);
//     setSelectedNfts(newArr);
//   };

//   const handleSubmit = () => {
//     isChecekd
//       ? axios
//           .post(
//             "https://api.artina.org/api/exhibition/applications/",
//             {
//               exhibition: id,
//               contract_accepted: "True",
//               nft: selectedNfts,
//               description: value,
//             },
//             {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
//               },
//             }
//           )
//           .then((res) => console.log(res))
//           .catch((res) => console.log(res))
//       : Notify.failure("برای ثبت درخواست ابتدا میبایست قراردار را بپذیرید");
//   };

//   useEffect(() => {
//     axios
//       .get(
//         `https://api.artina.org/api/transaction/collection/${
//           user ? user.data.username : 0
//         }/nfts/`
//       )
//       .then((res) => {
//         console.log(res);
//         console.log(user);
//         setNfts(res.data);
//       });

//     // axios
//     // .get(
//     //   `https://api.artina.org/api/exhibition/ExhibitionInfoView/`
//     // ),{
//     //   exhibition_id:id,
//     // },
//     // {
//     //   headers: {
//     //     Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
//     //   },
//     // }
//     // .then((res) => {
//     //   console.log(res);
//     // });
//     axios
//       .get("https://api.artina.org/api/exhibition/exhibitions/", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
//         },
//         mode: "cors",
//       })
//       .then((res) => {
//         console.log(res);
//         setExhibitions(res.data);
//       });
//   }, [user]);

//   return (
//     <TestLayout wfull={true}>
//       {getExhibitions ? (
//         <span>
//           <img
//             src={getExhibitions.image}
//             className="w-full h-[700px] object-cover"
//             alt=""
//           />
//           <div className="w-full rounded-xl z-20 flex justify-center inset-0 m-auto">
//             <div className="bg-white w-1/3  h-min  font-b7 -mt-[400px] rounded-2xl shadow-lg text-center p-3 opacity-70 flex flex-col gap-2">
//               <div className="text-2xl font-b9">
//                 {getExhibitions.marketName}
//               </div>
//               <div className="flex items-center gap-5 justify-center py-3 rounded-lg bg-gray-50 hover:bg-gray-100">
//                 <div>تاریخ شروع :{formatDate(getExhibitions.start_date)}</div>
//                 <div>ساعت :{formatTime(getExhibitions.start_date)}</div>
//               </div>
//               <hr />
//               <div className="flex items-center gap-5 justify-center py-3 rounded-lg hover:bg-gray-100">
//                 <div>تاریخ پایان :{formatDate(getExhibitions.end_date)}</div>
//                 <div>ساعت :{formatTime(getExhibitions.end_date)}</div>
//               </div>
//               <hr />
//               <div className="flex items-center gap-5 justify-center py-3 rounded-lg hover:bg-gray-100">
//                 <div>
//                   تاریخ پایان ثبت نام :
//                   {formatDate(getExhibitions.application_deadline)}
//                 </div>
//                 <div>
//                   ساعت :{formatTime(getExhibitions.application_deadline)}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex w-full justify-center mt-5">
//             <SimpleCard
//               className={
//                 "bg-white  min-h-[200px] justify-center w-2/3 text-center flex flex-col gap-5"
//               }
//             >
//               <div className="font-b9 text-4xl">توضیحات نمایشگاه</div>
//               <div className=" text-2xl">{getExhibitions.description}</div>
//             </SimpleCard>
//           </div>

//           <div className="flex w-full justify-center mt-5">
//             <SimpleCard className={"bg-white w-2/3 text-center"}>
//               <div className="font-b9 text-3xl mb-2">پیام هنرمند</div>
//               <div className="flex items-center gap-4 mb-4">
//                 <SimpleInput
//                   title={"متن پیام"}
//                   onChange={(e) => setValue(e.target.value)}
//                 />
//               </div>
//               <div className="font-b9 text-3xl mb-2">
//                 ان اف تی های خود را انتخاب کنید
//               </div>
//               <div className="d-grid grid-cols-4 gap-3">
//                 {getNfts
//                   ? getNfts.map((item, index) =>
//                       !item.is_for_sale ? (
//                         <SelectNftCard
//                           onClick={() => {
//                             if (
//                               selectedNfts.length >= 5 &&
//                               !selectedNfts.includes(item.id)
//                             ) {
//                               Notify.failure("به سقف تعداد ممکن رسیده اید");
//                             } else {
//                               handleClickNft(item.id);
//                             }
//                           }}
//                           name={item.name}
//                           key={index}
//                           price={item.last_price}
//                           image={item.image_url}
//                           isSelected={selectedNfts.includes(item.id)}
//                         />
//                       ) : (
//                         ""
//                       )
//                     )
//                   : ""}
//               </div>
//               <div className="w-full flex justify-end items-center gap-4">
//                 <a
//                   href="/"
//                   className="text-gray-400 hover:text-gray-500 hover:bg-gray-50 px-2 py-1 transition-all duration-100 font-b2 rounded-md"
//                 >
//                   مشاهده قوانین
//                 </a>
//                 <div
//                   className={`cursor-pointer rounded-full flex items-center gap-3 ${
//                     !isChecekd
//                       ? "hover:bg-rose-50  hover:scale-105 transition-all border-[1px] border-rose-400 text-rose-400"
//                       : "hover:bg-green-50 hover:scale-105 transition-all text-green-600 border-[1px] border-green-600"
//                   } transition-all px-3 py-2`}
//                   onClick={() => setIsChecekd((prev) => !prev)}
//                 >
//                   <div
//                     className={`h-4 w-4 ${
//                       isChecekd
//                         ? "bg-green-600"
//                         : "bg-rose-50 border-[1px] border-rose-400"
//                     } rounded-full`}
//                   ></div>
//                   <div> با قوانین موافقم</div>
//                 </div>
//                 <BorderButton className={"px-6 py-3"} onClick={handleSubmit}>
//                   ثبت
//                 </BorderButton>
//               </div>
//             </SimpleCard>
//           </div>
//         </span>
//       ) : (
//         ""
//       )}
//     </TestLayout>
//   );
// };

// export default ArtistApplicationForm;
