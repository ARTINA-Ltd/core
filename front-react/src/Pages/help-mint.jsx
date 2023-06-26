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
                        ۱- ابتدا لاگین کنید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۲- وارد صفحه ضرب اثر شوید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۳- سپس کانکت والت را زده و به کیف پولتان متصل شوید.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۴- در نهایت با اپلود تصویر دلخواه ضرب اثر را انجام داده و این اثر در مجموعه های من قابل رویت است.
                    </div>
                    <div className="text-[18px] mb-4 text-justify px-6">
                        ۵- با انجام مراحل زیر این اثر ضرب شده می تواند در کیف پولتان نمایش داده شود.
                    </div>
                </SimpleCard>
            </div>
        </TestLayout>
    );
};

export default HelpMint;
