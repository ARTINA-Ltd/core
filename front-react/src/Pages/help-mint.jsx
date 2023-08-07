import React from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import TestLayout from "../Layouts/TestLayout";

const HelpMint = () => {
    return (
        <TestLayout>
            <div className="w-[55%] m-auto lg:w-4/5 md:w-11/12">
                <SimpleCard className={'text-center bg-white leading-[40px]'}>
                    <div className="text-[32px] mb-5">راهنمای ضرب ان اف تی</div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۱- ابتدا وارد اکانت خود شوید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۲- سپس وارد صفحه «ضرب اثر» شوید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۳- بر روی کانکت والت کلیک کرده و به کیف پولتان متصل شوید.
                        چنانچه کیف پول دیجیتال ندارید، میتوانید صفحه
                        <a className="text-[18px] mb-4 text-justify text-purple-700" href="https://artina.org/help-create-wallet"> ساخت کیف پول </a>
                        را مطالعه نمایید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۴- اطلاعات مورد نیاز را با توجه به اثر خود تکمیل کنید؛ لازم به ذکر است که پر کردن تمامی مقادیر در صفحه ضرب اثر به جز: «توضحات» و «لینک خارجی» اجباری می‌باشد.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ✔️ تصویر زیر نمونه ای از ضرب اثر را نمایش می‌دهد.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        <img
                            src="/help-mint-1.png"
                            className=" object-cover m-auto"
                            alt=""
                        />
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۵- سپس بر روی «ضرب اثر» کلیک کنید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۶- چنانچه عملیات ضرب با موفقیت انجام شود، پیغام موفقیت آمیز بودن ضرب را دریافت میکنید. به مانند تصویر زیر:
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        <img
                            src="/help-mint-2.png"
                            className=" object-cover m-auto"
                            alt=""
                        />
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۷- با توجه به دستور العمل گفته شده در پیغام، ان اف تی خود را در کیف پول خود نمایش دهید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        <img
                            src="/help-mint-3.png"
                            className=" object-cover m-auto"
                            alt=""
                        />
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۸- در نهایت اثر شما در کیف پول قابل مشاهده می‌باشد. 🎉
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        <img
                            src="/help-mint-4.png"
                            className=" object-cover m-auto"
                            alt=""
                        />
                    </div>
                </SimpleCard>
            </div>
        </TestLayout>
    );
};

export default HelpMint;
