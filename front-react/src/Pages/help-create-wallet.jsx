import React from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import TestLayout from "../Layouts/TestLayout";

const HelpCreateWallet = () => {
    return (
        <TestLayout>
            <div className="w-[55%] m-auto lg:w-4/5 md:w-11/12">
                <SimpleCard className={'text-center bg-white leading-[40px]'}>
                    <div className="text-[32px] mb-5 sm:text-[25px]">راهنمای ساخت کیف پول</div>
                    <div className="text-[18px] mb-7 text-center sm:px-3 sm:text-[14px]">
                        کیف پول های متنوعی وجود دارد، ابتدا باید یک کیف پول معتبر را انتخاب کنید:
                    </div>
                    <div className="text-[25px] mb-2 text-right mr-5">کیف پول متامسک</div>
                    <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
                        ۱- وارد
                        <a className="text-[18px] mb-4 text-justify text-purple-700" href="https://metamask.io/download/"> صفحه متامسک </a>
                        شوید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
                        ۲- نسخه ویندوز یا موبایل و یا افزونه مرورگر را انتخاب کنید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
                        ۳- یک زمر 12 تا 24 کلمه ای تولید می شود و باید با دقت آن ها را نگهداری کنید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
                        ۴- در منوی بالا بر روی دکمه زیر کلیک کنید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
                        <img
                            src="/help-wallet-1.png"
                            className=" object-cover m-auto"
                            alt=""
                        />
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
                        ۵- در قسمت select a network ، گزینه add network را بزنید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
                        <img
                            src="/help-wallet-2.png"
                            className=" object-cover m-auto"
                            alt=""
                        />
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
                        ۶- مقادیر زیر را برای شبکه جدید وارد کنید.
                    </div>
                    <div dir="rtl" className="text-[18px] mb-4 px-6 text-left sm:px-3 sm:text-[10px]">
                        Network Name: Mumbai
                        <br />
                        New RPC URL: https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78
                        <br />
                        Chain ID: 80001
                        <br />
                        Currency Symbol: MATIC
                        <br />
                        Block Explorer URL: https://mumbai.polygonscan.com
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
                        ۷- مقادیر وارد کرده را ذخیره نمایید.
                    </div>

                    {/* <div className="text-[25px] mb-2 text-right mr-5">کیف پول تراست ولت</div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۱- وارد این لینک شوید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۲- یک زمر 12 تا 24 کلمه ای تولید می شود و باید با دقت آن ها را نگهداری کنید.
                    </div> */}
                </SimpleCard>
            </div>
        </TestLayout>
    );
};

export default HelpCreateWallet;
