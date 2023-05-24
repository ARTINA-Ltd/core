import React from 'react'
import TestLayout from '../Layouts/TestLayout'
import SimpleCard from './../components/Cards/UserDashboardCards/SimpleCard';

const ArtistApplicationForm = () => {
  return <TestLayout className="w-full">
      <img src="/2.jpg" className="w-full h-[700px] object-cover" alt="" />
      <div className="w-full rounded-xl z-20 flex justify-center inset-0 m-auto">
        <div className="bg-white w-2/3 h-44 -mt-[400px] rounded-2xl shadow-lg text-center p-3 opacity-90">
          <div className="text-2xl font-b9">اطلاعات</div>
          <div>یک دو سه چهار پنج</div>
        </div>
      </div>
      <div className="flex w-full justify-center mt-5">
        <SimpleCard className={"bg-white w-2/3 text-center"}>
          <div className="font-b9 text-3xl mb-2">توضیحات</div>
          <div className="text-justify">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
            در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
            نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
            کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
            جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای
            طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان
            فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری
            موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد
            نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل
            دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
          </div>
        </SimpleCard>
      </div>
      <div className="flex w-full justify-center mt-5">
        <SimpleCard className={"bg-white w-2/3 text-center"}>
          <div className="font-b9 text-3xl mb-2">توضیحات</div>
          <div className="text-justify">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
            در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
            نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
            کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
            جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای
            طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان
            فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری
            موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد
            نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل
            دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
          </div>
        </SimpleCard>
      </div>
    </TestLayout>;
}

export default ArtistApplicationForm
