import React from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import TestLayout from "../Layouts/TestLayout";

const Contact = () => {
    return (
        <TestLayout>
            <div className="w-[55%] m-auto lg:w-4/5 md:w-11/12">
                <SimpleCard className={'text-center bg-white leading-[40px]'}>
                    <div className="text-[32px] mb-5">درباره ما</div>
                    <div className="text-[18px] mb-7 text-center sm:px-3 sm:text-[14px]">
                        آرتینا اولین بازار ساخت، خرید و فروش و نمایش nft در متاورس با پول رایج ایرانی در دنیاست.
                    </div>
                    <div className="text-[25px] mb-2 text-right mr-5">محصول دانش‌بنیان آرتینا</div>
                    <div className="text-[18px] mb-7 text-justify px-6 sm:px-3 sm:text-[14px]">
                        آرتینا یک پلتفرم خرید و فروش آثار هنری  در قالب nft با رویکرد توانمند سازی هنرمندان برای نمایش گذاشتن و خرید و فروش آثارشان است. این محصول برای نمایشگاه دارها و هنرمندان امکان ایجاد نمایشگاه های مجازی و خرید و فروش با رمز ارز و تومان را فراهم کرده است.
                    </div>
                    <div className="text-[25px] mb-2 text-right mr-5">هدف</div>
                    <div className="text-[18px] mb-7 text-justify px-6 sm:px-3 sm:text-[14px]">
                        فراهم نمودن بستری امن، سریع و آسان جهت خرید و فروش مستقیم nft بین خریدار و فروشنده است.
                    </div>
                    <div className="text-[25px] mb-2 text-right mr-5">شکل گیری تیم آرتینا</div>
                    <div className="text-[18px] text-justify px-6 sm:px-3 sm:text-[14px]">
                        آرتینا با هدف رفع نیاز کاربران ایرانی برای بازار nft در بهار 1401 شکل گرفت. پس از تحقیقات اولیه و سنجش میزان نیاز بازار ایران به چنین بازاری، هسته اولیه تیم در مرکز رشد دانشگاه زنجان استقرار یافت. به تدریج و با افزوده شدن نفراتی با تخصص‌های مختلف، تیم بزرگ‌تر شد.
                    </div>
                </SimpleCard>
            </div>
        </TestLayout>
    );
};

export default Contact;
