import React from 'react';
import { useLocation } from 'react-router-dom';
import TestLayout from '../Layouts/TestLayout';
import SimpleCard from '../components/Cards/UserDashboardCards/SimpleCard';
import BorderButton from '../components/Buttons/BorderButton';
import { useNavigate } from "react-router";


function RedirectedPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentStatus = searchParams.get('status');
  const AuthorityStatus = searchParams.get('authority');


  const navigate = useNavigate();

  return (
    <div>
      {paymentStatus === 'success' ? (
        <TestLayout>
          <div className="w-[55%] m-auto mt-20 lg:w-4/5 md:w-11/12 md:mt-14 sm:mt-10">
            <SimpleCard className={'text-center bg-white leading-[40px]'}>
              <div className="text-[18px] mb-4 px-6">
                <img
                  src="/payment_icons/payment-success.png"
                  className=" object-cover m-auto max-w-[150px] md:max-w-[100px]"
                  alt=""
                />
              </div>
              <div className="text-[32px] mb-5 md:text-[25px]">پرداخت شما با موفقیت انجام شد.</div>
              <div className="text-[20px] mb-3 text-center md:text-[17px]">
                شماره پیگیری
              </div>
              <div className="text-[20px] mb-12 md:text-[15px] sm:text-[12px]">
                <span className="bg-indigo-400 px-4 py-2 rounded-xl">
                  {AuthorityStatus}
                </span>
              </div>
              <BorderButton
                className="inline-block font-b5"
                onClick={() => navigate("/dashboard")}
              >داشبود
              </BorderButton>
            </SimpleCard>
          </div>
        </TestLayout>
      ) : (
        <TestLayout>
          <div className="w-[55%] m-auto mt-20 lg:w-4/5 md:w-11/12 md:mt-14 sm:mt-10">
            <SimpleCard className={'text-center bg-white leading-[40px]'}>
              <div className="text-[18px] mb-4 px-6">
                <img
                  src="/payment_icons/payment-failed.png"
                  className=" object-cover m-auto max-w-[150px] md:max-w-[100px]"
                  alt=""
                />
              </div>
              <div className="text-[32px] mb-5 md:text-[25px]">پرداخت شما با خطا مواجه شد.</div>
              <BorderButton
                className="inline-block font-b5"
                onClick={() => navigate("/dashboard")}
              >داشبود
              </BorderButton>
            </SimpleCard>
          </div>
        </TestLayout>
      )}
    </div>
  );
}

export default RedirectedPage;