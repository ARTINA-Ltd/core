import React from "react";
import "./ShowCollection.css";
// import SampleImg from "./download.jpeg";

const ShowCollection = () => {
    return (
        <div className="container">
            <div className="poster">
                <div className="profile__image"></div>
            </div>
            <div className="filter__container">
                <div className="sort__container">
                    <div>ترتیب</div>
                    <input type="checkbox"/>
                </div>
                <div className="sort__container">
                    <div>فیلتر</div>
                    <input type="checkbox"/>
                </div>
            </div>
            <div>
                <div className="cart__container">
                    <div className="cart">
                        <div className="cart__image"></div>
                        <div className="cart__text">
                            <span> نام </span>
                            <span> قیمت پایه</span>
                        </div>
                    </div>
                    <div className="cart">
                        <div className="cart__image"></div>
                        <div className="cart__text">
                            <span> نام </span>
                            <span> قیمت پایه</span>
                        </div>
                    </div>
                    <div className="cart">
                        <div className="cart__image"></div>
                        <div className="cart__text">
                            <span> نام </span>
                            <span> قیمت پایه</span>
                        </div>
                    </div>
                    <div className="cart">
                        <div className="cart__image"></div>
                        <div className="cart__text">
                            <span> نام </span>
                            <span> قیمت پایه</span>
                        </div>
                    </div>
                    <div className="cart">
                        <div className="cart__image"></div>
                        <div className="cart__text">
                            <span> نام </span>
                            <span> قیمت پایه</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowCollection;