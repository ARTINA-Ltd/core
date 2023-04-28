
function Recomendition() {
    return <>
        <div className="flex flex-col lg:mr-[40px] sm:mr-[2px] sm:mr-[2px] lg:ml-[40px] w-full">
            <div className="overflow-x-auto  lg:mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full">
                            <thead className="border-b ">
                                <tr>
                                    <th scope="col" className="lg:text-4xl font sm:text-2xl font-bold text-gray-900 px-6 py-4 text-center">
                                        نام
                                    </th>
                                    <th scope="col" className="lg:text-4xl font sm:text-2xl font-bold text-gray-900 px-6 py-4 text-center">
                                        تاریخ پایان
                                    </th>
                                    <th scope="col" className="lg:text-4xl font sm:text-2xl font-bold text-gray-900 px-6 py-4 text-center">
                                        قیمت
                                    </th>
                                    <th scope="col" className="lg:text-4xl font sm:text-2xl font-bold text-gray-900 px-6 py-4 text-center">
                                        شماره NFT
                                    </th>
                                    <th scope="col" className="lg:text-4xl font sm:text-2xl font-bold text-gray-900 px-6 py-4 text-center">
                                        لغو پیشنهاد
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="px-6 py-4 whitespace-nowrap text-2xl font-medium text-gray-900 font">زهرا علیمی</td>
                                    <td className="text-2xl text-gray-900 font-light px-6 font py-4 whitespace-nowrap">
                                        12h
                                    </td>
                                    <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap font">
                                        0.01
                                    </td>
                                    <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap font">
                                        #1241
                                    </td>
                                    <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap font">
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