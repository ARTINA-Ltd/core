import React from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import TestLayout from "../Layouts/TestLayout";

const Contact = () => {
  return (
    <TestLayout>
      <div className="w-[55%] m-auto lg:w-4/5 md:w-11/12">
        <SimpleCard className={'text-center bg-white leading-[40px]'}>
          <div className="text-[32px] mb-5">ارتباط با ما</div>
          <div className="text-[18px]">ایمیل : support@artina.org</div>
          <div className="text-[18px]">همراه : 09391242565</div>
          <div className="text-[18px]">تلفن ثابت :02433052676</div>
          <div className="text-[18px]">
            ادرس: دانشگاه زنجان، مرکز رشد دانشگاه زنجان-شرکت ارمان ارتباطات ویرا{" "}
          </div>
          <div className="mt-6 text-[18px]">
            آرتینا یک پلتفرم خرید و فروش آثار هنری  در قالب nft با رویکرد
            توانمند سازی هنرمندان در بنمایش گذاشتن و خرید و فروش آثارشان است و
            برای نمایشگاه دار ها و هنرمندان امکان ایجاد نمایشگاه های مجازی و
            خرید و فروش با رمز ارز را فراهم کرده است.
          </div>
        </SimpleCard>
      </div>
    </TestLayout>
  );
};

export default Contact;
