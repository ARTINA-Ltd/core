
function Recomendition() {
    return <>
        <div>
            <h2 className="text-5xl mt-20 font-black mr-[20px]">پیشنهاد های شما</h2>

        </div>

        <div className="flex flex-col lg:mr-[40px] sm:mr-[2px] sm:mr-[2px] lg:ml-[40px]">
            <div className="overflow-x-auto  lg:mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full">
                            <thead className="border-b ">
                                <tr>
                                    <th scope="col" className="lg:text-4xl sm:text-2xl font-bold text-gray-900 px-6 py-4 text-center">
                                        نام
                                    </th>
                                    <th scope="col" className="lg:text-4xl sm:text-2xl font-bold text-gray-900 px-6 py-4 text-center">
                                        تاریخ پایان
                                    </th>
                                    <th scope="col" className="lg:text-4xl sm:text-2xl font-bold text-gray-900 px-6 py-4 text-center">
                                        قیمت
                                    </th>
                                    <th scope="col" className="lg:text-4xl sm:text-2xl font-bold text-gray-900 px-6 py-4 text-center">
                                        شماره NFT
                                    </th>
                                    <th scope="col" className="lg:text-4xl sm:text-2xl font-bold text-gray-900 px-6 py-4 text-center">
                                        لغو پیشنهاد
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="px-6 py-4 whitespace-nowrap text-2xl font-medium text-gray-900">زهرا علیمی</td>
                                    <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        12h
                                    </td>
                                    <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        0.01
                                    </td>
                                    <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        #1241
                                    </td>
                                    <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <img src={"./images/close-icon.png"} alt="" />
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Recomendition;