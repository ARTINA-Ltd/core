import React, { useState, useEffect, useRef } from "react";
import "./UploadItem.css";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";
import SimpleCard from "./Cards/UserDashboardCards/SimpleCard";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import SimpleInput from "./Inputs/SimpleInput";
import BorderButton from "./Buttons/BorderButton";
import { Block } from "notiflix";
import { Dialog } from "primereact/dialog";
import { useTranslation } from "react-i18next";

const UploadItem = () => {
  const { t } = useTranslation();
  const inputFile = useRef(null);
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [tokenId, setTokenId] = useState();
  const [hasPhysical, setHasPhysical] = useState(false);
  const [hasInternalWallet, setHasInternalWallet] = useState(false);
  const [categories, setCategories] = useState();
  const [collections, setCollections] = useState();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [collectionsOptions, setCollectionOptions] = useState([]);

  useEffect(() => {
    if (categories != undefined) {
      setCategoryOptions([]);

      categories.forEach((element) => {
        setCategoryOptions((e) => [...e, { value: element.id, label: element.name }]);
      });
    }
  }, [categories]);

  useEffect(() => {
    if (collections != undefined) {
      setCollectionOptions([]);

      collections.forEach((element) => {
        setCollectionOptions((e) => [...e, { value: element.id, label: element.name }]);
      });
    }
  }, [collections]);

  useEffect(() => {
    axios
      .get(`https://api.artina.org/api/transaction/categories/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((res) => {
        console.log("_____________________");
        console.log("Categories");
        console.log(res.data);
        console.log("_____________________");
        setCategories(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://api.artina.org/api/transaction/collections/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((res) => {
        console.log("_____________________");
        console.log("Collection");
        console.log(res.data);
        console.log("_____________________");
        setCollections(res.data);
      });
  }, []);

  const address = useAddress();

  const [upladObj, setOploadObj] = useState({
    image: "",
    item_name: "",
    description: "",
    external_link: "",
    creator: "",
    last_price: "",
  });

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.value);
  };

  const handleSubmit = (e) => {
    setDisabled(true);
    setTimeout(() => setDisabled(false), 30000);
    e.preventDefault();
    if (address) {
      setIsLoading(true);
      Notify.info(t("mintingNotif"));

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
            has_physical: hasPhysical,
            category: selectedCategory,
            has_internal_wallet: hasInternalWallet,
            data: uploadObj.properties,
            collection: selectedCollection,
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
          Notify.success(t("mintSuccessNotif"));
          setIsLoading(false);
          setIsUploaded(true);
          console.log(res);
        })
        .catch((e) => {
          setIsLoading(false);
          console.log(e);
          console.log("Category:", selectedCategory);
          console.log("Has Physical:", hasPhysical);

          if (e.response.data.error === "your money is not enough") {
            Notify.failure(t("mintLowBalanceNotif"));
          } else {
            Notify.failure(t("error"));
          }
          setIsLoading(false);
        });
    } else if (hasInternalWallet) {
      setIsLoading(true);
      Notify.info(t("mintingNotif"));

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
            author_address: "",
            has_physical: hasPhysical,
            category: selectedCategory,
            has_internal_wallet: hasInternalWallet,
            data: uploadObj.properties,
            collection: selectedCollection,
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
          Notify.success(t("mintSuccessNotif"));
          setIsLoading(false);
          setIsUploaded(true);
          console.log(res);
        })
        .catch((e) => {
          setIsLoading(false);
          console.log(e);
          console.log("Category:", selectedCategory);
          console.log("Has Physical:", hasPhysical);

          if (e.response.data.error === "your money is not enough") {
            Notify.failure(t("mintLowBalanceNotif"));
          } else {
            Notify.failure(t("error"));
          }
          setIsLoading(false);
        });
    } else {
      Notify.failure(t("mintConnectWalletNotif"));
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText("0xB0Df35D093752d7fAf6bc3D4304CEFcCABe7a86a");
    Notify.success(t("copied"));
  };
  useEffect(() => {
    if (image) {
      Block.circle("#nftImage");

      Notify.info(t("uploadingPhoto"));
      const formData = new FormData();
      formData.append("image", image, image.name);
      axios
        .post("https://api.artina.org/api/transaction/images/", formData)
        .then((res) => {
          Notify.success(t("uploadSuccess"));
          setImageUrl(res.data.image);
          Block.remove("#nftImage", 3000);
        })
        .catch(() => {
          Notify.failure(t("uploadError"));
          Block.remove("#nftImage", 3000);
        });
    }
  }, [image]);

  const [uploadObj, setUploadObj] = useState({
    properties: [], // {name: '', type: ''}
  });
  const [newProperty, setNewProperty] = useState({
    name: "",
    type: "",
  });

  const handleInputChange = (property, value) => {
    setNewProperty({
      ...newProperty,
      [property]: value,
    });
  };

  const handleAddProperty = () => {
    setUploadObj({
      ...uploadObj,
      properties: [...uploadObj.properties, newProperty],
    });
    // Clear the form after adding a new property
    setNewProperty({ name: "", type: "" });
    setVisible(false);
  };

  const handleRemoveProperty = (index) => {
    const updatedProperties = [...uploadObj.properties];
    updatedProperties.splice(index, 1);
    setUploadObj({
      ...uploadObj,
      properties: updatedProperties,
    });
  };

  return (
    <div>
      <div className="flex gap-5 items-start lg:flex-col lg:items-center">
        <SimpleCard className="bg-primary w-[45%] flex flex-col relative gap-5 items-center overflow-hidden lg:w-[55%] md:w-[65%] sm:w-[80%]">
          <div className="relative group w-full rounded-2xl" id="nftImage">
            <img alt="" className="w-full h-auto max-h-[800px] rounded-2xl" src={imageUrl ? imageUrl : "https://api.artina.org/static/images/No_Image_Available.jpg"} />

            <div className="group-hover:opacity-80 opacity-0 cursor-pointer duration-300 bg-black transition-all h-full w-full absolute inset-0 m-auto items-center justify-center flex rounded-2xl" onClick={() => inputFile.current.click()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.5" stroke="currentColor" className="text-white " width="3em">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
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
        <SimpleCard className={"flex flex-col gap-12 bg-base-100 w-full sm:gap-4"}>
          <div className="text-[24px]">{t("addArt")}</div>
          <div className="flex gap-4 sm:flex-col">
            <SimpleInput
              type="text"
              title={t("artName")}
              placeholder={t("mintNameExample")}
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
              title={t("artist")}
              placeholder={t("mintArtistExample")}
              onChange={(e) =>
                setOploadObj(
                  // isValid={formValues.first_name != ""}
                  { ...upladObj, creator: e.target.value }
                )
              }
              defaultValue={null}
            />
          </div>
          <div className="w-full flex gap-4 sm:flex-col">
            <div className="w-full -mx-4">
              <SimpleInput options={categoryOptions} className={"bg-base-100"} type="dropdown" placeholder={t("selectCategory")} onChange={handleCategoryChange} />
            </div>
            <div className="w-full">
              <SimpleInput
                type="number"
                title={t("basePrice(ethereum)")}
                placeholder={t("mintPriceExample")}
                onChange={(e) =>
                  setOploadObj(
                    // isValid={formValues.first_name != ""}
                    { ...upladObj, last_price: e.target.value }
                  )
                }
                defaultValue={null}
              />
            </div>
          </div>
          <div className="w-full flex gap-4 sm:flex-col">
            {}
            <div className="w-full">
              <p className="text-[14px] cursor-pointer pt-2 border-r-2 pb-2 pr-3 border-primary font-b5" onClick={() => setVisible(true)}>
                {t("chooseProperties")}{" "}
              </p>
              {uploadObj.properties.map((property, index) => (
                <div key={index} className="flex mt-4 items-center justify-between">
                  {/* <p className="">{index + 1}-</p> */}
                  <p className="">
                    {t("name")}: {property.name}
                  </p>
                  <p className="">
                    {t("type")}: {property.type}
                  </p>
                  <BorderButton className="block" size="sm" onClick={() => handleRemoveProperty(index)}>
                    {t("delete")}
                  </BorderButton>
                </div>
              ))}

              <Dialog header={t("mintProperties")} visible={visible} style={{ direction: "rtl" }} className="w-[30rem] h-[15rem]" onHide={() => setVisible(false)}>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-3 items-center mt-4">
                    <SimpleInput type="text" title={t("name")} placeholder={t("propertyNameExample")} onChange={(e) => handleInputChange("name", e.target.value)} value={newProperty.name} defaultValue={null} />
                    <SimpleInput type="text" title={t("type")} placeholder={t("propertyTypeExample")} onChange={(e) => handleInputChange("type", e.target.value)} value={newProperty.type} defaultValue={null} />
                  </div>
                  <div className="flex justify-between">
                    <BorderButton className="text-lg" size="sm" onClick={handleAddProperty}>
                      {t("submit")}
                    </BorderButton>
                  </div>
                </div>
              </Dialog>
            </div>
          </div>
          <div className="w-full flex gap-3 items-center">
            <div className="">{t("isPhysicalVersion")}</div>
            <div className={`px-5 text-xs py-1 rounded-2xl cursor-pointer ${hasPhysical ? "bg-green-100 text-green-400" : "bg-neutral text-neutral-content"} transition-all`} onClick={() => setHasPhysical(true)}>
              {t("yes")}
            </div>
            <div className={`px-5 text-xs py-1 rounded-2xl cursor-pointer ${!hasPhysical ? "bg-red-100 text-red-400" : "bg-neutral text-neutral-content"} transition-all`} onClick={() => setHasPhysical(false)}>
              {t("no")}
            </div>
          </div>
          <div className="w-full">
            <SimpleInput
              type="text"
              title={t("description")}
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
              title={t("externalLink")}
              placeholder={t("externalLinkExample")}
              onChange={(e) =>
                setOploadObj(
                  // isValid={formValues.first_name != ""}
                  { ...upladObj, external_link: e.target.value }
                )
              }
              defaultValue={null}
            />
          </div>

          <div className="w-full flex gap-3 items-center">
            <div className="">{t("isAddWithWallet")}</div>
            <div className={`px-5 text-xs py-1 rounded-2xl cursor-pointer ${hasInternalWallet ? "bg-green-100 text-green-400" : "bg-neutral text-neutral-content"} transition-all`} onClick={() => setHasInternalWallet(true)}>
              {t("yes")}
            </div>
            <div className={`px-5 text-xs py-1 rounded-2xl cursor-pointer ${!hasInternalWallet ? "bg-red-100 text-red-400" : "bg-neutral text-neutral-content"} transition-all`} onClick={() => setHasInternalWallet(false)}>
              {t("no")}
            </div>
          </div>

          <div className="flex justify-between">
            <div className="text-[14px] text-gray-400 pt-2">{t("basicCost")}</div>
            {!isLoading ? (
              <BorderButton className="" size="lg" onClick={handleSubmit} disabled={upladObj.item_name == false || upladObj.description == false || upladObj.external_link == false || upladObj.creator == false || upladObj.last_price == false || image == null || disabled}>
                {t("addArt")}
              </BorderButton>
            ) : (
              <BorderButton className=" text-[14px] bg-[#DCFCE7] py-5 px-[6rem] rounded-lg cursor-not-allowed transition-all flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 animate-bounce">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <div className="whitespace-nowrap"> {t("minting")}</div>
              </BorderButton>
            )}
          </div>
        </SimpleCard>
      </div>
      {isUploaded ? (
        <SimpleCard className={"bg-green-50 mt-12 flex gap-12"}>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.1" stroke="currentColor" className="w-40 h-40 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
            </svg>
          </div>
          <div className="leading-[40px]">
            <div className="text-[20px] text-green-600">{t("successfullyMinted")}</div>
            <div className="text-[16px] text-green-900">
              {t("mintLastParagraph.beforeToken")} {tokenId}
              {t("mintLastParagraph.afterToken")}
            </div>
            <div
              className="text-[16px] text-green-900 bg-green-100 rounded-full w-min whitespace-nimport { i18n } from 'i18next';
owrap px-7 cursor-pointer flex gap-12 items-center"
              onClick={handleCopy}
            >
              <div>{t("code")}:</div>
              0xB0Df35D093752d7fAf6bc3D4304CEFcCABe7a86a
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
