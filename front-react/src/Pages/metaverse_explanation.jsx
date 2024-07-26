import React from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import TestLayout from "../Layouts/TestLayout";
import meta1 from "../assets/images/meta1.jpg"
import meta2 from "../assets/images/meta2.jpg"

const MetaExplanation = () => {
  const imageContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  };

  const imageStyle = {
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    margin: "0 10px", // Add margin for spacing between images
    width: "25%", // Reduce the size to a quarter
  };

  const importantTextStyle = {
    fontWeight: "bold",
    fontSize: "20px", // Increase font size for the entire text
    textAlign: "center",
    color: "#7B1FA2",
  };

  return (
    <TestLayout>
      <div className="w-[55%] m-auto lg:w-4/5 md:w-11/12">
        <SimpleCard className={"text-center bg-base-100 leading-[40px]"}>
          <div dir="rtl" style={{ textAlign: "justify" }}>
            <h1 style={importantTextStyle}>دنیای مجازی</h1>

            <p>متاورس، به معنای دنیای برتری است که از فضاهای دیجیتال سه بعدی تشکیل شده است. کاربران عادی در حالیکه در دنیای فیزیکی پشت لپ تاپ خود نشسته اند، می توانند آواتاری سه بعدی از خود تولید کنند که در این دنیای مجازی به گشت و گذار و تفحص بپردازند.</p>

            <p>در دنیای متاورس همه رویدادهای تکنولوژی دیجیتال در یک جهان مجازی گردآوری شده اند. به این معنا که ما به همه وبینارها و ویدئو کنفرانس ها، بازی ‌های دیجیتال سه بعدی، مبادلات ارزهای رمزنگاری، نقل و انتقال فایل های داده و Email ها، سوشال مدیا، واقعیت مجازی، و پخش های آنلاین دسترسی داریم.</p>

            <p>حالا فکر کنید که بجای اینکه مجبور باشید برای انجام کار به اداره برین، یه عینک بزنین و وارد متاورس بشید. اونجا می تونید همکارانتونو یا حتی میز کارتونو ببینین!!</p>

            <div style={imageContainerStyle}>
              <img src={meta1} alt="تصویر اول" style={imageStyle} />

              <img src={meta2} alt="تصویر دوم" style={imageStyle} />
            </div>

            <h2>کاربردهای متاورس:</h2>
            <ul>
              <li>
                <span style={importantTextStyle}>آموزش:</span> فرض کنید در زنگ تاریخ، مشاهده لشکرکشی نادرشاه افشار.
              </li>
              <li>
                <span style={importantTextStyle}>رویدادها:</span> مشاهده فوتبال در یک فضای مجازی در خانه و تشویق تیم مورد علاقه.
              </li>
              <li>
                <span style={importantTextStyle}>کسب و کار:</span> ایجاد شغل و همچنین جلسات مجازی بدون توجه به بعد مسافت.
              </li>
              <li>
                <span style={importantTextStyle}>بازی و سرگرمی، مد و فشن، پزشکی، توریسم و...</span>
              </li>
            </ul>

            <p>این فضای جدید مستلزم بهره گیری از ابزارها و المان متناسب با آن فضا هستش:</p>
            <ul>
              <li>
                <span style={importantTextStyle}>ارز دیجیتال:</span> که جایگزینی برای پول های کاغذی هستند.
              </li>
              <li>
                <span style={importantTextStyle}>NFT ها:</span> یکی از مهم ترین نقش‌ها را در دنیای متاورس دارند که همان اعطای مالکیت است و جایگزینی برای سندهای کاغذی.
              </li>
            </ul>
          </div>
        </SimpleCard>
      </div>
    </TestLayout>
  );
};

export default MetaExplanation;
