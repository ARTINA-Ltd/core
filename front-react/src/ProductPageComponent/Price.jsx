import "./price.css";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Price() {
    const Name = 'تابلو شعر'
    const Creator = 'مهدی'
    const view = '16'
    const favorites = '20';
 
    
    return <>
        <div className=" mr-[10px] ml-[10px] items-center">
       <div className="">
            <h2 className={"flex lg:justify-start sm:justify-center lg:text-5xl font-bold mb-8 lg:mt-[100px] md:mt-[30px] md:text-4xl sm:mt-[15px] sm:text-3xl"}> نام اثر:</h2>
            <h1 className="lg:text-8xl font-bold lg:mt-[-60px] md:text-6xl sm:text-6xl">بهاران</h1>

            <h2 className={"flex lg:justify-start sm:justify-center lg:text-4xl font-bold mb-8 lg:mt-[40px] md:text-3xl sm:text-3xl sm:mt-[25px]"}> نام هنرمند:</h2>
            <h1 className="lg:text-6xl font-bold lg:mt-[-50px] sm:text-4xl">فرشچیان</h1>

            <h2 className={"flex lg:justify-start sm:justify-center lg:text-4xl font-bold mb-8 lg:mt-[40px] md:text-3xl sm:text-3xl sm:mt-[20px]"}>توضیحات:</h2>
            <p className="lg:text-3xl sm:text-2xl text-right flex justify-start ">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</p>

            <h2 className={"flex lg:justify-start lg:text-4xl sm:justify-center font-bold mb-8 lg:mt-[40px] sm:text-3xl"}>قیمت پایه:</h2>
            <h1 className="flex justify-center lg:text-6xl font-bold lg:mt-[-50px] border-b-2 border-gray-500 sm:text-3xl">4000</h1>
            </div>

           

        </div>
    </>

}

export default Price;