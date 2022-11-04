import * as bs from 'bootstrap/dist/css/bootstrap.css';
function NavBar() {
    return <>
        <div className="flex   items-center h-[70px] bg-gradient-to-r from-[#FFDED2] to-[#7C73E8] sticky-top">

            <div className="flex   w-[600px] text-decoration-none font-[kalameh]  ">

                <div className={"flex justify-start  container"}>
                    <ul>
                        <a href="#" className={"text-blue-800 hover:text-white text-decoration-none flex items-center"}>ورود</a>
                <a href="#" className={"text-blue-800 hover:text-white text-decoration-none flex items-center"}>ثبت نام</a>

                    </ul>
                </div>
                <div className={"flex justify-end"}>
                <a href="#" className={"text-white text-decoration-none flex items-center "}>درباره ما</a>
                </div>
            </div>

        </div>

    </>
}

export default NavBar;