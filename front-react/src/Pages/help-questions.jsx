import React from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import TestLayout from "../Layouts/TestLayout";

const HelpQuestions = () => {
    return (
        <TestLayout>
            <div className="w-[55%] m-auto lg:w-4/5 md:w-11/12">
                <SimpleCard className={'text-center bg-white leading-[40px]'}>
                    <div className="text-[32px] mb-5">سوالات متداول</div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        آرتینا چیست؟
                        <br />
                        • آرتینا یک بازار خرید و فروش و نمایش nft در فضای متاورس است.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        الزام احراز هویت برای چیست؟
                        <br />
                        •  بر اساس قوانین موجود در بازارهای مالی دنیا و کشور ایران، احراز هویت مشتریان به سبب جلوگیری از هرگونه سوء استفاده احتمالی الزامی است.
                        <a className="text-[18px] mb-4 text-justify text-purple-700" href="https://artina.org/help-mint"> راهنمای ضرب ان اف تی </a>
                        را مشاهده کنید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        چه اطلاعاتی برای احراز هویت نیاز است؟
                        <br />
                        • شروع ثبت نام با استفاده از ایمیل معتبر امکان پذیر بوده و با توجه به سطح کاربری مورد نیاز ، کاربر باید اقدام به تکمیل اطلاعات پروفایل خود نماید. در سطح پایه، کاربر ملزم به ارائه شماره تلفن همراه، فرم احراز، شماره شبای حساب بانکی، آدرس به نام خود کاربر می باشد.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        چطور nft بخرم؟
                        <br />
                        • ابتدا رجیستر کرده و به راهنمای خرید مراجعه نمایید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        چطور nft بفروشم؟
                        <br />
                        • ابتدا رجیستر کرده و به راهنمای فروش مراجعه نمایید.
                    </div>

                    <div className="text-[18px] mb-4 text-justify px-6">
                        شبکه و ارز مورد استفاده چیست؟
                        <br />
                        • شبکه Polygan و ارز Matic .
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        آیا الزام به داشتن کیف پول وجود دارد؟
                        <br />
                        • در آرتینا می توانید، کیف پول شخصی خود را ایجاد نمایید.
                    </div>

                </SimpleCard>
            </div>
        </TestLayout>
    );
};

export default HelpQuestions;