import { React } from "react";
import "./Home.css"; // Make sure to import your CSS file

const Innovations = ({ className = "" }) => {
    return (
        <div className={`${className} w-full flex justify-center lg:my-10`}>
            <div className="w-4/5 flex flex-col items-center text-black">
                <div className="font-b9 text-[40px] mb-4 sm:text-[30px]">
                    نوآوری‌های آرتینا
                </div>

                <div className="flex-col">
                    <div className="flex justify-between">
                        <div className="mx-16 my-5">
                            <img
                                src="/3.png"
                                className="w-[150px] h-[150px] object-cover rounded-full m-auto"
                                alt=""
                            />
                            <div className="mt-3 font-b5 text-[20px] text-center">اتصال با کانکت‌والت</div>
                        </div>
                        <div className="mx-16 my-5">
                            <img
                                src="/Metaverse-logo.jpeg"
                                className="w-[150px] h-[150px] object-cover rounded-full m-auto"
                                alt=""
                            />
                            <div className="mt-3 font-b5 text-[20px] text-center">متاورس</div>
                        </div>
                        <div className="mx-16 my-5">
                            <img
                                src="/Blog-logo.jpeg"
                                className="w-[150px] h-[150px] object-cover rounded-full m-auto"
                                alt=""
                            />
                            <div className="mt-3 font-b5 text-[20px] text-center">اخبار NFT</div>
                        </div>
                        <div className="mx-16 my-5">
                            <img
                                src="/AI-logo.png"
                                className="w-[150px] h-[150px] object-cover rounded-full m-auto"
                                alt=""
                            />
                            <div className="mt-3 font-b5 text-[20px] text-center">آرتینا AI</div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="mx-16 my-5">
                            <img
                                src="/wallet-vector-icon.jpg"
                                className="w-[150px] h-[150px] object-cover rounded-full m-auto"
                                alt=""
                            />
                            <div className="mt-3 font-b5 text-[20px] text-center">ساخت ولت اختصاصی</div>
                        </div>
                        <div className="mx-16 my-5">
                            <img
                                src="/matic-logo.png"
                                className="w-[150px] h-[150px] object-cover rounded-full m-auto"
                                alt=""
                            />
                            <div className="mt-3 font-b5 text-[20px] text-center">محاسبه گر Gas Fee</div>
                        </div>
                        <div className="mx-16 my-5">
                            <img
                                src="/matic-ic.png"
                                className="w-[150px] h-[150px] object-cover rounded-full m-auto"
                                alt=""
                            />
                            <div className="mt-3 font-b5 text-[20px] text-center">تحلیل داده Division</div>
                        </div>
                        <div className="mx-16 my-5">
                            <img
                                src="/Blockchain-logo.png"
                                className="w-[150px] h-[150px] object-cover rounded-full m-auto"
                                alt=""
                            />
                            <div className="mt-3 font-b5 text-[20px] text-center">قرارداد هوشمند آرتینا</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Innovations;
