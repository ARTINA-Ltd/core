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
          <div className="main-container">
            <img
              className="section-1-main-image"
              src={items.image}
              alt="photo"
            />
            <div className="detail-container">
              <p1 className="secion-1-header-main">{items.title}</p1>
              <p1>برگزار کننده:{items.creator}</p1>
              <p1>{items.time}: زمان برگزاری</p1>
              <p1>{items.start_date}:تاریخ شروع نمایشگاه</p1>
              <p1>{items.end_date}:تاریخ اتمام نمایشگاه</p1>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Section_1;
