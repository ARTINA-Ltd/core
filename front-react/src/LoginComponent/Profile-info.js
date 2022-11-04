function ProfileInfo() {

    const personalInfo=[
        "11111111",
        "111111111"
    ]
    const info = [
        "0911111",
        "0243305",
        "A@gmail.com",
        "دانشگاه زنجان"
]
    return <>
        <div className={"container  "}>
            <div className={" w-[470px] h-[300px]  mt-4"}>
                <a href="#"
                   className="flex flex-col items-center    ">
                    <img className="object-cover w-[146px] h-[146px] rounded-full "
                         src={require("./bg.jpg")} alt="" />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">نام نام
                                                                                                           خانوادگی</p>
                    </div>
                </a>
                <div className={"row mr-4 container"}>

                    <p className="col-6 mb-3 font-bold container">کد ملی</p>

                    <p className={"col-6 flex justify-end"}>{personalInfo[0]}</p>

                    <p className="col-6 mb-3 font-bold ">تاریخ تولد </p>

                    <p className={"col-6 flex justify-end"}>{personalInfo[1]}</p>

                </div>
            </div>

            <div className={"container grid content-between  w-[730px] h-[300px]  "}>
                <h6 className={"flex justify-center items-center mt-6 border-t-2 font-extrabold text-xl"}>اطلاعات تماس</h6>
                <div className="row ">
                    <div className="col-4 flex justify-center grid content-center">
                        <p>شماره موبایل</p>
                    </div>
                    <div className="col-4 flex justify-center items-center">
                        <p>{info[0]}</p>
                    </div>
                    <div className="col-4 flex justify-center items-center">
                        <button className={"bg-[#A3A2A1] w-[80px] h-[25px]  font-bold"} type={"submit"}>ویرایش</button>

                    </div>

                </div>
                <div className="row">
                    <div className="col-4 flex justify-center items-center">
                        <p>شماره ثابت</p>
                    </div>
                    <div className="col-4 flex justify-center items-center">
                        <p>{info[1]}</p>
                    </div>
                    <div className="col-4 flex justify-center items-center">
                        <button className={"bg-[#A3A2A1] w-[80px] h-[25px]  font-bold"} type={"submit"}>ویرایش</button>
                    </div>

                </div>
                <div className="row">
                    <div className="col-4 flex justify-center items-center">
                        <p>ایمیل</p>
                    </div>
                    <div className="col-4 flex justify-center items-center">
                        <p>{info[2]}</p>
                    </div>
                    <div className="col-4 flex justify-center items-center">
                        <button className={"bg-[#A3A2A1] w-[80px] h-[25px]  font-bold"} type={"submit"}>ویرایش</button>
                    </div>

                </div>
                <div className="row">
                    <div className="col-4 flex justify-center items-center">
                        <p>آدرس</p>
                    </div>
                    <div className="col-4 flex justify-center items-center">
                        <p>{info[3]}</p>
                    </div>
                    <div className="col-4 flex justify-center items-center">
                        <button className={"bg-[#A3A2A1] w-[80px] h-[25px]  font-bold"} type={"submit"}>ویرایش</button>

                    </div>

                </div>
            </div>
        </div>
    </>
}

export default ProfileInfo;



