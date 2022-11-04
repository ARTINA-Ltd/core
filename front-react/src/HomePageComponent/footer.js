function Footer() {
    // bg-gradient-to-r from-[#C4C2DD] via-[#7D74E8] to-[#C4C2DD]
    return <>
        <div className={"flex justify-between bg-gradient-to-r from-[#A9A5DC] via-[#7D74E8] to-[#A9A5DC]  h-[200px] mt-5 font-[kalameh] "}>
            <div className="mt-9 ml-4">
                <p className={"text-center"}>سابسکرایب کنید!</p>
                <div className="flex items-center">
                <button className={" bg-purple-500 font-[kalameh] w-[50px] text-white rounded-bl-2xl rounded-tl-2xl"} type={"submit"}>ثبت</button>
                <input type="email"  className={" pr-2 w-[250px] bg-[#DCDCDC] rounded-br-2xl rounded-tr-2xl"} />
                </div>
            </div>
            <div className="flex  text-lg text-center   ">
                <ul>
                    <li>
                        <p className={"text-purple-600 "}>شرکت</p>
                    </li>
                    <li>
                        <a href="#" className={"text-decoration-none text-white  "}>کاوش کردن </a>
                    </li>
                    <li>
                        <a href="#" className={"text-decoration-none text-white "}>ارتباط با ما</a>
                    </li>
                    <li>
                        <a href="#" className={"text-decoration-none text-white "}>بلاگ ما</a>
                    </li>
                    <a href="#" className={"text-decoration-none text-white"}>سوالات</a>
                </ul>
            </div>
            <div className="flex text-lg text-center   ">
                <ul>
                    <li>
                        <p className={"text-purple-600 "}>منابع</p>
                    </li>
                    <li>
                        <a href="#" className={"text-decoration-none text-white"}>راهنما و پشتیبانی</a>
                    </li>
                    <li>
                        <a href="#" className={"text-decoration-none text-white"}>جزئیات موارد</a>
                    </li>
                    <li>
                        <a href="#" className={"text-decoration-none text-white"}>فعالیت ها</a>
                    </li>
                    <a href="#" className={"text-decoration-none text-white"}>حراج ها</a>
                </ul>
            </div>
            <div className="flex  justify-center items-start">
                <div className="text-lg text-center   ">
                    <ul>
                        <li>
                            <p className={"text-purple-600 "}>پروفایل من</p>
                        </li>
                        <li>
                            <a href="#" className={"text-decoration-none text-white"}>نویسنده ها</a>
                        </li>
                        <li>
                            <a href="#" className={"text-decoration-none text-white"}>کالکشن ها</a>
                        </li>
                        <li>
                            <a href="#" className={"text-decoration-none text-white"}>ایجاد یک آیتم</a>
                        </li>
                        <a href="#" className={"text-decoration-none text-white"}>پروفایل نویسنده</a>
                    </ul>
                </div>
            </div>
            <div className="flex justify-end items-center">
                <ul>
                    <p className={"text-center"}>website</p>

                    <p>این یک متن درباره توضیحانی راجع به <br /> سایت می باشد. این یک متن درباره توضیحانی <br />راجع به
                       سایت
                       می باشد. </p>
                </ul>
            </div>

        </div>
        <div className={" text-center font-[kalameh] text-xl text-white h-[30px] bg-[#7C73E8] "}>
            <p>© 2022 NFT by artina</p>
        </div>
    </>

}

export default Footer;