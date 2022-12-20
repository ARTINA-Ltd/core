import "./section-1_component_style.css";
function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
export const images = importAll(
  require.context("./../images", false, /\.(png|jpe?g|svg)$/)
);

const collection = [
  {
    image: images["2.png"],
    creator: "ابولفضل پورغرب",
    title: "نمایشگاه میرعماد",
    start_date: "21/12/1378",
    end_date: "5/2/1379",
    time: " ساعت 17 الی 15 عصر",
  },
];
const Section_1 = () => {
  return (
    <div>
      {collection.map((items) => {
        return (
          <div className="main-container1" dir="rtl">
            <img
              className="section-1-main-image flex justify-center  h-[300px] "
              src={items.image}
              alt="photo"
            />
            <div className="detail-container ">
              <div className="datail-container1 ">
                <p className="secion-1-header-main1">{items.title}</p>
                <p>برگزار کننده:{items.creator}</p>
                <p> زمان برگزاری:{items.time}</p>
                <p>تاریخ شروع نمایشگاه:{items.start_date}</p>
                <p>تاریخ اتمام نمایشگاه:{items.end_date}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Section_1;
