import Header from "../components/AdminPageNavbar/Header.js";
import AuthPageCard from "../components/Cards/AuthPageCard.jsx";
import Footer from "../components/Footer/Footer.jsx";

const Authentications = () => {
  return (
    <div dir="rtl">
      <Header />
      <div
        className={` ${'bg-[#f9f9f9] bg-[length:300px] bg-[url("https://artina.org/12.png")] '} min-h-screen  overflow-hidden pb-8`}
      >
        <div className=" w-[70vw] mx-auto p-8 flex flex-wrap gap-8 justify-center">
          <AuthPageCard />
          <AuthPageCard />
          <AuthPageCard />
          <AuthPageCard />
          <AuthPageCard />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Authentications;
