import React from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import TestLayout from "../Layouts/TestLayout";

const HelpCreateExhibition = () => {
    return (
        <TestLayout>
            <div className="w-[55%] m-auto lg:w-4/5 md:w-11/12">
                <SimpleCard className={'text-center bg-white leading-[40px]'}>
                    <div className="text-[32px] mb-5">راهنمای ایجاد نمایشگاه</div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۱- ابتدا وارد اکانت خود شوید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۲- سپس آثار خود در آرتینا ضرب کنید. چنانجه هنوز اثری را ضرب نکرده اید، می‌توانید
                        <a className="text-[18px] mb-4 text-justify text-purple-700" href="https://artina.org/help-create-wallet"> راهنمای ضرب ان اف تی </a>
                        را مشاهده کنید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۳- از نوار بالای سایت وارد بخش «مدیریت فعالیت ها» شوید؛ سپس از بخش «نمایشگاه‌های در حال برگزاری شما» بر روی افزودن نمایشگاه کلیک کنید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۴-   اطلاعات مورد نیاز را با توجه به اثر خود تکمیل کنید؛ لازم به ذکر است که پر کردن تمامی مقادیر در صفحه ساخت نمایشگاه اجباری می‌باشد. 
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ✔️ تصویر زیر نمونه ای از ایجاد نمایشگاه را نمایش می‌دهد.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        <img
                            src="/help-exhibition-1.png"
                            className=" object-cover m-auto max-w-md"
                            alt=""
                        />
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۵- در نهایت با موافقت قوانین ساخت نمایشگاه، بر روی دکمه ثبت کلیک کنید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۶- در نهایت می‌توانید نمایشگاه خود را در بخش اصلی مدیریت فعالیت ها مشاهده کنید. 🎉
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        <img
                            src="/help-exhibition-2.png"
                            className=" object-cover m-auto max-w-xs"
                            alt=""
                        />
                    </div>
                </SimpleCard>
            </div>
        </TestLayout>
    );
};

export default HelpCreateExhibition;
