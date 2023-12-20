import React from "react";
import BorderButton from "../Buttons/BorderButton";
import { useNavigate } from "react-router";


const AboutAI = ({ className }) => {
    const navigate = useNavigate();

    return (
        <div
            className={`${className}  w-full flex justify-center bg-[#4e45d0] text-white py-16 relative overflow-hidden sm:py-4`}
        >
            <img
                src="/mand1.png"
                className=" opacity-[15%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden z-10"
            />
            <div className={`w-10/12 flex items-center sm:w-4/5 md:flex-col lg:items-center lg:w-[75%]`}>
                <div className="text-[18px] mb-4 text-justify pl-16 z-20 lg:pl-0">
                    <img
                        src="/AboutAI.png"
                        className=" object-cover max-w-2xl md:max-w-lg rounded-3xl shadow-2xl"
                        alt=""
                    />
                </div>
                <div>
                    <div className="font-b9 text-[40px] mb-4 pb-5 lg:text-[30px] sm:text-[25px] sm:pb-2 sm:mb-2">
                        تولید تصویر با هوش مصنوعی
                    </div>
                    <div className="font-b2 text-[22px] text-justify sm:text-[17px]">
                        با استفاده از Artina AI
                        می‌توانید بدون دانش خاصی از طراحی یا عکاسی و فقط با توصیف متنی،
                         عکس دلخواه خود را تولید کرده و در آرتینا به ان اف تی تبدیل کنید!
                    </div>
                    {/* <BorderButton
                        onClick={() => { navigate("/login") }} >
                        ورود
                    </BorderButton> */}
                </div>
            </div>
        </div>
    );
};

export default AboutAI;
