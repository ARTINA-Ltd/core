import {Link} from "react-router-dom";

function ProfileCard() {
    return<>
        <div className={"grid content-between   font-bold text-xl bg-[#FBFBFB] w-[330px] h-[423px] mt-20 "}>
            <ul className={"w-[330px] "}>
                <li>
                  <button className={"  hover:bg-[#ABA5F8] hover:border-r-8 hover:border-purple-900 w-[330px] h-[85px]"} type={"submit"}>مشخصات کاربری </button>
                </li>
                <li>
                    <button className={"  hover:bg-[#ABA5F8] hover:border-r-8 hover:border-purple-900 w-[330px] h-[85px]"} type={"submit"}>حساب بانکی</button>
                </li>
                <li>
                     <button className={"  hover:bg-[#ABA5F8] hover:border-r-8 hover:border-purple-900 w-[330px] h-[85px]"} type={"submit"}>امنیت</button>
                </li>
                <li>
                      <button className={"  hover:bg-[#ABA5F8] hover:border-r-8 hover:border-purple-900 w-[330px] h-[85px]"} type={"submit"}>تنظیمات</button>
                </li>
                <li>
                   <button className={"  hover:bg-[#ABA5F8] hover:border-r-8 hover:border-purple-900 w-[330px] h-[85px]"} type={"submit"}>راهنمایی و پشتیبانی</button>
                </li>
            </ul>
        </div>


    </>
}export default ProfileCard;