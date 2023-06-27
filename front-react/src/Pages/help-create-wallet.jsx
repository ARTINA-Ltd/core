import React from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import TestLayout from "../Layouts/TestLayout";

const HelpCreateWallet = () => {
    return (
        <TestLayout>
            <div className="w-[55%] m-auto lg:w-4/5 md:w-11/12">
                <SimpleCard className={'text-center bg-white leading-[40px]'}>
                    <div className="text-[32px] mb-5">راهنمای ساخت کیف پول</div>
                    <div className="text-[18px] mb-7 text-center">
                        کیف پول های متنوعی وجود دارد، ابتدا باید یک کیف پول معتبر را انتخاب کنید:
                    </div>
                    <div className="text-[25px] mb-2 text-right mr-5">کیف پول متامسک</div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۱- وارد این لینک شوید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۲- نسخه ویندوز یا موبایل و یا افزونه مرورگر را انتخاب کنید
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۳- یک زمر 12 تا 24 کلمه ای تولید می شود و باید با دقت آن ها را نگهداری کنید.
                    </div>

                    <div className="text-[25px] mb-2 text-right mr-5">کیف پول تراست ولت</div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۱- وارد این لینک شوید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۲- یک زمر 12 تا 24 کلمه ای تولید می شود و باید با دقت آن ها را نگهداری کنید.
                    </div>
                </SimpleCard>
            </div>
        </TestLayout>
    );
};

export default HelpCreateWallet;
