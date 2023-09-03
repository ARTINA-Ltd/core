import React from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import TestLayout from "../Layouts/TestLayout";

const MetaExplanation = () => {
    const imageContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      };
    
      const imageStyle = {
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        margin: '0 10px', // Add margin for spacing between images
      };
    
      const importantTextStyle = {
        fontWeight: 'bold',
        fontSize: '20px', // Increase font size for the entire text
        textAlign: 'center',
        color: "#7B1FA2",

      };

    return (
        <TestLayout>
            <div className="w-[55%] m-auto lg:w-4/5 md:w-11/12">
                <SimpleCard className={'text-center bg-white leading-[40px]'}>
                <div dir="rtl" style={{ textAlign: 'justify' }}>
      <div style={imageContainerStyle}>
        <img
          src="./meta1.jpg"
          alt="تصویر اول"
          style={imageStyle}
        />

        <img
          src="./meta2.jpg"
          alt="تصویر دوم"
          style={imageStyle}
        />
      </div>

      <p>
        متاورس یک دنیای دیجیتال فراتر از خیال است. در این دنیای سه بعدی و واقعیت مجازی، شما به عنوان یک آواتار دیجیتال می‌توانید با دیگران ارتباط برقرار کنید و محیط‌های دیجیتالی را بپیمایید. شما می‌توانید در دل دنیای متاورس سفر کنید و تجربه‌های منحصر به فردی را تجربه کنید.
      </p>

      <p>
        دنیای متاورس شامل تمامی ابزارها و فرصت‌های فناوری دیجیتال است. از جلسات مجازی تا بازی‌های سه بعدی، از مبادلات ارزهای رمزنگاری تا تجربه‌ی واقعیت مجازی، همه چیز در این دنیا وجود دارد.
      </p>

      <p>
        دنیای متاورس یک مکان عالی برای آموزش است. شما می‌توانید در زمان و مکانی که برایتان مناسب است، به بهترین مدرسان دنیا دسترسی داشته باشید. همچنین می‌توانید با دوستان و همکاران خود در دنیای متاورس جلسات مجازی داشته باشید و به اشتراک گذاشتن ایده‌ها و تجارب راحت‌تر از همیشه کنید.
      </p>

      <h2>کاربردهای متاورس:</h2>
      <ul>
        <li>
          <span style={importantTextStyle}>آموزش:</span> فرض کنید در زمان حال، تاریخ را با شخصیت‌های تاریخی تجربه کنید و به دنیای گذشته سفر کنید.
        </li>
        <li>
          <span style={importantTextStyle}>رویدادها:</span> شما می‌توانید فوتبال را در یک استادیوم مجازی تماشا کنید و با دیگر طرفداران تیم‌های مورد علاقه‌تان ارتباط برقرار کنید.
        </li>
        <li>
          <span style={importantTextStyle}>کسب و کار:</span> ایجاد فرصت‌های کسب و کار در دنیای متاورس و برقراری جلسات مجازی بدون محدودیت‌های مکانی و زمانی.
        </li>
        <li>
          <span style={importantTextStyle}>بازی و سرگرمی، مد و فشن، پزشکی، توریسم و ...</span>
        </li>
      </ul>

      <p>
        این فضای جدید مستلزم بهره‌گیری از ابزارهایی مانند ارزهای دیجیتال و تکنولوژی NFT است. ارزهای دیجیتال به عنوان جایگزینی برای پول‌های کاغذی و NFT ها به عنوان نمایانده‌هایی از مالکیت در دنیای متاورس و امکان معامله و مبادله دارند.
      </p>
    </div>
  
        
                </SimpleCard>
            </div>
        </TestLayout>
    );
};

export default MetaExplanation;
