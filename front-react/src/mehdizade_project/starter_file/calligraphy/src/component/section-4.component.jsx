import { Link } from "react-router-dom";
import "./section-4.component_style.css";
const Section_4 = () => {
  return (
    <div>
      <div className="image-section-4">
        <p className="header-section-4">
          در تولید اثار ان اف تی حرفه‌ایی شوید
        </p>
        <Link to={"/artistpage"} className="button-footer  button-section4" >
          بیشتر بدانید
        </Link>
      </div>
    </div>
  );
};
export default Section_4;
