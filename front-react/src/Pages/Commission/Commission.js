import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Header from "../../components/LandingPageNavBar/Header";
import Footer from "../../components/Footer/Footer";
import { Card } from 'primereact/card';
import TradeRate from "./CommissionComponents/TradeRate";
import Commissionmax from "./CommissionComponents/Commissionmax";
import WidthdrawRate from "./CommissionComponents/WidthdrawRate";

export default function Commission() {
 

  useEffect(() => {
   }, []);

  return (
    <>
    <div className="overflow-hidden " style={{ direction: "rtl" ,backgroundColor:"#F4EEFF" }}>
      <div>
        <Header />
      </div>

      <div className=" mt-4">
        <p className="text-5xl mb-2 ">کارمزد معاملات</p>
        <p className="text-3xl justify-content-center p-8 " >
          کارمزد معاملات در سامانه آرتینا بصورت درصد از مبلغ کل معامله است و
          محاسبه‌ی آن بر اساس ملاحظات زیر صورت می‌گیرد. لازم به توضیح است که کسر
          کارمزد از معاملات باعث جلوگیری از ثبت معاملات صوری و مکرر خواهد شد و
          شرایط مطلوب‌تری را در بازار برای تمامی کاربران ایجاد می‌کند
        </p>
        <p className="text-4xl mt-2 mb-4 ">کارمزد از هر دو طرف معامله گرفته می‌شود.</p>
        <p className="text-3xl p-6">
          کارمزد به صورت درصد از حجم دارایی درخواستی محاسبه می‌شود. به طور مثال
          اگر به عنوان فروشنده، بخواهید در برابر اتریوم ریال دریافت کنید کارمزد
          به صورت درصد از ریال دریافت می‌شود، و بالعکس اگر به عنوان خریدار
          بخواهید با ریال خود اتریوم خریداری نمایید، کارمزد به صورت درصد از
          اتریوم دریافت خواهد شد
        </p>
        <p  className="text-3xl p-6">
          در هنگام ثبت معاملات از طریق سامانه‌ی آرتینا، مبلغ دقیق کارمزد برای آن
          معامله برای شما نمایش داده خواهد شد. بسته به حجم معاملات کاربر، کارمزد
          معاملات طبق جدول زیر محاسبه می گردد
        </p>
      </div>

      <TradeRate/>

      <div>
        <p className="text-5xl ">کارمزد معاملات</p>
        <p className="text-3xl p-8">
          کارمزد معاملات در سامانه آرتینا بصورت درصد از مبلغ کل معامله است و
          محاسبه‌ی آن بر اساس ملاحظات زیر صورت می‌گیرد. لازم به توضیح است که کسر
          کارمزد از معاملات باعث جلوگیری از ثبت معاملات صوری و مکرر خواهد شد و
          شرایط مطلوب‌تری را در بازار برای تمامی کاربران ایجاد می‌کند
        </p>
        <p className="text-3xl  ">کارمزد از هر دو طرف معامله گرفته می‌شود.</p>
        <p className="text-3xl p-8">
          کارمزد به صورت درصد از حجم دارایی درخواستی محاسبه می‌شود. به طور مثال
          اگر به عنوان فروشنده، بخواهید در برابر اتریوم ریال دریافت کنید کارمزد
          به صورت درصد از ریال دریافت می‌شود، و بالعکس اگر به عنوان خریدار
          بخواهید با ریال خود اتریوم خریداری نمایید، کارمزد به صورت درصد از
          اتریوم دریافت خواهد شد
        </p>
        <p className="text-4xl p-8">
          در هنگام ثبت معاملات از طریق سامانه‌ی آرتینا، مبلغ دقیق کارمزد برای آن
          معامله برای شما نمایش داده خواهد شد. بسته به حجم معاملات کاربر، کارمزد
          معاملات طبق جدول زیر محاسبه می گردد
        </p>
      </div>
      <Commissionmax/>

      <div>
        <p className="text-4xl p-5"> واریز و برداشت ریال</p>
        <p className="text-4xl p-5">کارمزد واریز ریال صفر است.</p>
        <p className="text-4xl p-5">کارمزد از هر دو طرف معامله گرفته می‌شود.</p>
        <p className="text-4xl p-5   ">
          کارمزد برداشت ریال به دلیل هزینه‌های بانکی و درگاه بانکی برای تسویه،
          به صورت زیر می‌باشد:
        </p>
        <p className="text-4xl p-8">
          در هنگام ثبت معاملات از طریق سامانه‌ی آرتینا، مبلغ دقیق کارمزد برای آن
          معامله برای شما نمایش داده خواهد شد. بسته به حجم معاملات کاربر، کارمزد
          معاملات طبق جدول زیر محاسبه می گردد
        </p>
      </div>

      <WidthdrawRate/>

      <div>
        <Footer />
      </div>
    </div>
    <div>
 
 




    </div>
    </>
  );
}
