import "./section-1_component_style.css";
const Section_1 = () => {
  return (
    <div className="section-1-background-image-main-header ">      
      <div className="col-6 section-1-header-main-container">
        <p className=" section-1-header-main-title flex justify-center">
          بهترین نمایشگاه <br /> برای فروش محصولات
        </p>
        <p className="section-1-header-detail-title">
          !! بهترین راه حل در دنیای مدرن برای فروش محصولات هنری در اختیار شماست
          اثار هنری خود را شخصی کنید و آنرا با توجه به معیارهایتان در نمایشگاه
          دلخواه خودتان قرار دهید تا انتخابی مطمئن داشته باشید بدون محدودیت
          انتخاب کنید و از فروش محصولات خود درارتینا لذت ببرید
        </p>
        <button className="section-1-header-button">مشاهده</button>
        {/* <button className="section-1-header-button-2">مشاهده محصولات</button> */}
     </div>
     </div>
  );
};
export default Section_1;
