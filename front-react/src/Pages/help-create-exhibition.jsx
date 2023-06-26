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
                        ۱- ابتدا در آرتینا رجیستر و سپس لاگین کنید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۲- سپس اثرهای خود در آرتینا ضرب کنید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۳- در بخش فعالیت ها وارد ایجا نمایشگاه شوید.
                    </div>
                </SimpleCard>
            </div>
        </TestLayout>
    );
};

export default HelpCreateExhibition;
