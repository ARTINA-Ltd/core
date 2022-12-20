import React, {useState} from "react";
import "./UploadItem.css";

const UploadItem = () => {
    const [upladObj, setOploadObj] = useState({
        item_name: "",
        desc: "",
        link: "",
        artist_name: "",
        date_created: "",
        price: "",
    });
    const hanndleNumberChange = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            setOploadObj({...upladObj, price: e.target.value});
        }
    };
    return (
        <div className="main__div">
            <div className="upload__nft__container">
                <div className="upload__nft">1</div>
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
                <div className="a2">توضیخات</div>
                <textarea
                    className="a3"
                    value={upladObj.desc}
                    onChange={(e) => setOploadObj({...upladObj, desc: e.target.value})}
                ></textarea>
            </div>
            <div className="a1">
                <div className="a2">لینک خارجی</div>
                <input
                    className="a3"
                    value={upladObj.link}
                    onChange={(e) => setOploadObj({...upladObj, link: e.target.value})}
                />
            </div>
            <div className="a4">
                <div style={{width: "40%"}}>
                    <div className="a2">نام هنرمند</div>
                    <input
                        className="a3"
                        value={upladObj.artist_name}
                        onChange={(e) =>
                            setOploadObj({...upladObj, artist_name: e.target.value})
                        }
                    />
                </div>
                <div style={{width: "40%"}}>
                    <div className="a2">تاریخ ایجاد اثر</div>
                    <input
                        className="a3"
                        value={upladObj.date_created}
                        onChange={(e) =>
                            setOploadObj({...upladObj, date_created: e.target.value})
                        }
                    />
                </div>
            </div>
            <div className="a4">
                <div style={{width: "40%"}}>
                    <div className="a2">قیمت پایه</div>
                    <input
                        className="a3"
                        value={upladObj.price}
                        onChange={(e) => hanndleNumberChange(e)}
                    />
                </div>
                <div style={{width: "40%"}}>
                    <div className="a2" style={{color: "transparent"}}>
                        a
                    </div>
                    <div
                        className="a3"
                        style={{fontSize: "10px"}}
                        onClick={() => console.log(upladObj)}
                    >
                        آپلود
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadItem;