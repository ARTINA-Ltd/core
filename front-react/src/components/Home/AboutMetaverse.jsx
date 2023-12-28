import React from "react";

const AboutMetaverse = ({ className }) => {
    return (
        <div
            className={`${className} w-full flex justify-center py-16 relative overflow-hidden lg:py-4`}
        >
            {/* <img
                src="/mand1.png"
                className=" opacity-[15%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden"
            /> */}
            <div className={`w-10/12 flex items-center md:flex-col sm:w-4/5`}>
                <div>
                    <div className="font-b9 text-[40px] mb-4 sm:text-[30px] pb-5 sm:mb-2 sm:pb-2">
                        استفاده از متاورس
                    </div>
                    <div className="font-b2 text-[22px] text-justify sm:text-[17px] lg:pb-4">
                        متاورس یک دنیای سه بعدی است که می‌تواند به عنوان نمایشگاه آثار مورد استفاده قرار گیرد؛
                        در حقیقت در آرتینا می‌توانید بدون در اختیار داشتن یک محیط فیزیکی واقعی، آثار خود را در محیطی مجازی به نمایش بگذارید!
                    </div>
                </div>
                <div className="text-[18px] mb-4 text-justify pr-16 lg:pr-0 sm:mb-0">
                    <img
                        src="/AboutMetaverse.png"
                        className=" object-cover max-w-2xl rounded-3xl lg:max-w-lg"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
};

export default AboutMetaverse;
