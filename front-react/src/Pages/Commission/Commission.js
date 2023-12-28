import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Header from "../../components/LandingPageNavBar/Header";
import Footer from "../../components/Footer/Footer";
import { Card } from "primereact/card";
import TradeRate from "./CommissionComponents/TradeRate";
import Commissionmax from "./CommissionComponents/Commissionmax";
import WidthdrawRate from "./CommissionComponents/WidthdrawRate";
import TestLayout from "../../Layouts/TestLayout";
import SimpleCard from "../../components/Cards/UserDashboardCards/SimpleCard";

export default function Commission() {
  useEffect(() => { }, []);

  return (
    <>
      <TestLayout>
        <div className="w-[55%] m-auto lg:w-4/5 md:w-11/12">
          <SimpleCard className={'text-center bg-white leading-[40px]'}>
            <div className=" mt-4">
              <p className="text-[32px] mb-5 sm:text-[25px]">کارمزد معاملات</p>
              <p className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
                کارمزد معاملات در سامانه آرتینا بصورت درصد از مبلغ کل معامله است و
                محاسبه‌ی آن بر اساس ملاحظات زیر صورت می‌گیرد. لازم به توضیح است که
                کسر کارمزد از معاملات باعث جلوگیری از ثبت معاملات صوری و مکرر
                خواهد شد و شرایط مطلوب‌تری را در بازار برای تمامی کاربران ایجاد
                می‌کند
              </p>
              <p className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
                ✔️ کارمزد از هر دو طرف معامله گرفته می‌شود.
              </p>
              <p className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
                کارمزد به صورت درصد از حجم دارایی درخواستی محاسبه می‌شود. به طور
                مثال اگر به عنوان فروشنده، بخواهید در برابر اتریوم تومان دریافت
                کنید کارمزد به صورت درصد از تومان دریافت می‌شود، و بالعکس اگر به
                عنوان خریدار بخواهید اتریوم خریداری نمایید، کارمزد به
                صورت درصد از اتریوم دریافت خواهد شد
              </p>
              <p className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
                در هنگام ثبت معاملات از طریق سامانه‌ی آرتینا، مبلغ دقیق کارمزد
                برای آن معامله برای شما نمایش داده خواهد شد. بسته به حجم معاملات
                کاربر، کارمزد معاملات طبق جدول زیر محاسبه می گردد
              </p>
            </div>
          </SimpleCard>
          <SimpleCard className={"bg-white mt-7"}>
            <TradeRate />
          </SimpleCard>

          <SimpleCard className={"bg-white mt-7"}>
            <Commissionmax />
          </SimpleCard>
          <SimpleCard className={"bg-white mt-7"}>
            <div>
              <p className="text-[32px] mb-5 text-center"> واریز و برداشت تومان</p>
              <p className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">✔️ کارمزد واریز تومان صفر است.</p>
              <p className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">✔️ کارمزد از هر دو طرف معامله گرفته می‌شود.</p>
              <p className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
                کارمزد برداشت تومان به دلیل هزینه‌های بانکی و درگاه بانکی برای
                تسویه، به صورت زیر می‌باشد:
              </p>
              <p className="text-[18px] mb-4 text-justify px-6 sm:px-3 sm:text-[14px]">
                در هنگام ثبت معاملات از طریق سامانه‌ی آرتینا، مبلغ دقیق کارمزد
                برای آن معامله برای شما نمایش داده خواهد شد. بسته به حجم معاملات
                کاربر، کارمزد معاملات طبق جدول زیر محاسبه می گردد.
              </p>
            </div>
          </SimpleCard>
          <SimpleCard className={"bg-white mt-7"}>
            <WidthdrawRate />
          </SimpleCard>
        </div>
      </TestLayout>
    </>
  );
}
