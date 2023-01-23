import image1 from "../ProductPageComponent/images/image_2022-08-15_19-57-46.png"

export default function Autinticate() {
    return <>
        <div>
            <h1 className="text-5xl font-black mt-20">-----احرازهویت------</h1>
            <div className="flex justify-center">
                <img src={image1} alt="" className="mr-[50px] lg:w-[35%] lg:h-[250px] md:w-[50%] sm:w-[40%] mt-[50px]" />
            </div>
            <div className="">
            <p className="text-4xl mt-12">52154651486514651613    :شماره شبا</p>

            <button className="text-3xl  p-4 mt-4 radius-lg">ویرایش</button>

            </div>
        </div>
<div>
    <p className="text-5xl font-black mt-8">:کارت های بانکی ثبت شده</p>
    <div className="flex justify-center mt-10 text-4xl" dir="rtl">
        <p>بانک تجارت</p>
        <p>201212022124521654465</p>
    </div>
</div>
    </>
}