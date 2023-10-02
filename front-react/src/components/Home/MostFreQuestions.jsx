import { React } from "react";
import "./Home.css"; // Make sure to import your CSS file

const MostFrequentQuestions = ({ className = "" }) => {
    return (
        <div className={`${className} flex justify-center bg-[#4e45d0] lg:my-10`}>
            <div
                className={`${className}  w-full flex justify-center bg-[#4e45d0] text-white relative overflow-hidden`}
            >
                <img
                    src="/mand1.png"
                    className=" opacity-[15%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden"
                />
                <div className="w-11/12 flex flex-col items-center text-black">
                    <div className="font-b9 text-[40px] text-white mt-10 sm:text-[30px]">
                        سوالات متداول
                    </div>

                    <div className="flex-col w-full text-white">
                        <div className="flex justify-between mt-5">
                            <div className="w-6/12 mx-8 my-5 border-dotted border-2 border-indigo-400 rounded-3xl px-5">
                                <div className="mt-3 font-b5 text-[20px] text-center">
                                    چرا آرتینا خرید و فروش مبتنی بر بلاک چین را ارایه می دهد؟
                                </div>
                                <div className="my-3 font-b3 text-[15px] text-justify">
                                    بلاک‌چین یک سیستم ثبت تراکنش‌هاست که اطلاعات را در بلوک‌های متصل به یکدیگر ذخیره می‌کند.
                                    این اطلاعات به صورت رمزشده و تغییرناپذیری ذخیره می‌شوند.
                                    از این رو، هیچ کس نمی‌تواند به راحتی اطلاعات را تغییر دهد یا تقلب کند.
                                    همچنین، هرگونه تلاش برای تغییر اطلاعات بسیار مشکل است.
                                    این امر اعتماد بیشتری به ارزهای رمزی می‌دهد و تضمین می‌کند که تراکنش‌ها و مالکیت امن باشند.
                                    وقتی ارزهای رمزی را خریداری یا فروش می‌کنید، تراکنش‌ها به صورت عمومی در بلاک‌چین ثبت می‌شوند،
                                    که این امر شفافیت بیشتری به فرآیند معاملات اضافه می‌کند و تقلب را کاهش می‌دهد.
                                </div>
                            </div>
                            <div className="w-6/12 mx-8 my-5 border-dotted border-2 border-indigo-400 rounded-3xl px-5">
                                <div className="mt-3 font-b5 text-[20px] text-center">
                                    چطور می‌توانیم تراکنش ها را در بلاک چین مشاهده کنیم؟
                                </div>
                                <div className="my-3 font-b3 text-[15px] text-justify">
                                    <div className="font-b5">
                                        استفاده از اکسپلورر بلاک‌چین (Blockchain Explorer):
                                    </div>
                                    اکثر بلاک‌چین‌ها اکسپلوررهایی را فراهم می‌کنند که به شما امکان جستجوی تراکنش‌ها، بلوک‌ها و آدرس‌ها را می‌دهند.
                                    برای مثال، اگر شما برای بیتکوین می‌خواهید تراکنش‌ها را ببینید، می‌توانید به وب‌سایت "Blockchain.info" یا "Blockchair.com" مراجعه کنید.
                                    <br />
                                    <div className="font-b5">
                                        استفاده از نرم‌افزار کیف پول بلاک‌چین:
                                    </div>
                                    اگر یک کیف پول دیجیتال دارید (مانند کیف پول بیتکوین)، می‌توانید تراکنش‌های خود را در آن مشاهده کنید.
                                    این کیف پول‌ها اغلب تراکنش‌ها را به صورت جزئی و کامل نشان می‌دهند.

                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mb-5">
                            <div className="w-6/12 mx-8 my-5 border-dotted border-2 border-indigo-400 rounded-3xl px-5">
                                <div className="mt-3 font-b5 text-[20px] text-center">
                                    از کجا از اصالت ان اف تی مطمئن شوم؟
                                </div>
                                <div className="my-3 font-b3 text-[15px] text-justify">
                                    <div className="font-b5">
                                        تحقیق در مورد ارتباط هنرمند:
                                    </div>
                                    اگر امکان دارد، تحقیق کنید تا مطمئن شوید که هنرمند واقعی است و اثرات او را مورد تأیید قرار داده است.
                                    اینکه هنرمند در شبکه‌های اجتماعی یا وبسایت‌های رسمی خود ارتباط برقرار می‌کند و اثرات خود را تأیید می‌کند، می‌تواند نشان از اصالت اثرات او داشته باشد.
                                    <div className="font-b5">
                                        بررسی اطلاعات NFT:
                                    </div>
                                    بررسی دقیق اطلاعات مربوط به NFT خریداری شده از جمله نام هنرمند، عنوان اثر، شماره انتشار، و توصیف اثر می‌تواند کمک کند.
                                    همچنین، بررسی تاریخچه تراکنش‌ها و اطلاعات بلاک‌چین می‌تواند اصالت NFT را تأیید کند.
                                </div>
                            </div>
                            <div className="w-6/12 mx-8 my-5 border-dotted border-2 border-indigo-400 rounded-3xl px-5">
                                <div className="mt-3 font-b5 text-[20px] text-center">
                                    چرا استفاده از قرارداد های هوشمند بهترین انتخاب است؟
                                </div>
                                <div className="my-3 font-b3 text-[15px] text-justify">
                                    <div className="font-b5">
                                        امنیت بیشتر:
                                    </div>
                                    قراردادهای هوش مصنوعی بر پایه بلاک‌چین کار می‌کنند.
                                    این به این معناست که تراکنش‌ها و اطلاعات در یک شبکه امن و بدون نیاز به واسطه‌گری ذخیره می‌شوند.
                                    این امر تقلب و تغییر ناپذیری اطلاعات را کاهش می‌دهد و اعتماد بیشتری به معاملات فراهم می‌کند.
                                    <div className="font-b5">
                                        شفافیت:
                                    </div>
                                    تمامی تراکنش‌ها و اقدامات قراردادهای هوش مصنوعی در بلاک‌چین ثبت می‌شوند و به صورت عمومی قابل مشاهده هستند.
                                    این امر شفافیت بالاتری در معاملات و تراکنش‌ها ایجاد می‌کند و امکان بررسی تاریخچه تراکنش‌ها را برای همه افراد فراهم می‌کند.

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MostFrequentQuestions;
