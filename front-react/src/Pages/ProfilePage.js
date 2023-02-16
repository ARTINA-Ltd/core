import Image from "../ProfilePage/image";
import PersonalInfo from "../ProfilePage/PersonalInfo";
import Navbar from "../ProfilePage/nav-bar";
import OtherInfo from "../ProfilePage/OtherInfo";
import Autinticate from "../ProfilePage/Autinticate";
 import Header from "../components/LandingPageNavBar/Header";
import Footer from "../components/Footer/Footer";
import Profileuploader from "../components/Uploaders/Profileuploader";
import IDUpdate from "../components/Uploaders/IDUpdate";
import { Button } from 'primereact/button';

function ProfilePage() {
  return (
    <div className="  overflow-hidden grid " style={{ direction: "rtl" }}>
      <Header />
      <h2 className="  mt-6 lg:text-8xl sm:text-4xl lg:text-6xl text-4xl justify-content-center text-center">مشخصات شخصی</h2>

      <div dir="rtl" className="flex grid col-12  m-2">
        <div className="lg:col-6     md:col-6 sm:col-12 mt-6">
          <Profileuploader />
          <IDUpdate />
        </div>
        <div className="lg:col-6 md:col-6  sm:col-12 mt-2">
          <PersonalInfo />
        </div>
      </div>

       <div className="">
       <Button label="Submit"  className=" mt-6 lg:text-4xl sm:text-2xl lg:text-2xl text-2xl justify-content-center text-center w-7"/>

       </div>


      <Footer />
    </div>
  );
}
export default ProfilePage;
