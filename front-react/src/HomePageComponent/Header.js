function Header() {
    return <>
        <p className={"flex justify-center font-[kalameh]  mt-9 text-4xl"}>خرید و فروش آثار هنری در آرتینا</p>
        <p className={"flex justify-center font-[kalameh]  mt-4"}> به جمع بزرگ هنرمندان ملحق شوید</p>
        <div className={"flex justify-center mt-4"}>
            <button className={"flex justify-center  bg-purple-500 font-[kalameh] p-5 pt-2 pb-2 text-white rounded-bl-2xl rounded-tl-2xl"} type={"submit"}>ثبت</button>

            <input type="email"  className={"flex justify-center   pr-2 w-[350px] bg-[#DCDCDC] rounded-br-2xl rounded-tr-2xl"} />


        </div>
    </>
}

export default Header;