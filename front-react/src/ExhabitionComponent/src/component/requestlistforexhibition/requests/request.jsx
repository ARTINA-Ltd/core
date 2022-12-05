import "./requests-styles.css";
import { images } from "../../images";
import { Outlet, Link } from "react-router-dom";
import {Select} from "@mui/material";

const Requests = ({ requests, loading, state, setState, setCurrentReq }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="section-requests">
      <div className="request-header">
        <div className="list-header-content">
          <h3 className="header-title">لیست درخواست ها</h3>
          <p className="header-desc">
            می‌توانید لیستی ازهنرمندانی که برای نمایشگاه شما درخواست داده اند را
            مشاهده کنید
          </p>
        </div>
      </div>
      <div className="state-box">
        <select value={state} onChange={(e) => setState(e.target.value)}>
          <option className="dropdown-content" disabled value="default">انتخاب کنید</option>
          <option value="pending">در حال انتظار</option>
          <option value="accepted">قبول شده</option>
          <option value="rejected">رد شده</option>
        </select>
      </div>
      <div className="requests-container"> {requests.map((request) => (
        <div className="request-box">
            <div className="request-content">
              <div className="artist-info">
                <img className="artist-pro-pic" src={request.owner.image} />
                <div className="artist-secondary-info">
                  <p className="request-artist-name">
                    {request.owner.username}
                  </p>
                  <p className="request-rate">⭐️ امتیاز{request.rate} </p>
                </div>
              </div>
                <div className="atrist-filds"></div>
                <div className="artist-third-info">
                  <p className="request-commission">%کمسیون:{request.commission}</p>
                  <p className="request-nft-num"> تعداد ان اف تی ها:{request.nfts.length}عدد</p>
                  <p className="request-nft-num">{request.state}</p>

                  <Link to="/show-request" state={request}>
                    <button
                    onClick={() => setCurrentReq(request)}
                    className="view-artist-profile-btn"
                    >
                    مشاهده
                    </button>
                  </Link>
                </div>
            </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
