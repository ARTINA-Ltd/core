import "./past-collections-styles.css";
import { images } from "../../images";

const collections = [
  {
    image: images["g-5.png"],
    date: "۲۲ مهر",
    title: "نمایشگاه آثار نستعلیق",
    desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است",
  },
  {
    image: images["g-10.jpg"],
    date: "۲۲ مهر",
    title: "نمایشگاه آثار نستعلیق",
    desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است",
  },
  {
    image: images["g-1.png"],
    date: "۲۲ مهر",
    title: "نمایشگاه آثار نستعلیق",
    desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است",
  },
  {
    image: images["g-2.png"],
    date: "۲۲ مهر",
    title: "نمایشگاه آثار نستعلیق",
    desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است",
  },
  {
    image: images["g-11.png"],
    date: "۲۲ مهر",
    title: "نمایشگاه آثار نستعلیق",
    desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است",
  },
];

const Pastcollections = () => {
  return (
    <div className="section past-collections">
      <p className="title"> نمایشگاه های برگزار شده شما</p>
      <div className="past-collections-container">
        {collections.map((collection) => (
          <div className="past-collection">
            <img
              className="past-collection-image"
              src={collection.image}
              alt=""
            />
            <div className="past-collection-detail">
              <p className="past-collection-date">{collection.date}</p>
              <p className="past-collection-title">{collection.title}</p>
              <p className="past-collection-desc">{collection.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default Pastcollections;
