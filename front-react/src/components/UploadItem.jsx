import React, {useState, useCallback, useEffect} from "react";
import Dropzone from "./Dropzone";
import "./UploadItem.css";
import axios from "axios";

const UploadItem = () => {
    const hanndleNumberChange = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            setOploadObj({...upladObj, last_price: e.target.value});
        }
    };

    const UploadImage = (files) => {
        setOploadObj({...upladObj, image: files})
    }

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.map((file) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                UploadImage(e.target.result);
            };
            reader.readAsDataURL(file);
            return file;
        });
    }, []);

    const [upladObj, setOploadObj] = useState({
        image: "",
        item_name: "",
        description: "",
        external_link: "",
        creator: "",
        date_created: "",
        last_price: 0,
        owner: 1, // TODO: Change this pk to the current user
    });

    useEffect(() => {
        const today = new Date();
        setOploadObj({...upladObj, date_created: today.toISOString().slice(0, 10)})
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/transaction/Nfts/", {
            base64_image: upladObj.image,
            name: upladObj.item_name,
            description: upladObj.description,
            external_link: upladObj.external_link,
            creator: upladObj.creator,
            date: upladObj.date_created,
            last_price: upladObj.last_price,
            owner: upladObj.owner
        })
            .then(res => {
                console.log(res);
                console.log(upladObj.image.split(",")[1]);
                // TODO: Redirection
            }
        )
    }

    return (
        <div className="main__div">
            <div className="header__div">
                <h1 className="header__name">بخش آپلود فایل</h1>
            </div>
            <div className="upload__nft__container">
                <div className="upload__nft">
                    {!upladObj.image &&
                        <Dropzone onDrop={onDrop} />
                    }
                    {upladObj.image &&
                        <div className="image__container">
                            <div className="image__close__btn"
                                 onClick={() => setOploadObj({...upladObj, image: ""})}>
                                 <img src={require("../assets/icons/cancel_button.png")} alt="close" />
                            </div>
                            <img src={upladObj.image} alt=""/>
                        </div>
                    }
                </div>
                <div className="name__input__container">
                    <div className="nft__name">نام اثر</div>
                    <input
                        className="nft__name__input"
                        value={upladObj.item_name}
                        onChange={(e) =>
                            setOploadObj({...upladObj, item_name: e.target.value})
                        }
                    />
                </div>
            </div>
            <div className="a1">
                <div className="a2">توضیحات</div>
                <textarea
                    className="a3"
                    value={upladObj.description}
                    onChange={(e) => setOploadObj({...upladObj, description: e.target.value})}
                ></textarea>
            </div>
            <div className="a1">
                <div className="a2">لینک خارجی</div>
                <input
                    className="a3_2"
                    value={upladObj.external_link}
                    onChange={(e) => setOploadObj({...upladObj, external_link: e.target.value})}
                />
            </div>
            <div className="a4">
                <div className="a4_2">
                    <div className="a2">نام هنرمند</div>
                    <input
                        className="a3"
                        value={upladObj.creator}
                        onChange={(e) =>
                            setOploadObj({...upladObj, creator: e.target.value})
                        }
                    />
                </div>
                <div className="a4_2">
                    <div className="a2">تاریخ ایجاد اثر</div>
                    <input
                        className="a3"
                        value={upladObj.date_created}
                        onChange={(e) =>
                            setOploadObj({...upladObj, date_created: e.target.value})
                        }
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
                        onChange={(e) => hanndleNumberChange(e)}
                    />
                </div>
                <div className="a4_2">
                    <div className="a2" style={{color: "transparent"}}>
                        a
                    </div>
                    <div
                        className="a3"
                        style={{
                            fontSize: "2.5em",
                            background: "linear-gradient(to bottom right, rgba(100, 100, 255, 0.8), rgba(100, 100, 255, 0.84))",
                            color: "white",
                            cursor: "pointer",
                            textAlign: "center"
                        }}
                        onClick={(e) => handleSubmit(e)}
                    >
                        آپلود
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadItem;