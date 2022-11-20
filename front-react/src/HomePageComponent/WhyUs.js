function WhyUs() {
    return <>

        <div className="flex justify-center ">
            <p className={"text-center font-bold  text-md lg:text-xl text-black font-[kalameh] mt-2  "}>چرا
                                                                                                       آرتینا <br /> را
                                                                                                       انتخاب
                                                                                                       کنیم؟ </p>
            <br />
        </div>
        <div
            className={"flex justify-center  h-[200px] bg-gradient-to-r from-[#C4C2DD] via-[#7D74E8] to-[#C4C2DD] font-[kalameh] "}>
            <div className={"flex justify-between items-center container "}>
                <div className="security transition ease-in-out delay-75  hover:-translate-y-1 hover:scale-110  duration-300">
                    <img src={require("./web-security.png")} width={"120px"} alt="" className={"img-fluid"}/>
                    <p className={"flex justify-center  text-center mt-2"}>امنیت بسیار بالا</p>
                </div>
                <div className="security transition ease-in-out delay-75  hover:-translate-y-1 hover:scale-110  duration-300">
                    <img src={require("./wallet.png")} width={"120px"} alt="" className={"img-fluid"}/>
                    <p className={"flex justify-center text-center mt-2"}>پرداخت ریالی</p>
                </div>
                <div className="security transition ease-in-out delay-75  hover:-translate-y-1 hover:scale-110  duration-300 ">
                    <img src={require("./forbidden.png")} width={"120px"} alt="" className={"img-fluid"}/>
                    <p className={"flex justify-center text-center mt-2 "}>خرید ان اف تی بدون تحریم</p>
                </div>
            </div>


        </div>
    </>
}

export default WhyUs;