import { React } from "react";
import "./Home.css"; // Make sure to import your CSS file

const Innovations = ({ className = "" }) => {
    return (
        <div className={`${className} w-full flex justify-center lg:my-10`}>
            <div className="w-4/5 flex flex-col items-center text-black lg:w-[90%]">
                <div className="font-b9 text-[40px] mb-4 sm:text-[30px]">
                    نوآوری‌های آرتینا
                </div>

                <div className="flex-col">
                    <div className="flex justify-around">
                        <div className="flex sm:flex-col">
                            <div className="mx-16 my-5 lg:mx-6 sm:mx-2">
                                <img
                                    src="/3.png"
                                    className="w-[150px] h-[150px] lg:w-[100px] lg:h-[100px] sm:w-[60px] sm:h-[60px] object-cover rounded-full m-auto"
                                    alt=""
                                />
                                <div className="mt-3 font-b5 text-[20px] text-center lg:text-sm">اتصال با CW</div>
                            </div>
                            <div className="mx-16 my-5 lg:mx-6 sm:mx-2">
                                <img
                                    src="/Metaverse-logo.jpeg"
                                    className="w-[150px] h-[150px] lg:w-[100px] lg:h-[100px] sm:w-[60px] sm:h-[60px] object-cover rounded-full m-auto"
                                    alt=""
                                />
                                <div className="mt-3 font-b5 text-[20px] text-center lg:text-sm">متاورس</div>
                            </div>
                        </div>
                        <div className="flex sm:flex-col">
                            <div className="mx-16 my-5 lg:mx-6 sm:mx-2">
                                <img
                                    src="/Blog-logo.jpeg"
                                    className="w-[150px] h-[150px] lg:w-[100px] lg:h-[100px] sm:w-[60px] sm:h-[60px] object-cover rounded-full m-auto"
                                    alt=""
                                />
                                <div className="mt-3 font-b5 text-[20px] text-center lg:text-sm">اخبار NFT</div>
                            </div>
                            <div className="mx-16 my-5 lg:mx-6 sm:mx-2">
                                <img
                                    src="/AI-logo.png"
                                    className="w-[150px] h-[150px] lg:w-[100px] lg:h-[100px] sm:w-[60px] sm:h-[60px] object-cover rounded-full m-auto"
                                    alt=""
                                />
                                <div className="mt-3 font-b5 text-[20px] text-center lg:text-sm">آرتینا AI</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-around">
                        <div className="flex sm:flex-col">
                            <div className="mx-16 my-5 lg:mx-6 sm:mx-2">
                                <img
                                    src="/wallet-vector-icon.jpg"
                                    className="w-[150px] h-[150px] lg:w-[100px] lg:h-[100px] sm:w-[60px] sm:h-[60px] object-cover rounded-full m-auto"
                                    alt=""
                                />
                                <div className="mt-3 font-b5 text-[20px] text-center lg:text-sm">ساخت ولت اختصاصی</div>
                            </div>
                            <div className="mx-16 my-5 lg:mx-6 sm:mx-2">
                                <img
                                    src="/matic-logo.png"
                                    className="w-[150px] h-[150px] lg:w-[100px] lg:h-[100px] sm:w-[60px] sm:h-[60px] object-cover rounded-full m-auto"
                                    alt=""
                                />
                                <div className="mt-3 font-b5 text-[20px] text-center lg:text-sm">محاسبه گر Gas Fee</div>
                            </div>
                        </div>
                        <div className="flex sm:flex-col">
                            <div className="mx-16 my-5 lg:mx-6 sm:mx-2">
                                <img
                                    src="/matic-ic.png"
                                    className="w-[150px] h-[150px] lg:w-[100px] lg:h-[100px] sm:w-[60px] sm:h-[60px] object-cover rounded-full m-auto"
                                    alt=""
                                />
                                <div className="mt-3 font-b5 text-[20px] text-center lg:text-sm">تحلیل داده Division</div>
                            </div>
                            <div className="mx-16 my-5 lg:mx-6 sm:mx-2">
                                <img
                                    src="/Blockchain-logo.png"
                                    className="w-[150px] h-[150px] lg:w-[100px] lg:h-[100px] sm:w-[60px] sm:h-[60px] object-cover rounded-full m-auto"
                                    alt=""
                                />
                                <div className="mt-3 font-b5 text-[20px] text-center lg:text-sm">قرارداد هوشمند آرتینا</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Innovations;
