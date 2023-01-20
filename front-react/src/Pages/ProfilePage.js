 import Image from "../ProfilePage/image";
 import PersonalInfo from "../ProfilePage/PersonalInfo";
 import Navbar from "../ProfilePage/nav-bar"
 import Footer from "../ProfilePage/footer-component"
import OtherInfo from "../ProfilePage/OtherInfo";
import Autinticate from "../ProfilePage/Autinticate";
 function ProfilePage(){
    return<>
    <Navbar/>
    <div dir="rtl" className="grid lg:grid-cols-2 sm:grid-cols-1">
        <Image/>
        <PersonalInfo/>
    </div>
    <OtherInfo/>
    <Autinticate/>
    <Footer/>
    </>
 }
 export default ProfilePage;