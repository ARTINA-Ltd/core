import { images } from "../../images";
import "./request-detail-styles.css";

// const requested_arts = [
//   {
//     image: images["g-2.png"],
//     category: "نستعلیق و ثلث",
//     desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ.",
//     like_num: 1.2,
//     price: "2.8 ETH",
//   },
//   {
//     image: images["g-2.png"],
//     category: "نستعلیق و ثلث",
//     desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ.",
//     like_num: 1.2,
//     price: "2.8 ETH",
//   },
//   {
//     image: images["g-2.png"],
//     category: "نستعلیق و ثلث",
//     desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ.",
//     like_num: 1.2,
//     price: "2.8 ETH",
//   },
//   {
//     image: images["g-2.png"],
//     category: "نستعلیق و ثلث",
//     desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ.",
//     like_num: 1.2,
//     price: "2.8 ETH",
//   },
// ];

const Requests_details = ({ request, nfts, loading, ChangeState }) => {
  return (
    <div className="section requests artist-page">
      <div className="request-header">
        <div className="header-content">
          <img className="artist-profile" src={request.owner.image} />
          <div className="artist-inf">
            <p className="artist-name">{request.owner.first_name} </p>
            <div className="secondary-info">
              <p className="artist-filds">{request.owner.username}</p>
              <p className="rate">(امتیاز)⭐️</p>
            </div>
          </div>
        </div>
      </div>
      <div className="art-list part">
        <h3>آثار پیشنهاد شده</h3>
        <div dir="rtl" className="arts-container">
          {nfts.map((nft) => {
            if (loading) {
              return <h2>Loading...</h2>;
            }
            return (
              <div className="nft-flexing-cart">
                {/* <img className="nft-choosing-images" src={items.image} alt="" /> */}
                <div className="detais-cart-nft-choosed">
                  <p className="category">{nft.name}</p>
                  <p className="nft-desc">{nft.description}</p>
                  <p className="like">
                    <img src={images["like.png"]} className="like-icon" />
                    {/* {nft.like_num} */}
                    لایک
                  </p>
                  <p className="price">
                    <span className="price-details">قیمت :</span>
                    {nft.lastPrice}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="confirmation part">
        <h3>تایید درخواست</h3>
        <textarea
          dir="rtl"
          className="message"
          placeholder="متن پیام خود را برای هنرمند وارد کنید"
        ></textarea>
        <div className="confirmation-btn">
          <button onClick={ChangeState}>تایید درخواست</button>
          <button>عدم تایید درخواست</button>
        </div>
      </div>
    </div>
  );
};

export default Requests_details;
