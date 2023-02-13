import Image from "../ProfilePage/image";
import PersonalInfo from "../ProfilePage/PersonalInfo";
import Navbar from "../ProfilePage/nav-bar";
 import OtherInfo from "../ProfilePage/OtherInfo";
import Autinticate from "../ProfilePage/Autinticate";
import './ProfilePage.css'
import Header from "../components/LandingPageNavBar/Header";
import Footer from "../components/Footer/Footer";
function ProfilePage() {
  return (
    <div className="  overflow-hidden grid " style={{direction:'rtl'}}>
      <Header />
      <div dir="rtl" className="flex grid col-12 s1 m-2">
        <div className="lg:col-6 md:col-6 sm:col-12 mt-6">
        <Image />
        </div>
        <div className="lg:col-6 md:col-6  sm:col-12 mt-2">
        <PersonalInfo />

        </div>
      </div>
      <div className="col-12  otherinfo"  >
      <OtherInfo />

      </div>
      <div className="col-12 m-2" style={{marginTop:'99px'}}>
      <Autinticate />

      </div>
        
      <Footer />
    </div>
  );
}
export default ProfilePage;
